import { START_ADDRESS, HEADER_LENGTH } from "./constants";
import * as VsCode from 'vscode';

const getNonEmptyLineNumber = (editor: VsCode.TextEditor, lineIndex: number): number => {
    let nonEmtpyLineCount = 0;

    for (let i = 0; i <= lineIndex; i++) {
        const lineText = editor.document.lineAt(i).text.trim();
        if (lineText.length > 0) {
            nonEmtpyLineCount++;
        }
    }

    return nonEmtpyLineCount - 1;
};

const getAddress = (lineNumber: number, languageId: string): number => {
    if (languageId === 'xsm-lib') {
        return lineNumber;
    }
    if (lineNumber <= HEADER_LENGTH) {
        return START_ADDRESS + lineNumber;
    }
    else {
        return START_ADDRESS + HEADER_LENGTH + (lineNumber - HEADER_LENGTH) * 2;
    }
};


export {
    getNonEmptyLineNumber,
    getAddress,
}