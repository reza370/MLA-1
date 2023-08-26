"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const csv_editor_1 = require("./csv_editor");
const csv_parse = require("csv-parse");
const csv_stringify = require("csv-stringify");
const fs = require("fs");
var lastEditor;
var delimitersForFiles = new Map();
function activate(context) {
    let disposable;
    vscode.window.registerWebviewPanelSerializer("webview", {
        deserializeWebviewPanel(webviewPanel, state) {
            return __awaiter(this, void 0, void 0, function* () {
                csv_editor_1.CsvHtmlEditor.revive(webviewPanel, context.extensionPath);
            });
        }
    });
    context.subscriptions.push(vscode.commands.registerCommand('csvEditor.show', () => {
        let activeTextEditor = vscode.window.activeTextEditor;
        if (activeTextEditor !== null && activeTextEditor !== undefined) {
            lastEditor = null;
            UpdateEditor(activeTextEditor, context);
        }
    }));
    vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor !== undefined && csv_editor_1.CsvHtmlEditor.currentPanel !== undefined) {
            UpdateEditor(editor, context);
        }
        return;
    }, null, disposable);
}
exports.activate = activate;
function CheckDelimiter(testText, delimiter, clbk) {
    csv_parse(testText, {
        delimiter: delimiter
    }, function (err, out) {
        clbk(err === undefined && out[0].length > 1);
    });
}
function PredictDelimiter(textEditor, clbk) {
    var known_delimiters = [',', ';', '|', '\t'];
    var testText = textEditor.document.lineAt(0).text;
    var assumedDelimiter = '';
    var delimitersChecked = known_delimiters.length;
    known_delimiters.forEach((delimiter) => {
        CheckDelimiter(testText, delimiter, (isValid) => {
            if (isValid) {
                if (assumedDelimiter !== '') {
                    assumedDelimiter = '';
                }
                else {
                    assumedDelimiter = delimiter;
                }
            }
            delimitersChecked--;
            if (delimitersChecked === 0) {
                if (assumedDelimiter === '') {
                    var askUser;
                    askUser = (promptMsg) => {
                        vscode.window.showInputBox({
                            ignoreFocusOut: true,
                            placeHolder: ',',
                            prompt: promptMsg
                        }).then((userDelimiter) => {
                            if (userDelimiter === "") {
                                askUser("Please enter delimiter ;)");
                            }
                            else if (userDelimiter !== undefined) {
                                if (userDelimiter === 'tab') {
                                    userDelimiter = '\t';
                                }
                                userDelimiter = userDelimiter.charAt(0);
                                CheckDelimiter(testText, userDelimiter, (validUserDelimiter) => {
                                    if (validUserDelimiter && userDelimiter !== undefined) {
                                        clbk(userDelimiter);
                                    }
                                    else {
                                        askUser(promptMsg = "Given delimiter " + userDelimiter + " is incorrect! Try again.");
                                    }
                                });
                            }
                        });
                    };
                    askUser("Couldn't predict delimiter. What's your delimiter? ( type 'tab' if you use tab as delimiter )");
                }
                else {
                    clbk(assumedDelimiter);
                }
            }
        });
    });
}
function UpdateEditor(textEditor, context) {
    if (textEditor === lastEditor || !textEditor.document.fileName.endsWith(".csv")) {
        return;
    }
    lastEditor = textEditor;
    var fileName = textEditor.document.fileName;
    fs.watchFile(fileName, () => {
        PredictDelimiter(textEditor, (delimiter) => {
            if (textEditor !== null) {
                delimitersForFiles.set(fileName, delimiter);
                Parse(textEditor, false);
            }
        });
    });
    PredictDelimiter(lastEditor, (delimiter) => {
        if (lastEditor !== null) {
            delimitersForFiles.set(fileName, delimiter);
            ParseAndShow(lastEditor, context);
        }
    });
}
function Parse(textEditor, clear) {
    var fileName = textEditor.document.fileName;
    var definedDelimiter = delimitersForFiles.get(fileName);
    if (definedDelimiter === undefined) {
        definedDelimiter = ',';
    }
    csv_parse(textEditor.document.getText(), {
        delimiter: definedDelimiter
    }, function (err, out) {
        if (err) {
            if (definedDelimiter === "\t") {
                vscode.window.showErrorMessage("Tab as delimiter is working only with quotation marks.");
            }
            else {
                vscode.window.showErrorMessage(err.message);
            }
            return;
        }
        if (csv_editor_1.CsvHtmlEditor.currentPanel !== undefined) {
            csv_editor_1.CsvHtmlEditor.onSave((table) => {
                csv_stringify(table, {
                    quoted: true,
                    delimiter: definedDelimiter
                }, (err, out) => {
                    if (err) {
                        vscode.window.showErrorMessage(err.message);
                        return;
                    }
                    var fileName = textEditor.document.fileName;
                    fs.writeFile(fileName, out, (err) => {
                        if (err) {
                            vscode.window.showErrorMessage(err.message);
                            return;
                        }
                    });
                });
            });
            csv_editor_1.CsvHtmlEditor.currentPanel.setForm(out, clear);
        }
    });
}
function ParseAndShow(textEditor, context) {
    Parse(textEditor, true);
    csv_editor_1.CsvHtmlEditor.createOrShow(context.extensionPath);
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map