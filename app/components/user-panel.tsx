import type { User } from '@prisma/client'
import { UserCircle } from '~/components/user-circle'

export function UserPanel({ users }: { users: User[] }) {
  return (
    <div className="flex w-1/6 flex-col bg-gray-200">
      <div className="flex h-20 items-center justify-center bg-gray-300 text-center">
        <h2 className="text-xl font-semibold text-blue-600">My team</h2>
      </div>
      <div className="flex flex-1 flex-col gap-y-10 overflow-y-scroll py-4">
        {users.map((user) => (
          <UserCircle
            key={user.id}
            profile={user.profile}
            className="mx-auto h-24 w-24 flex-shrink-0"
          />
        ))}
      </div>
      <div className="bg-gray-300 p-6 text-center">
        <button
          type="submit"
          className="rounded-xl bg-yellow-300 px-3 py-2 font-semibold text-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-yellow-400"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
