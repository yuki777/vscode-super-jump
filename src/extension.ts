import * as vscode from 'vscode';
import PeekFileDefinitionProvider from "./PeekFileDefinitionProvider";

export function activate(context: vscode.ExtensionContext) {
  const configs = vscode.workspace.getConfiguration("vscode-super-jump").get<any[]>("configs", []) || [];

  const triggerLanguages = configs.reduce((acc: string[], config: any) => {
    return acc.concat(config.triggerLanguages);
  }, []);
  const uniqueTargetLanguages = Array.from(new Set(triggerLanguages));

  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider(
      uniqueTargetLanguages as vscode.DocumentSelector,
      new PeekFileDefinitionProvider(configs as any)
    )
  );
}

export function deactivate() { }
