# This Webpack plugin adds ability to select certain theme at build step

## How-to:
`npm i --save-dev skin-plugin`
1) Create basic stylesheet file: `SomeFile.css`
2) Create skinned version and place it near original file, name it with `SomeFile:SKIN_NAME.css` where `SKIN_NAME` is name of your skin
3) Import basic file somewhere - in React component, in some entry point etc
4) `import SkinPlugin from 'skin-plugin'` to Webpack config and add `new SkinPlugin('SKIN_NAME')` to plugins list

By default it handles `css` and `scss` file extensions. You can provide your own style file extensions list to handle with second argument: `new SkinPlugin('my-cool-skin', ['css', 'pcss', 'less'])`
