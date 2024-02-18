import style from './styles.module.scss'
import InternalLinkText from '@/components/atoms/text/InternalLinkText'

interface Props {
  category: string
  links: Array<{ href: string, text: string }>
  icon?: React.ReactNode
}

export default function NavDisclosure ({ category, links, icon }: Props) {
  return (
    <details className={style.CategoryLinks}>
      <summary>
        {icon !== undefined && icon !== null && <figure>{icon}</figure>}
        {category}
        <svg
          className={style.Arrow}
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062"
          />
        </svg>
      </summary>
      {links.map((link, index) => (
        <InternalLinkText href={link.href} key={index}>
          {link.text}
        </InternalLinkText>
      ))}
    </details>
  )
}
