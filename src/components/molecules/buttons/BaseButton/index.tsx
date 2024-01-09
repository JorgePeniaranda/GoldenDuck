import { ReactNode } from "react";
import style from "./styles.module.scss"

interface Props{
    children: ReactNode
    className?: string
    tag?: 'button' | 'InternalLinkText' | 'ExternalLinkText'
    yPadding?: string;
    xPadding?: string;
    backgroundColor?: string;
    fontWeight?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    fontSize?: string;
}

export default function BaseButton({children, className, tag = 'button', yPadding = "0.5rem", xPadding = "1rem", backgroundColor = "var(--primary)", fontWeight, fontSize}: Props) {
  const Tag = tag as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`${style.BaseButton} ${className}`} style={
      {
        padding: `${yPadding} ${xPadding}`,
        backgroundColor: backgroundColor,
        fontWeight: fontWeight,
        fontSize: fontSize,
      }
    }>
      {children}
    </Tag>
  )
}
