import * as assert from 'assert';
import * as vscode from 'vscode';
import PeekFileDefinitionProvider from '../../PeekFileDefinitionProvider';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('activate function', async () => {
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
					"src/test/dummy/App"
				],
				"searchFileExtension": ".php"
			}
		];

		const peekProvider = new PeekFileDefinitionProvider(configs);

		const document = await vscode.workspace.openTextDocument({
			content: "#[Embed(rel: 'article', src: 'app://self/article/valid{?slug}')]",
			language: 'php',
		});
		const position = new vscode.Position(0, 30);

		const targetFiles = peekProvider.getTargetFiles(document, position);
		assert.strictEqual(targetFiles.length, 1);

		// TODO: Fix test for search()
    const filePaths = await peekProvider.search(targetFiles);
		// assert.strictEqual(filePaths.length, 1);
		// assert.strictEqual(filePaths[0].uri.fsPath, vscode.Uri.file('src/test/dummy/App/Article/Valid.php').fsPath);
  });
});
