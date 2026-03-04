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
  hooks: {
    postPackage: async (forgeConfig, options) => {
      const { promises: fs } = require('fs')
      const path = require('path')
      for (const outputPath of options.outputPaths) {
        await fs.copyFile(
          path.join(__dirname, 'installer/create-shortcut.bat'),
          path.join(outputPath, 'Créer raccourci bureau.bat')
        )
      }
    },
  },
}
