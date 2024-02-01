import style from "./styles.module.scss";
import classNames from "classnames";
import Text from "../Text";

interface Props{
  show: boolean,
  children?: string,
  align?: "center" | "left" | "right",
  className?: string
}

export default function ErrorSpan({ children, show, align, className}: Props) {
    const classes = classNames(style.error, className, {
        "text-center": align === "center",
        "text-start": align === "left",
        "text-end": align === "right",
    });

    if(!show) return null;
    
  return (
    <span className={classes}>
      {children}
    </span>
  )
}
