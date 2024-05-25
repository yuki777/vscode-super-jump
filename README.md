# vscode-super-jump
[vscode-super-jump - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=YukiAdachi.vscode-super-jump)

## 機能
- ユーザーが設定した特定の言語で、
- カレントカーソル位置のテキストが、ユーザーが設定した正規表現にマッチした場合、
- マッチしたテキストをユーザーの設定に従いフォーマットし、
- フォーマットされたテキスト名のファイルが、ユーザーが設定した特定のディレクトリに存在する場合、ジャンプする

## 設定項目

| 項目                        | 説明                                      |
|-----------------------------|-------------------------------------------|
| targetLanguages             | 拡張を使用するプログラミング言語          |
| regex                       | ジャンプ発動させたいテキストに対応する正規表現 (`"`と`\`はエスケープが必要です) |
| searchFileName              | マッチした正規表現のキャプチャ変数        |
| searchFileNameConvertRules  | マッチしたテキストをフォーマットするルール  |
| searchFileExtension         | 検索対象ファイルの拡張子                 |
| searchDirectories           | ファイルを検索するディレクトリ            |

## `searchFileNameConvertRules`
- [case-anything](https://www.npmjs.com/package/case-anything)を使用し、下記をサポートしています
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

## 設定サンプル
- settings.json
```json
{
    "vscode-super-jump.configs": [
            {
              "targetLanguages": [
                "php",
                "twig",
                "shellscript"
              ],
              "regex": "(get|post|put|delete|resource|uri|ResourceParam|Embed)\\(.*?app:\\/\\/self\\/([^'\"\\{\\?#]*)",
              "searchFileName": "$2",
              "searchFileNameConvertRules": [
                "pascalCase"
              ],
              "searchDirectories": [
                "src/Resource/App"
              ],
              "searchFileExtension": ".php"
            },
            {
              "targetLanguages": [
                "php",
                "twig",
                "shellscript"
              ],
              "regex": "(get|post|put|delete|resource|uri|ResourceParam|Embed)\\(.*?page:\\/\\/self\\/([^'\"\\{\\?#]*)",
              "searchFileName": "$2",
              "searchFileNameConvertRules": [
                "pascalCase"
              ],
              "searchDirectories": [
                "src/Resource/Page",
                "src/Resource/Page/Admin",
                "src/Resource/Page/Cli",
                "src/Resource/Page/Content"
              ],
              "searchFileExtension": ".php"
            },
            {
              "targetLanguages": [
                "php"
              ],
              "regex": "#\\[JsonSchema\\(.*?schema\\s?:\\s?'([^']*)'.*?\\)\\]",
              "searchFileName": "$1",
              "searchDirectories": [
                "var/json_schema"
              ]
            },
            {
              "targetLanguages": [
                "php"
              ],
              "regex": "#\\[JsonSchema\\(.*?params\\s?:\\s?'([^']*)'.*?\\)\\]",
              "searchFileName": "$1",
              "searchDirectories": [
                "var/json_validate"
              ]
            }
    ]
}
```
