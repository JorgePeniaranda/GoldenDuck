import Link from "next/link";
import { CSSProperties, ReactNode } from "react";

interface Props {
  href: string;
  children?: ReactNode;
  arialLabel?: string;
  className?: string;
  style?: CSSProperties;
}

export default function InternalLinkText({
  href,
  children,
  arialLabel,
  className,
  style,
}: Props) {
  return (
    <Link
      href={href}
      aria-label={arialLabel}
      className={className}
      style={style}
    >
      {children}
    </Link>
  );
}
