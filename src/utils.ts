import os from 'os'

const supportedPlatform = ['darwin', 'linux']
const supportedArch = ['amd64', 'arm64']
const archAlias: Record<string, string> = {
  x64: 'amd64'
}
export function getDownloadURL(version: string): string {
  const platform = os.platform()
  if (!supportedPlatform.includes(platform)) {
    throw new Error(`Unsupported platform: ${platform}`)
  }
  const arch = os.arch()
  const aliasedArch = archAlias[arch] || arch
  if (!supportedArch.includes(aliasedArch)) {
    throw new Error(`Unsupported arch: ${arch}`)
  }
  return `https://github.com/lework/skopeo-binary/releases/download/${version}/skopeo-${platform}-${aliasedArch}`
}
