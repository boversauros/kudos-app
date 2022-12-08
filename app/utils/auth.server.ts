import type { RegisterForm } from './types.server'
import { prisma } from './prisma.server'
import { json } from '@remix-run/node'

export async function register(user: RegisterForm) {
  const exist = await prisma.user.count({ where: { email: user.email } })
  if (exist) {
    return json(
      { error: `User already exists with that email: ${user.email}` },
      { status: 400 }
    )
  }
}
