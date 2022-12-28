import type { LoaderFunction } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { Layout } from '~/components/layout'
import { UserPanel } from '~/components/user-panel'

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)
  return null // A loader has to return some value, even if that is null
}

export default function Home() {
  return (
    <Layout>
      <div className="flex h-full">
        <UserPanel />
      </div>
    </Layout>
  )
}
