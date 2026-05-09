import crypto from 'crypto'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'

const ADMIN_ID = 'admin'
const ADMIN_SESSION_COOKIE = 'pink_tower_admin_session'

function safelyCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer)
}

function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')

  return `scrypt:${salt}:${hash}`
}

function verifyPassword(password: string, storedHash: string) {
  const [scheme, salt, hash] = storedHash.split(':')

  if (scheme !== 'scrypt' || !salt || !hash) {
    return false
  }

  const candidateHash = crypto.scryptSync(password, salt, 64).toString('hex')

  return safelyCompare(candidateHash, hash)
}

function createAdminSessionToken(passwordHash: string) {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim() || passwordHash

  return crypto.createHmac('sha256', secret).update(`pink-tower-admin:${passwordHash}`).digest('hex')
}

async function getOrCreateAdminCredential() {
  const existingCredential = await prisma.adminCredential.findUnique({
    where: { id: ADMIN_ID },
  })

  if (existingCredential) {
    return existingCredential
  }

  const bootstrapPassword = process.env.ADMIN_PASSWORD?.trim()

  if (!bootstrapPassword) {
    return null
  }

  return prisma.adminCredential.create({
    data: {
      id: ADMIN_ID,
      passwordHash: hashPassword(bootstrapPassword),
    },
  })
}

export async function isAdminPasswordConfigured() {
  return Boolean(await getOrCreateAdminCredential())
}

export async function validateAdminPassword(password: string) {
  const credential = await getOrCreateAdminCredential()

  if (!credential) {
    return false
  }

  return verifyPassword(password, credential.passwordHash)
}

export async function isAdminAuthenticated() {
  const credential = await getOrCreateAdminCredential()

  if (!credential) {
    return false
  }

  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value

  if (!sessionToken) {
    return false
  }

  return safelyCompare(sessionToken, createAdminSessionToken(credential.passwordHash))
}

export async function requireAdminAuthenticated() {
  if (!(await isAdminAuthenticated())) {
    throw new Error('Unauthorized')
  }
}

export async function setAdminSession() {
  const credential = await getOrCreateAdminCredential()

  if (!credential) {
    throw new Error('Admin password is not configured')
  }

  const cookieStore = await cookies()

  cookieStore.set({
    name: ADMIN_SESSION_COOKIE,
    value: createAdminSessionToken(credential.passwordHash),
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/admin',
    maxAge: 60 * 60 * 8,
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()

  cookieStore.delete(ADMIN_SESSION_COOKIE)
}

export async function changeAdminPassword(currentPassword: string, newPassword: string) {
  if (newPassword.length < 8) {
    return { ok: false, error: 'short' }
  }

  if (!(await validateAdminPassword(currentPassword))) {
    return { ok: false, error: 'current' }
  }

  await prisma.adminCredential.upsert({
    where: { id: ADMIN_ID },
    update: { passwordHash: hashPassword(newPassword) },
    create: { id: ADMIN_ID, passwordHash: hashPassword(newPassword) },
  })

  await clearAdminSession()

  return { ok: true }
}
