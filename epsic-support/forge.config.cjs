module.exports = {
  packagerConfig: {
    name: 'EPSIC Support',
    executableName: 'EPSIC Support',
    ignore: (filePath) => {
      if (!filePath) return false
      if (filePath.startsWith('/dist')) return false
      if (filePath.startsWith('/electron')) return false
      if (filePath === '/package.json') return false
      return true
    },
  },
  makers: [
    {
      name: '@electron-forge/maker-zip',
      platforms: ['win32'],
    },
  ],
}
