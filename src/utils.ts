import os from 'os'
import https from 'https'

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

const url =
  'https://raw.githubusercontent.com/lework/skopeo-binary/master/version.txt'
export async function getSupportedVersions(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = ''

      res.on('data', chunk => {
        data += chunk
      })

      res.on('end', () => {
        resolve(data.trim().split('\n')) // Assuming the versions are separated by newlines
      })

      res.on('error', err => {
        reject(err)
      })
    })
  })
}

export async function getLatestVersion(): Promise<string> {
  const versions = await getSupportedVersions()
  // assuming the versions are sorted in descending order
  if (versions.length === 0) {
    throw new Error('No versions found')
  }
  return versions[versions.length - 1]
}
