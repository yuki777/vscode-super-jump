// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import PeekFileDefinitionProvider from "./PeekFileDefinitionProvider";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const configParams = vscode.workspace.getConfiguration("vscode-super-jump");
  const supportedLanguages = configParams.get("supportedLanguages") as Array<string>;
  const targetFileExtensions = configParams.get("targetFileExtensions") as Array<string>;
  const resourceAppPaths = configParams.get("resourceAppPaths") as Array<string>;
  const resourcePagePaths = configParams.get("resourcePagePaths") as Array<string>;

  context.subscriptions.push(
    vscode.languages.registerDefinitionProvider(
      supportedLanguages,
      new PeekFileDefinitionProvider(targetFileExtensions, resourceAppPaths, resourcePagePaths)
    )
  );

}

// this method is called when your extension is deactivated
export function deactivate() { }
