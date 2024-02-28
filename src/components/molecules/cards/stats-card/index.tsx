import React from 'react'
import style from './styles.module.scss'
import classNames from 'classnames'

interface Props {
  title: string
  value: string
  progress: number
  classname?: string
  icon?: React.ReactNode
  iconBGColor?: string
}

export default function InfoCard ({
  title,
  value,
  progress,
  classname,
  icon,
  iconBGColor
}: Props): JSX.Element {
  const classes = classNames(style.InfoCard, classname)
  const spanClasses = classNames(
    { [style.positive]: progress > 0 },
    { [style.negative]: progress < 0 }
  )

  return (
    <section className={classes}>
      <article>
        <h2>{title}</h2>
        <b>{value}</b>
        <p className={style.indicator}>
          <span className={spanClasses}>{Math.abs(progress)}</span> desde ayer
        </p>
      </article>
      {icon !== undefined && (
        <figure style={{ backgroundColor: iconBGColor }}>{icon}</figure>
      )}
    </section>
  )
}
