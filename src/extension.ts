// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import PeekFileDefinitionProvider from "./PeekFileDefinitionProvider";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const configs = vscode.workspace.getConfiguration("vscode-super-jump").get<any[]>("configs", []);

  // 正規表現を復元する関数
  const restoreRegex = (pattern: string): RegExp => {
    return new RegExp(pattern);
  };

  // 各configの正規表現を復元
  configs.forEach(config => {
    if (config.regex) {
      config.regex = restoreRegex(config.regex);
    }
  });

  const targetLanguages = configs.reduce((acc: string[], config: any) => {
    return acc.concat(config.targetLanguages);
  }, []);
  const uniqueTargetLanguages = Array.from(new Set(targetLanguages));

  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider(
      uniqueTargetLanguages as vscode.DocumentSelector,
      new PeekFileDefinitionProvider(configs as any)
    )
  );
}

// this method is called when your extension is deactivated
export function deactivate() { }
