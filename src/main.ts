import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import { getDownloadURL, getLatestVersion } from './utils'
// import * as exec from '@actions/exec'
// import { wait } from './wait'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // Get version of tool to be installed
    let version = core.getInput('version')
    if (version === 'latest') {
      // Get the latest version
      version = await getLatestVersion()
      core.debug(`Latest version of skopeo is ${version}`)
    }
    core.info(`Version to be installed: ${version}`)

    // Extract the tarball onto the runner
    const pathToCLI = './skopeo'

    // Download the specific version of the tool, e.g. as a tarball
    await tc.downloadTool(getDownloadURL(version), pathToCLI)

    // Expose the tool by adding it to the PATH
    core.addPath(pathToCLI)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
