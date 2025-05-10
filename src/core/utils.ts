import path from 'node:path'

export function getModuleFormat(
  id: string,
): 'module' | 'commonjs' | 'json' | undefined {
  const ext = path.extname(id)
  switch (ext) {
    case '.mjs':
    case '.mts':
      return 'module'
    case '.cjs':
    case '.cts':
      return 'commonjs'
    case '.json':
      return 'json'
  }
}
