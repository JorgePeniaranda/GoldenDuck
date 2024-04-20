import React, { type ReactNode } from 'react'
import style from './styles.module.scss'
import ExternalLinkText from '@/components/atoms/text/ExternalLinkText'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'
import classNames from 'classnames'
import Spinner from '@/components/atoms/spinner'

interface Props {
  children: ReactNode
  className?: string
  type?: 'button' | 'InternalLinkText' | 'ExternalLinkText'
  yPadding?: string
  xPadding?: string
  backgroundColor?: string
  fontWeight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  fontSize?: string
  fontColor?: string
  href?: string
  loading?: boolean
}

export default function BaseButton ({
  children,
  className,
  type = 'button',
  yPadding = '0.5rem',
  xPadding = '1rem',
  backgroundColor = 'var(--primary)',
  fontWeight,
  fontSize,
  fontColor,
  href,
  loading
}: Props): JSX.Element {
  const props = {
    className: classNames(style.BaseButton, className, {
      [style.loading]: loading
    }),
    style: {
      padding: `${yPadding} ${xPadding}`,
      backgroundColor,
      fontWeight,
      fontSize,
      color: fontColor
    }
  }

  switch (type) {
    case 'button':
      return (
        <button {...props} disabled={loading}>
          {children}
          {loading === true && <Spinner />}
        </button>
      )
    case 'InternalLinkText':
      return (
        <InternalLinkText href={href ?? '#'} {...props}>
          {children}
        </InternalLinkText>
      )
    case 'ExternalLinkText':
      return (
        <ExternalLinkText href={href ?? '#'} {...props}>
          {children}
        </ExternalLinkText>
      )
  }
}
