export function findNode(tree: any, func: any) {
  for (const node of tree) {
    if (func(node)) return node
    if (node.children) {
      const res: any = findNode(node.children, func)
      if (res) return res
    }
  }
  return null
}
