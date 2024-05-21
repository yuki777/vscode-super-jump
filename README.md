# vscode-super-jump
[vscode-super-jump - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=YukiAdachi.vscode-super-jump)

## 機能
- 1. ユーザーが設定した特定の言語で、
  - もしくは特定の拡張子で、
- 2. カレントカーソル位置のテキストが、ユーザーが設定した正規表現にマッチする場合、
- 3. マッチしたテキストをユーザーの設定に従いフォーマットし、
  - これは一旦不要。
  - 拡張機能側で、マッチしたテキストから、それっぽい候補を作成して、特定のディレクトリ内を検索する
- 4. フォーマットされたテキスト名のファイルが、ユーザーが設定した特定のディレクトリに存在する場合、ジャンプする

## 設定イメージ
```json
[
  {
    "targetLanguages": [
      "php",
      "twig",
      "shellscript"
    ],
    "targetExtensions": [
      ".php",
      ".twig",
      ".sh",
      ".bash"
    ],
    "regex": "/(get|post|put|delete|resource|uri|ResourceParam|Embed)\\(.*?app:\\/\\/self\\/(.*)['\"]/",
    "searchDirectories": [
      "src/Resource/App"
    ],
    "searchFileName": "$2.php",
    "searchFileNameConvertCamelCase": true,
    "searchFileNameConvertSnakelCase": false,
    "searchFileNameConvertDashToSlash": true
  },
  {
    "targetLanguages": [
      "php",
      "twig",
      "shellscript"
    ],
    "targetExtensions": [
      ".php",
      ".twig",
      ".sh",
      ".bash"
    ],
    "regex": "/(get|post|put|delete|resource|uri|ResourceParam|Embed)\\(.*?page:\\/\\/self\\/(.*)['\"]/",
    "searchDirectories": [
      "src/Resource/Page",
      "src/Resource/Page/Admin",
      "src/Resource/Page/Cli",
      "src/Resource/Page/Content"
    ],
    "searchFileName": "$2.php",
    "searchFileNameConvertCamelCase": true,
    "searchFileNameConvertSnakelCase": false,
    "searchFileNameConvertDashToSlash": true
  }
]
```

