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
| regex                       | ジャンプ発動させたいテキストに対応する正規表現 |
| searchFileName              | マッチした正規表現のキャプチャ変数        |
| searchFileNameConvertRules  | マッチしたテキストをフォーマットするルール (option) |
| searchFileExtension         | 検索対象ファイルの拡張子 (option)                  |
| searchDirectories           | ファイルを検索するディレクトリ            |

## 設定サンプル
```json
[
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
    "searchFileExtension": ".php",
    "searchDirectories": [
      "src/Resource/App"
    ],
  },
  {
    "targetLanguages": [
      "php",
      "twig",
      "shellscript",
      "go",
      "python"
    ],
    "regex": "(get|post|put|delete|resource|uri|ResourceParam|Embed)\\(.*?page:\\/\\/self\\/([^'\"\\{\\?#]*)",
    "searchFileName": "$2",
    "searchFileNameConvertRules": [
      "pascalCase"
    ],
    "searchFileExtension": ".php",
    "searchDirectories": [
      "src/Resource/Page",
      "src/Resource/Page/Admin",
      "src/Resource/Page/Cli",
      "src/Resource/Page/Content"
    ]
  }
]
```

