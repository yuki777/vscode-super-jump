## .vscode/settings.json

```json
{
  "vscode-super-jump.configs": [
    {
      "triggerLanguages": [
        "php",
      ],
      "regex": "(foo|FOO)_(bar|BAR).txt",
      "searchFileName": "$1/$2",
      "searchFileNameConvertRules": [
        "pascalCase"
      ],
      "searchDirectories": [
        "path/to"
      ],
      "searchFileExtension": ".txt"
    }
  ]
}
```
