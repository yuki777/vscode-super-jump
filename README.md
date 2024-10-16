<p align="center"><img src="https://raw.githubusercontent.com/yuki777/vscode-super-jump/main/icon.png" alt="icon"></p>

## vscode-super-jump
- [日本語(Japanese)](https://github.com/yuki777/vscode-super-jump/blob/main/README.ja.md)
- [vscode-super-jump - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=YukiAdachi.vscode-super-jump)

## Features
- In a specific language set by the user,
- If the text at the current cursor position matches a regular expression set by the user,
- The matched text is formatted according to the user's settings,
- If a file with the formatted text name exists in a specific directory set by the user, it jumps to that file.

## Configuration Items

| Item                        | Description                                                                                              |
|-----------------------------|----------------------------------------------------------------------------------------------------------|
| triggerLanguages            | Programming languages to use the extension with                                                          |
| regex                       | Regular expression corresponding to the text you want to trigger the jump (escape `"` and `\` as needed) |
| searchFileName              | File name to search if matched. You can use regular expression capture variables                         |
| searchFileNameConvertRules  | Rules to format the matched text                                                                         |
| searchFileExtension         | Extension of the target file                                                                             |
| searchDirectories           | Directories to search for the file                                                                       |

## Configuration Sample
- [settings.json](https://github.com/yuki777/vscode-super-jump/wiki)

## `searchFileNameConvertRules`
- Supports the following using [case-anything](https://www.npmjs.com/package/case-anything)
- adaCase
- camelCase
- capitalCase
- cobolCase
- constantCase
- dotNotation
- kebabCase
- lowerCase
- pascalCase
- pathCase
- snakeCase
- spaceCase
- trainCase
- upperCamelCase
- upperCase

## Support
- It is maintained by `yuki777`
- If you wish to make a voluntary donation you can do so via my new Buy Me a Coffee page.

<a href="https://www.buymeacoffee.com/yuki777" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
