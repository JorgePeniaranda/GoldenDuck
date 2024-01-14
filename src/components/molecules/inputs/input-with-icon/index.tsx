import styles from './styles.module.scss'
import BaseInput from '../base-input'
import { ReactNode } from 'react'
import { InputProps } from '@/types'

interface Props extends InputProps {
  icon: ReactNode
  position?: 'left' | 'right'
}

export default function InputWithIcon({
  icon,
  position = 'left',
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
}: Props) {
  return (
    <div className={styles.InputWithIcon} id={position}>
      {position === 'left' && icon}
      <BaseInput
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
      {position === 'right' && icon}
    </div>
  )
}
