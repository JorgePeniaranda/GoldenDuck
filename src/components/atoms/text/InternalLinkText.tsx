import Link from "next/link";

interface Props {
    href: string,
    children?: React.ReactNode,
    arialLabel?: string
}

export default function InternalLinkText({href, children, arialLabel}: Props) {
  return (
    <Link 
        href={href}
        aria-label={arialLabel}
    >
        {children}
    </Link>
  )
}
