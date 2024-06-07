import * as vscode from 'vscode';
const caseAnything = require("case-anything");
export default class PeekFileDefinitionProvider implements vscode.DefinitionProvider {

  private configs: any[];

  constructor(configs: any[] = []) {
    this.configs = configs.map(config => {
      if (config.regex) {
        config.regex = new RegExp(config.regex);
      }
      return config;
    });
  }

  async provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): Promise<any[] | vscode.Location | vscode.Location[] | undefined> {
    if (!this.configs) {
      return [];
    }

    const targetFiles = this.getTargetFiles(document, position);
    if (targetFiles.length === 0) {
      return [];
    }

    const filePaths = await this.search(targetFiles);
    if (!filePaths.length) {
      return [];
    }

    return this.createLocations(filePaths);
  }

  getTargetFiles(document: vscode.TextDocument, position: vscode.Position): string[] {
    const targetFiles: string[] = [];
    this.configs.forEach((config: any) => {
      const range = document.getWordRangeAtPosition(position, config.regex);
      if (range === undefined) {
        return;
      }

      const selectedText = document.getText(range);
      const matchedParts = selectedText.match(config.regex);
      if (matchedParts === null) {
        return;
      }

      let searchFileName = config.searchFileName;
      searchFileName = searchFileName.replace(/(\$\d)/g, (match: string, p1: string) => {
        return matchedParts[parseInt(p1[1])];
      });

      let processedFileName = this.applyConvertRules(searchFileName, config.searchFileNameConvertRules || []);

      config.searchDirectories.forEach((searchDirectory: string) => {
        targetFiles.push(`${searchDirectory}/${processedFileName}${config.searchFileExtension || ''}`);
      });
    });

    return targetFiles;
  }

  applyConvertRules(fileName: string, rules: string[]): string {
    let processedFileName = fileName;
    rules.forEach((rule: string) => {
      if (rule === 'adaCase') { processedFileName = caseAnything.adaCase(processedFileName, { keep: ['/'] }); }
      if (rule === 'camelCase') { processedFileName = caseAnything.camelCase(processedFileName, { keep: ['/'] }); }
      if (rule === 'capitalCase') { processedFileName = caseAnything.capitalCase(processedFileName, { keep: ['/'] }); }
      if (rule === 'cobolCase') { processedFileName = caseAnything.cobolCase(processedFileName, { keep: ['/'] }); }
      if (rule === 'constantCase') { processedFileName = caseAnything.constantCase(processedFileName, { keep: ['/'] }); }
      if (rule === 'dotNotation') { processedFileName = caseAnything.dotNotation(processedFileName, { keep: ['/'] }); }
      if (rule === 'kebabCase') { processedFileName = caseAnything.kebabCase(processedFileName, { keep: ['/'] }); }
      if (rule === 'lowerCase') { processedFileName = caseAnything.lowerCase(processedFileName, { keep: ['/'] }); }
      if (rule === 'pascalCase') { processedFileName = caseAnything.pascalCase(processedFileName, { keep: ['/'] }); }
      if (rule === 'pathCase') { processedFileName = caseAnything.pathCase(processedFileName, { keep: ['/'] }); }
      if (rule === 'snakeCase') { processedFileName = caseAnything.snakeCase(processedFileName, { keep: ['/'] }); }
      if (rule === 'spaceCase') { processedFileName = caseAnything.spaceCase(processedFileName, { keep: ['/'] }); }
      if (rule === 'trainCase') { processedFileName = caseAnything.trainCase(processedFileName, { keep: ['/'] }); }
      if (rule === 'upperCamelCase') { processedFileName = caseAnything.upperCamelCase(processedFileName, { keep: ['/'] }); }
      if (rule === 'upperCase') { processedFileName = caseAnything.upperCase(processedFileName, { keep: ['/'] }); }
    });

    return processedFileName;
  }

  async search(targetFiles: string[]): Promise<any[]> {
    const searchPathActions = targetFiles.map(async targetFile => {
      const files = await vscode.workspace.findFiles(`**/${targetFile}`, "**/{vendor,node_modules}"); // Returns promise
      return files.map(file => {
        return { file: file };
      });
    });
    const searchPromises = await Promise.all(searchPathActions);

    return ([] as any[]).concat.apply([], searchPromises);
  }

  createLocations(filePaths: any[]): vscode.Location[] {
    const allPaths: vscode.Location[] = [];
    for (const filePath of filePaths) {
      allPaths.push(new vscode.Location(vscode.Uri.file(filePath.file.path), new vscode.Position(0, 0)));
    }

    return allPaths;
  }
}
