import { useEffect } from 'react'

const replacements: Array<[string, string]> = [
  ['THE MARGIN', 'ESTHER'],
  ['The Margin', 'ESTHER'],
  ['the margin', 'ESTHER']
]

function applyBrand(node: Node) {
  if (node.nodeType === Node.TEXT_NODE && node.nodeValue) {
    node.nodeValue = replacements.reduce((text, [from, to]) => text.split(from).join(to), node.nodeValue)
  }
  node.childNodes.forEach(applyBrand)
}

export function PublicationIdentity() {
  useEffect(() => {
    const apply = () => {
      applyBrand(document.body)
      document.title = document.title.split('The Margin').join('ESTHER')
    }
    apply()
    const observer = new MutationObserver(apply)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])
  return null
}
