import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { Layout } from '~/components/layout'
import { UserPanel } from '~/components/user-panel'
import { getOtherUsers } from '~/utils/user.server'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const users = await getOtherUsers(userId)
  console.log(users)
  return json({ users }) // A loader has to return some value, even if that is null
}

export default function Home() {
  const { users } = useLoaderData()
  return (
    <Layout>
      <div className="flex h-full">
        <UserPanel users={users} />
        <div className="flex-1"></div>
      </div>
    </Layout>
  )
}
