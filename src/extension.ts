import * as VsCode from 'vscode';
import { getAddress, getNonEmptyLineNumber } from './utils';

export function activate(context: VsCode.ExtensionContext) {
	const decorationType = VsCode.window.createTextEditorDecorationType({
		after: {
			contentText: '',
			color: 'gray',
			fontStyle: 'italic',
			margin: '0 0 0 1em',
		},
	});

	let previousLine = -1;

	const updateDecorations = () => {
		const editor = VsCode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const cursorLine = editor.selection.active.line;

		if (cursorLine !== previousLine) {
			editor.setDecorations(decorationType, []);

			const nonEmptyLineNumber = getNonEmptyLineNumber(editor, cursorLine);

			if (nonEmptyLineNumber !== null) {
				const addressText = `Address: ${getAddress(nonEmptyLineNumber)}`;

				const lineText = editor.document.lineAt(cursorLine).text;
				if (lineText.trim() !== '') {
					const range = new VsCode.Range(
						cursorLine,
						lineText.length,
						cursorLine,
						lineText.length,
					);

					const decorations: VsCode.DecorationOptions[] = [{
						range,
						renderOptions: {
							after: {
								contentText: `"${addressText}"`,
								color: 'gray',
								fontStyle: 'italic',
								margin: '0 0 0 1em',
							}
						}
					}];

					editor.setDecorations(decorationType, decorations);
				}
			}

			previousLine = cursorLine;
		}
	};


	const cursorListener = VsCode.window.onDidChangeTextEditorSelection(updateDecorations);
	const editorListener = VsCode.window.onDidChangeActiveTextEditor(updateDecorations);

	context.subscriptions.push(cursorListener, editorListener);

	updateDecorations();

}


export function deactivate() { }



