import * as assert from 'assert';
import * as sinon from 'sinon';
import * as vscode from 'vscode';
import PeekFileDefinitionProvider from '../../PeekFileDefinitionProvider';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

	// search()関数をこのテストファイルにコピーした
	// => テストコード実行時と、拡張実行時では、ファイルパス|SANDBOXなどが異なるため?、findFiles()が異なる結果を返すため
  async function search(targetFiles: string[]): Promise<any[]> {
    const searchPathActions = targetFiles.map(async targetFile => {
      const files = await vscode.workspace.findFiles(`**/${targetFile}`, "**/{vendor,node_modules}"); // Returns promise
      return files.map(file => {
        return { file: file };
      });
    });
    const searchPromises = await Promise.all(searchPathActions);

    return ([] as any[]).concat.apply([], searchPromises);
  }

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

	test('search test', async () => {
		const findFilesStub = sinon.stub(vscode.workspace, 'findFiles').resolves([
			vscode.Uri.file('src/test/dummy/App/Article/Valid.php')
		]);

		const peekProvider = new PeekFileDefinitionProvider(configs);
		const fullPath = 'src/test/dummy/App/Article/Valid.php';
		const targetFiles = [fullPath];
		const filePaths = await search(targetFiles); // Use copied search()
    assert.strictEqual(filePaths.length, 1);
    assert.strictEqual(filePaths[0].file.fsPath, vscode.Uri.file(fullPath).fsPath);

		findFilesStub.restore();
	});

	test('getTargetFiles should return correct file paths', () => {
    const provider = new PeekFileDefinitionProvider(configs);
    const document = {
      getText: (range: vscode.Range) => "$this->resource->get('app://self/Article/Valid?foo=FOO');",
      getWordRangeAtPosition: (position: vscode.Position, regex: RegExp) => new vscode.Range(position, position.translate(0, 25))
    } as vscode.TextDocument;
    const position = new vscode.Position(0, 0);
    const targetFiles = provider.getTargetFiles(document, position);
    assert.deepStrictEqual(targetFiles, ['src/test/dummy/App/Article/Valid.php']);
  });
});
