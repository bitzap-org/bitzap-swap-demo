import iconLink from '../assets/images/link.svg'
import { scanDomain } from '../utils'

export default function IconLink({href}: {href: string}) {
  return (
    <a href={href} target="_blank">
      <img src={iconLink} alt="link" />  
    </a>
  )
}

export function TXLink({hash}: {hash: string}) {
  return (
    <IconLink href={`${scanDomain}/tx/${hash}`} />
  )
}