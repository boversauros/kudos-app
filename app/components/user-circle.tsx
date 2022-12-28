import type { Profile } from '@prisma/client'

interface props {
  profile: Profile
  className?: string
  onClick?: (...args: any) => any
}

export function UserCircle({ profile, onClick, className }: props) {
  return (
    <div
      className={`${className} flex cursor-pointer items-center justify-center rounded-full bg-gray-400`}
      onClick={onClick}
    >
      <h2>
        {profile.firstName.charAt(0).toUpperCase()}
        {profile.lastName.charAt(0).toUpperCase()}
      </h2>
    </div>
  )
}
