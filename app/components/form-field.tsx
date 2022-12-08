interface FormFieldProps {
  htmlFor: string
  label: string
  type?: string
  value: any
  onChange?: (...args: any) => any
}

export function FormField({
  htmlFor,
  label,
  type = 'text',
  value,
  onChange = () => {},
}: FormFieldProps) {
  return (
    <>
      <label htmlFor={htmlFor} className="font-semibold text-blue-600">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        id={htmlFor}
        name={htmlFor}
        className="my-2 w-full rounded-xl p-2"
        value={value}
      />
    </>
  )
}
