import { InputProps } from '@/types'
import React from 'react'

export default function BaseInput({
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
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      id={id}
      onChange={onChange}
      onBlur={onBlur}
      className={className}
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
    />
  )
}
