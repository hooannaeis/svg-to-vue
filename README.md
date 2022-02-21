# svg-to-vue
turns an svg file into a vue component

## Installation
make this package locally executeable. 
```bash
$ npm link
```
This will create a CLI-application called `svgconverter`

## Usage
there are two modes

### run for all files in directory

If you run 
```bash
$ svgconverter
```
every `.svg` file in the current working directoy will be turned into a `.vue` file.

### run for specific 
If you run 
```bash
$ svgconverter path-to-specific-file-in.svg
```
only the specific file will be converted

## Use in Vue-App
the resulting `.vue` files you can use wrapped in an `IconBase.vue` tag (see example in ExampleBase.vue) 


