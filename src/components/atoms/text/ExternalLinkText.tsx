import Link from 'next/link'

interface Props {
  href: string
  children?: React.ReactNode
  arialLabel?: string
  className?: string
}

export default function ExternalLinkText({
  href,
  children,
  arialLabel,
  className,
}: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={arialLabel}
      className={className}
    >
      {children}
    </Link>
  )
}
