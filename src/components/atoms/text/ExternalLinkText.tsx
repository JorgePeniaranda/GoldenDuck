import Link from "next/link";

interface Props {
    href: string,
    children?: React.ReactNode,
    arialLabel?: string
}

export default function ExternalLinkText({href, children, arialLabel}: Props) {
  return (
    <Link 
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={arialLabel}
    >
        {children}
    </Link>
  )
}
