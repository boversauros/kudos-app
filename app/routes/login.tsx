import { useState } from 'react'
import { Layout } from '~/components/layout'
import { FormField } from '~/components/form-field'

export default function Login() {
  const [action, setAction] = useState('login')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })

  // Updates the form data when an input changes
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }))
  }

  return (
    <Layout>
      <div className="flex h-full flex-col items-center justify-center gap-y-4">
        <button
          onClick={() => setAction(action === 'login' ? 'register' : 'login')}
          className="absolute top-8 right-8 rounded-xl bg-yellow-300 px-3 py-2 font-semibold text-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-yellow-400"
        >
          {action === 'login' ? 'Sign up' : 'Sign In'}
        </button>
        <h2 className="text-5xl font-extrabold text-yellow-300">
          Welcome to Kudos
        </h2>
        <p className="font-semibold text-slate-300">
          {action === 'login'
            ? 'Log In to Give Some PRaise'
            : 'Sign Up To Get Started!'}
        </p>

        <form method="post" className="w-96 rounded-2xl bg-gray-200 p-6">
          <FormField
            htmlFor="email"
            label="Email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, 'email')}
          />
          <FormField
            htmlFor="password"
            label="Password"
            value={formData.email}
            onChange={(e) => handleInputChange(e, 'password')}
          />
          {action === 'register' && (
            <>
              <FormField
                htmlFor="firstName"
                label="First Name"
                onChange={(e) => handleInputChange(e, 'firstName')}
                value={formData.firstName}
              />
              <FormField
                htmlFor="lastName"
                label="Last Name"
                onChange={(e) => handleInputChange(e, 'lastName')}
                value={formData.lastName}
              />
            </>
          )}

          <div className="w-full text-center">
            <button
              type="submit"
              name="_action"
              value={action}
              className="mt-2 rounded-xl bg-yellow-300 px-3 py-2 font-semibold text-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-yellow-400"
            >
              {action === 'login' ? 'Sign In' : ' Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
