import { InputProps } from '@/types'
import styles from './styles.module.scss'


interface Props extends InputProps{
  BaseStyle?: boolean
}

export default function BaseInput({
  BaseStyle = true,
  type,
  name,
  id,
  onChange,
  onBlur,
  className,
  style,
  required,
  placeholder,
  value,
  disabled,
  readOnly,
  autoFocus,
  autoComplete,
  pattern,
  maxLength,
  minLength,
  max,
  min,
  list,
  checked
}: Props) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      onChange={onChange}
      onBlur={onBlur}
      className={`${BaseStyle && styles.BaseInput} ${className}}`}
      style={style}
      required={required}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      readOnly={readOnly}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      pattern={pattern}
      maxLength={maxLength}
      minLength={minLength}
      max={max}
      min={min}
      list={list}
      checked={checked}
    />
  )
}
