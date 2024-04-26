# Ramp 4 Config Editor

This is an interactive config creator and editor for RAMP4 config files.

:construction: Currently does not have 100% coverage of all configuration options :construction:

[Basic Live Demo](https://ramp4-pcar4.github.io/config-editor/)

## Usage

When you start up the app, you will notice a fancy loading screen that says waiting for config. You need to use the app's API in order to "start" the app.

The API is available on the `window` object via the `ramp4EditorAPI` property. You can read the `src/main.ts` file for further details on what goodies the API provides.

To start the app, you'll want to open the console in your browser and do:

```javascript
window.ramp4EditorAPI.initialize(ramp4Config, ramp4Options);
```

The app will be started with the initial config and options if you provide them. Otherwise, respectful defaults will be used.

Anytime you go into any of the sections and edit any property, the change is reflected immediately, without the need to press any save button. You can view your current config via:

```javascript
window.ramp4EditorAPI.getConfig();
```

## Updating the RAMP build

Whenever you want to update the RAMP4 build to the latest and greatest, just replace the files in the `src/lib` folder.

## Storylines Integration

The easiest and best way to integrate this is by creating a build of the app via `npm run build:lib-legacy`, republishing the plugin via `npm publish`, and then updating the
plugin in the Storylines Editor repo to the newest version. Note that the legacy option can be removed once the Storylines Editor migrates to Vite or a newer version of Vue CLI.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Build Plugin

```sh
npm run build:lib
npm run build:lib-legacy (for apps with older builds)
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
