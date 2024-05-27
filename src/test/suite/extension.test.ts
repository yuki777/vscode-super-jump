import * as assert from 'assert';
import * as vscode from 'vscode';
import PeekFileDefinitionProvider from '../../PeekFileDefinitionProvider';
import { suite, test } from 'mocha';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('sample fail test', () => {
    assert.strictEqual([], 0);
  });

  test('sample success test', () => {
    assert.deepStrictEqual([], []);
  });

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
      },
      {
        "targetLanguages": ["php"],
        "regex": "#\\[JsonSchema\\(.*?schema\\s?:\\s?'([^']*)'.*?\\)\\]",
        "searchFileName": "$1",
        "searchDirectories": ["var/json_schema"]
      },
      {
        "targetLanguages": ["php"],
        "regex": "#\\[JsonSchema\\(.*?params\\s?:\\s?'([^']*)'.*?\\)\\]",
        "searchFileName": "$1",
        "searchDirectories": ["var/json_validate"]
      },
    ];
    const provider = new PeekFileDefinitionProvider(configs);
    assert(provider instanceof PeekFileDefinitionProvider, 'provider should be an instance of PeekFileDefinitionProvider');

    // Init
    let testText = "";
    let cursorPosition = 0;
    let expectTargetFile: string[] = [];
    let expectCount = 0;
    let document = {} as vscode.TextDocument;
    let targetFiles = [];

    // Test 'app'
    testText = "$this->resource->get('app://self/Article/Valid?foo=FOO');";
    cursorPosition = 25;
    expectTargetFile = ["src/Resource/App/Article/Valid.php"];
    expectCount = 1;
    document = {
      getText: (range: vscode.Range) => testText,
      getWordRangeAtPosition: (position: vscode.Position, regex: RegExp) => new vscode.Range(position, position.translate(0, cursorPosition))
    } as vscode.TextDocument;

    targetFiles = provider.getTargetFiles(document, new vscode.Position(0, 0));
    assert.strictEqual(targetFiles.length, expectCount);
    assert.deepStrictEqual(targetFiles, expectTargetFile);

    // Test 'page'
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

    // Test JsonSchema
    testText = "#[JsonSchema(schema: 'foo.get.json', key: 'announcement', params: 'bar.get.json')]";
    cursorPosition = 23;
    expectTargetFile = [
      "var/json_schema/foo.get.json",
      "var/json_validate/bar.get.json",
    ];
    expectCount = 2;
    document = {
      getText: (range: vscode.Range) => testText,
      getWordRangeAtPosition: (position: vscode.Position, regex: RegExp) => new vscode.Range(position, position.translate(0, cursorPosition))
    } as vscode.TextDocument;
    targetFiles = provider.getTargetFiles(document, new vscode.Position(0, 0));
    assert.strictEqual(targetFiles.length, expectCount);
    assert.deepStrictEqual(targetFiles, expectTargetFile);
  });

  test('json schema test', () => {
    const configs = [
      {
        "targetLanguages": ["php"],
        "regex": "#\\[JsonSchema\\(.*?schema\\s?:\\s?'([^']*)'.*?\\)\\]",
        "searchFileName": "$1",
        "searchDirectories": ["var/json_schema"]
      },
      {
        "targetLanguages": ["php"],
        "regex": "#\\[JsonSchema\\(.*?params\\s?:\\s?'([^']*)'.*?\\)\\]",
        "searchFileName": "$1",
        "searchDirectories": ["var/json_validate"]
      },
    ];
    const provider = new PeekFileDefinitionProvider(configs);
    assert(provider instanceof PeekFileDefinitionProvider, 'provider should be an instance of PeekFileDefinitionProvider');

    // Init
    let testText = "";
    let cursorPosition = 0;
    let expectTargetFile: string[] = [];
    let expectCount = 0;
    let document = {} as vscode.TextDocument;
    let targetFiles = [];

    // Test JsonSchema
    testText = "#[JsonSchema(schema: 'foo.get.json', key: 'announcement', params: 'bar.get.json')]";
    cursorPosition = 1;
    expectTargetFile = [];
    expectCount = 0;
    document = {
      getText: (range: vscode.Range) => testText,
      getWordRangeAtPosition: (position: vscode.Position, regex: RegExp) => new vscode.Range(position, position.translate(0, cursorPosition))
    } as vscode.TextDocument;
    targetFiles = provider.getTargetFiles(document, new vscode.Position(0, 0));
    assert.strictEqual(targetFiles.length, expectCount);
    assert.deepStrictEqual(targetFiles, expectTargetFile);
  });
});
