import path from 'node:path'

export function getModuleFormat(
  id: string,
  moduleType?: string,
): 'module' | 'commonjs' {
  const ext = path.extname(id)
  switch (ext) {
    case '.mjs':
    case '.mts':
      return 'module'
    case '.cjs':
    case '.cts':
      return 'commonjs'
    default:
      return moduleType === 'module' ? 'module' : 'commonjs'
  }
}
