import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)
  return redirect('/home')
}

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center bg-slate-700">
      <h2 className="text-5xl font-extrabold text-blue-600">
        TailwindCSS is working
      </h2>
    </div>
  )
}
