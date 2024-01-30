import { InputProps } from '@/types'
import styles from './styles.module.scss'
import classNames from 'classnames'

interface Props extends InputProps {
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
  checked,
}: Props) {
  const classes = classNames({[styles.BaseInput]: BaseStyle}, className)

  return (
    <input
      type={type}
      name={name}
      id={id}
      onChange={onChange}
      onBlur={onBlur}
      className={classes}
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
