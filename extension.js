// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

vscode.window.showInformationMessage('Hello World!');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  vscode.languages.registerHoverProvider('dat', {
    provideHover(document, position, token) {
      console.log(context, document, position, token);
      return {
        contents: ['Hover Content']
      };
    }
  });
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  deactivate
}
