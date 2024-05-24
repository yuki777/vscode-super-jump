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
      }
    ];
    const provider = new PeekFileDefinitionProvider(configs);
    assert(provider instanceof PeekFileDefinitionProvider, 'provider should be an instance of PeekFileDefinitionProvider');

    let testText = "$this->resource->get('app://self/Article/Valid?foo=FOO');";
    let cursorPosition = 25;
    let expectTargetFile = ["src/Resource/App/Article/Valid.php"];
    let expectCount = 1;
    let document = {
      getText: (range: vscode.Range) => testText,
      getWordRangeAtPosition: (position: vscode.Position, regex: RegExp) => new vscode.Range(position, position.translate(0, cursorPosition))
    } as vscode.TextDocument;
    let targetFiles = provider.getTargetFiles(document, new vscode.Position(0, 0));
    assert.strictEqual(targetFiles.length, expectCount);
    assert.deepStrictEqual(targetFiles, expectTargetFile);

    testText = "$this->resource->get('page://self/Article/Valid?foo=FOO');";
    cursorPosition = 25;
    expectTargetFile = ["src/Resource/Page/Article/Valid.php", "src/Resource/Page/Admin/Article/Valid.php", "src/Resource/Page/Cli/Article/Valid.php", "src/Resource/Page/Content/Article/Valid.php"];
    expectCount = 4;
    document = {
      getText: (range: vscode.Range) => testText,
      getWordRangeAtPosition: (position: vscode.Position, regex: RegExp) => new vscode.Range(position, position.translate(0, cursorPosition))
    } as vscode.TextDocument;
    targetFiles = provider.getTargetFiles(document, new vscode.Position(0, 0));
    assert.strictEqual(targetFiles.length, expectCount);
    assert.deepStrictEqual(targetFiles, expectTargetFile);
  });
});
