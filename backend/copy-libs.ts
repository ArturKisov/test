import * as fs from 'fs-extra';

const package_configs = JSON.parse(fs.readFileSync('package.json').toString());
if (package_configs.frontendPublicLibs) {
  const libs = package_configs.frontendPublicLibs as string[];
  libs.forEach((libName) => {
    try {
      fs.copy(`./node_modules/${libName}`, `./public/libs/${libName}`)
    } catch (e) {
      console.error(e);
    }
  })
}