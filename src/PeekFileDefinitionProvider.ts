import * as vscode from 'vscode';
import * as caseAnything from 'case-anything';

export default class PeekFileDefinitionProvider implements vscode.DefinitionProvider {
  public static userConfigs: vscode.WorkspaceConfiguration;
  constructor(userConfigs: vscode.WorkspaceConfiguration) {
    PeekFileDefinitionProvider.userConfigs = userConfigs;
  }

  async provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Promise<any[] | vscode.Location | vscode.Location[] | undefined> {
    const targetFiles: string[] = [];
    PeekFileDefinitionProvider.userConfigs.forEach((config: any) => {
      // range取得
      const range = document.getWordRangeAtPosition(position, config.regex);
      if (range === undefined){
        return;
      }

      // テキスト取得
      const selectedText = document.getText(range);
      const matchedParts = selectedText.match(config.regex);
      if (matchedParts === null) {
        return;
      }

      // キャプチャ変数の処理
      let searchFileName = config.searchFileName;
      searchFileName = searchFileName.replace(/(\$\d)/g, (match: string, p1: string) => {
        return matchedParts[parseInt(p1[1])];
      });

      // ファイル名の変換
      let processedFileName = searchFileName;
      config.searchFileNameConvertRules.forEach((rule: string) => {
        // TODO: if文を削除して、rule から動的に関数を呼び出したい caseAnything.$rule()
        if(rule === 'pascalCase'){
          processedFileName = caseAnything.pascalCase(processedFileName, {keep: ['/']});
       }
      });

      // 検索対象ファイルリストに追加
      config.searchDirectories.forEach((searchDirectory: string) => {
        targetFiles.push(searchDirectory + "/" + processedFileName + config.searchFileExtension);
      });
    });

    if (targetFiles.length === 0) {
      return [];
    }

    const searchPathActions = targetFiles.map(async targetFile => {
      const files = await this.searchFilePath(targetFile);
      return files.map(file => {
        return {
          file: file,
        };
      });
    });
    const searchPromises = Promise.all(searchPathActions);
    const paths = await searchPromises;

    // @ts-ignore
    const filePaths: any[] = [].concat.apply([], paths);
    if (!filePaths.length) {
      return undefined;
    }

    const allPaths: any[] = [];
    for (const filePath of filePaths) {
      allPaths.push(new vscode.Location(vscode.Uri.file(filePath.file.path), new vscode.Position(0, 0)));
    }

    return allPaths;
  }

  searchFilePath(fileName: String): Thenable<vscode.Uri[]> {
    return vscode.workspace.findFiles(`**/${fileName}`, "**/{vendor,node_modules}"); // Returns promise
  }

}
