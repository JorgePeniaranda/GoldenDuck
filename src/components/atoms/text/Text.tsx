import classNames from 'classnames'

interface Props {
  tag?: 'span' | 'small' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  weight?: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  size?: number | string
  children: React.ReactNode
  className?: string
}

export default function Text ({
  tag = 'p',
  weight = '400',
  size = '1rem',
  children,
  className
}: Props) {
  const Tag = tag as keyof JSX.IntrinsicElements
  const classes = classNames(className)

  return (
    <Tag
      className={classes}
      style={{
        fontSize: size,
        fontWeight: weight
      }}
    >
      {children}
    </Tag>
  )
}
