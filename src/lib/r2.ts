import crypto from 'crypto'

type R2Config = {
  accessKeyId: string
  accountId: string
  bucketName: string
  publicUrl: string
  secretAccessKey: string
}

function getEnvValue(key: string) {
  const value = process.env[key]?.trim()

  if (!value) {
    return null
  }

  return value.replace(/^['"]|['"]$/g, '')
}

function getR2Config(): R2Config {
  const accountId = getEnvValue('R2_ACCOUNT_ID')
  const bucketName = getEnvValue('R2_BUCKET_NAME')
  const publicUrl = getEnvValue('R2_PUBLIC_URL')
  const accessKeyId = getEnvValue('R2_ACCESS_KEY_ID')
  const secretAccessKey = getEnvValue('R2_SECRET_ACCESS_KEY')

  if (!accountId || !bucketName || !publicUrl || !accessKeyId || !secretAccessKey) {
    throw new Error('R2 is not configured. Add R2_ACCOUNT_ID, R2_BUCKET_NAME, R2_PUBLIC_URL, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY to .env.')
  }

  return { accountId, bucketName, publicUrl, accessKeyId, secretAccessKey }
}

function sha256(value: crypto.BinaryLike) {
  return crypto.createHash('sha256').update(value).digest('hex')
}

function hmac(key: crypto.BinaryLike | crypto.KeyObject, value: string) {
  return crypto.createHmac('sha256', key).update(value).digest()
}

function encodeKey(key: string) {
  return key.split('/').map(encodeURIComponent).join('/')
}

function getSigningKey(secretAccessKey: string, dateStamp: string) {
  const dateKey = hmac(`AWS4${secretAccessKey}`, dateStamp)
  const regionKey = hmac(dateKey, 'auto')
  const serviceKey = hmac(regionKey, 's3')

  return hmac(serviceKey, 'aws4_request')
}

function createStorageKey(file: File, folder: string) {
  const extension = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
  const id = crypto.randomUUID()

  return `${folder}/${id}.${extension}`
}

async function signedR2Request(method: 'DELETE' | 'PUT', key: string, body?: ArrayBuffer, contentType?: string) {
  const { accountId, accessKeyId, bucketName, secretAccessKey } = getR2Config()
  const host = `${accountId}.r2.cloudflarestorage.com`
  const encodedKey = encodeKey(key)
  const path = `/${bucketName}/${encodedKey}`
  const now = new Date()
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '')
  const dateStamp = amzDate.slice(0, 8)
  const payloadHash = body ? sha256(Buffer.from(body)) : sha256('')
  const headers: Record<string, string> = {
    host,
    'x-amz-content-sha256': payloadHash,
    'x-amz-date': amzDate,
  }

  if (contentType) {
    headers['content-type'] = contentType
  }

  const signedHeaders = Object.keys(headers).sort().join(';')
  const canonicalHeaders = Object.keys(headers)
    .sort()
    .map((header) => `${header}:${headers[header]}\n`)
    .join('')
  const canonicalRequest = [
    method,
    path,
    '',
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n')
  const credentialScope = `${dateStamp}/auto/s3/aws4_request`
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    sha256(canonicalRequest),
  ].join('\n')
  const signature = crypto.createHmac('sha256', getSigningKey(secretAccessKey, dateStamp)).update(stringToSign).digest('hex')
  const authorization = `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`

  const response = await fetch(`https://${host}${path}`, {
    method,
    headers: {
      ...headers,
      authorization,
    },
    body: body ? Buffer.from(body) : undefined,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`R2 ${method} failed: ${response.status} ${message}`)
  }
}

export function getOptionalFile(formData: FormData, key: string) {
  const value = formData.get(key)

  if (!(value instanceof File) || value.size === 0) {
    return null
  }

  return value
}

export async function uploadImageToR2(file: File, folder: string) {
  const { publicUrl } = getR2Config()
  const key = createStorageKey(file, folder)

  await signedR2Request('PUT', key, await file.arrayBuffer(), file.type || 'application/octet-stream')

  return {
    publicId: key,
    url: `${publicUrl.replace(/\/$/, '')}/${encodeKey(key)}`,
  }
}

export async function deleteImageFromR2(publicId: string | null | undefined) {
  if (!publicId) return

  await signedR2Request('DELETE', publicId)
}
