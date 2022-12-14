import { useState } from 'react'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { useActionData, Form } from '@remix-run/react'
import { json, redirect } from '@remix-run/node'
import { Layout } from '~/components/layout'
import { FormField } from '~/components/form-field'
import {
  validateEmail,
  validateName,
  validatePassword,
} from '~/utils/validators.server'
import { login, register, getUser } from '~/utils/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  // If there's already a user in the session redirect to the home page
  return (await getUser(request)) ? redirect('/') : null
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const action = form.get('_action')
  const email = form.get('email')
  const password = form.get('password')
  let firstName = form.get('firstName')
  let lastName = form.get('lastName')

  if (
    typeof action !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string'
  ) {
    return json({ error: 'Invalid form data', form: action }, { status: 400 })
  }

  if (
    action === 'register' &&
    (typeof firstName !== 'string' || typeof lastName !== 'string')
  ) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 400 })
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action === 'register'
      ? {
          firstName: validateName((firstName as string) || ''),
          lastName: validateName((lastName as string) || ''),
        }
      : {}),
  }

  if (Object.values(errors).some(Boolean)) {
    return json(
      {
        errors,
        fields: { email, password, firstName, lastName },
        form: action,
      },
      { status: 400 }
    )
  }

  switch (action) {
    case 'login': {
      return await login({ email, password })
    }
    case 'register': {
      firstName = firstName as string
      lastName = lastName as string
      return await register({ email, password, firstName, lastName })
    }
    default: {
      return json({ error: 'Invalid Form Data' }, { status: 400 })
    }
  }
}

export default function Login() {
  const [action, setAction] = useState('login')
  const actionData: any = useActionData<typeof action>()

  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || '',
    password: actionData?.fields?.password || '',
    firstName: actionData?.fields?.firstName || '',
    lastName: actionData?.fields?.lastName || '',
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

        <Form method="post" className="w-96 rounded-2xl bg-gray-200 p-6">
          <div className="w-full text-center text-xs font-semibold tracking-wide text-red-500">
            {actionData?.error}
          </div>
          <FormField
            htmlFor="email"
            label="Email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, 'email')}
            error={actionData?.errors?.email}
          />
          <FormField
            htmlFor="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange(e, 'password')}
            error={actionData?.errors?.password}
          />
          {action === 'register' && (
            <>
              <FormField
                htmlFor="firstName"
                label="First Name"
                onChange={(e) => handleInputChange(e, 'firstName')}
                value={formData.firstName}
                error={actionData?.errors?.firstName}
              />
              <FormField
                htmlFor="lastName"
                label="Last Name"
                onChange={(e) => handleInputChange(e, 'lastName')}
                value={formData.lastName}
                error={actionData?.errors?.lastName}
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
        </Form>
      </div>
    </Layout>
  )
}
