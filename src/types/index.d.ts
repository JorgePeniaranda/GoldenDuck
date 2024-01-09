export type InputProps = {
  type:
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'
  name: string
  id?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void
  className?: string
  style?: React.CSSProperties
  required?: boolean
  placeholder?: string
  value?: string
  disabled?: boolean
  readOnly?: boolean
  autoFocus?: boolean
  autoComplete?: string
  pattern?: string
  maxLength?: number
  minLength?: number
  max?: number
  min?: number
  list?: string
}
