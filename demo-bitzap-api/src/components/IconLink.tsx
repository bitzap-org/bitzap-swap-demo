import { scanDomain } from '../utils'
import { ExternalLinkIcon } from '@radix-ui/react-icons'

export default function IconLink({href}: {href: string}) {
  return (
    <a href={href} target="_blank" style={{display: 'flex', alignItems: 'center'}}>
      <ExternalLinkIcon />
    </a>
  )
}

export function TXLink({hash}: {hash: string}) {
  return (
    <IconLink href={`${scanDomain}/tx/${hash}`} />
  )
}