import { ReactNode } from "react";
import style from "./styles.module.scss";
import ExternalLinkText from "@/components/atoms/text/ExternalLinkText";
import InternalLinkText from "@/components/atoms/text/InternalLinkText";

interface Props {
  children: ReactNode;
  className?: string;
  type?: "button" | "InternalLinkText" | "ExternalLinkText";
  yPadding?: string;
  xPadding?: string;
  backgroundColor?: string;
  fontWeight?:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  fontSize?: string;
  fontColor?: string;
  href?: string;
}

export default function BaseButton({
  children,
  className,
  type = "button",
  yPadding = "0.5rem",
  xPadding = "1rem",
  backgroundColor = "var(--primary)",
  fontWeight,
  fontSize,
  fontColor,
  href,
}: Props) {
  const props = {
    className: `${style.BaseButton} ${className}`,
    style: {
      padding: `${yPadding} ${xPadding}`,
      backgroundColor: backgroundColor,
      fontWeight: fontWeight,
      fontSize: fontSize,
      color: fontColor,
    },
  };
  switch (type) {
    case "button":
      return <button {...props}>{children}</button>;
    case "InternalLinkText":
      return (
        <InternalLinkText href={href || "#"} {...props}>
          {children}
        </InternalLinkText>
      );
    case "ExternalLinkText":
      return (
        <ExternalLinkText href={href || "#"} {...props}>
          {children}
        </ExternalLinkText>
      );
  }
}
