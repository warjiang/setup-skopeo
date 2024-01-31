# Create a GitHub Action Using TypeScript

[![GitHub Super-Linter](https://github.com/actions/typescript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

Use this action to setup environment of skopeo, and use skopeo to sync images across the registries. :rocket:

## Prerequisites
- Basic knowledge of docker images and [skopeo](https://github.com/containers/skopeo) which is a container tool to sync images across the registries.
- This action runs using Node 20. If you are using self-hosted GitHub Actions runners, you must use a [runner version](https://github.com/actions/virtual-environments) that supports this version or newer.

## Usage

```
jobs:
  job_id:
    steps:
    - name: 'Set up skopeo'
      uses: warjiang/setup-skopeo@v0.1.1
      with:
        version: latest

    - name: 'Sync images'
      run: |
        skopeo --version
        skopeo copy --dest-creds ${{ secrets.DEST_REGISTRY_USER }}:${{ secrets.DEST_REGISTRY_PASSWORD }}  docker://alpine:3.19 docker://${{ secrets.DEST_REGISTRY }}/alpine:3.19
```


## Inputs

- version: (Optional) Set the version of skopeo. Default: latest. More informations about supported versions can be found [here](https://github.com/lework/skopeo-binary/blob/master/version.txt).


## Credits
- [skopeo-binary](https://github.com/lework/skopeo-binary): generate the skopeo binary file, it fetches all the tags of official skopeo repository and generate the binary file for each tag by a cronjob.
- [actions/toolkit](https://github.com/actions/toolkit): some toolkis which very useful for GitHub actions.
- [actions/typescript-action](https://github.com/actions/typescript-action): which is a template for creating a TypeScript action.