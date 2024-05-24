import * as assert from 'assert';
import * as vscode from 'vscode';
import PeekFileDefinitionProvider from '../../PeekFileDefinitionProvider';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('getTargetFiles basics', () => {
    const configs = [
      {
        "targetLanguages": [
          "php",
        ],
        "regex": "(get|post|put|delete|resource|uri|ResourceParam|Embed)\\(.*?app:\\/\\/self\\/([^'\"\\{\\?#]*)",
        "searchFileName": "$2",
        "searchFileNameConvertRules": [
          "pascalCase"
        ],
        "searchDirectories": [
          "src/test/dummy/App"
        ],
        "searchFileExtension": ".php"
      }
    ];
    const provider = new PeekFileDefinitionProvider(configs);
    assert(provider instanceof PeekFileDefinitionProvider, 'provider should be an instance of PeekFileDefinitionProvider');

    const document = {
      getText: (range: vscode.Range) => "$this->resource->get('app://self/Article/Valid?foo=FOO');",
      getWordRangeAtPosition: (position: vscode.Position, regex: RegExp) => new vscode.Range(position, position.translate(0, 25))
    } as vscode.TextDocument;
    const targetFiles = provider.getTargetFiles(document, new vscode.Position(0, 0));
    assert.strictEqual(targetFiles.length, 1);
    assert.deepStrictEqual(targetFiles, ['src/test/dummy/App/Article/Valid.php']);
  });
});
