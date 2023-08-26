"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommands = void 0;
const vscode_1 = require("vscode");
const config = require("./config");
const constants = require("./constants");
let _context;
function registerCommands(context) {
    _context = context;
    registerCommand(constants.NotebookExamplesCommand, createNotebookExamplesCommand);
}
exports.registerCommands = registerCommands;
function registerCommand(commandName, callback, thisArg) {
    const command = vscode_1.commands.registerCommand(commandName, callback);
    _context.subscriptions.push(command);
    return command;
}
/**
 * Displays buil-in Data Table Notebook Examples Quick Pick list.
 */
async function createNotebookExamplesCommand() {
    const notebookQuickPickItems = [];
    config.notebookExamples.forEach(notebook => notebookQuickPickItems.push({
        label: `$(notebook) ${notebook.name}`,
        description: notebook.type,
        detail: notebook.file
    }));
    const selectedNotebook = await vscode_1.window.showQuickPick(notebookQuickPickItems, { canPickMany: false });
    if (selectedNotebook) {
        const notebookUrl = selectedNotebook.detail;
        const extensionUri = _context.extensionUri;
        if (notebookUrl) {
            const notebookUri = vscode_1.Uri.joinPath(extensionUri, notebookUrl);
            // open data table example notebook
            console.log(`${constants.ExtensionId}: loading notebook example: ${notebookUri.toString(true)}`);
            vscode_1.commands.executeCommand(constants.VSCodeOpenCommand, notebookUri);
        }
    }
}
//# sourceMappingURL=commands.js.map