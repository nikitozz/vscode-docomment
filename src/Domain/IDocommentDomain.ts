import {TextEditor, TextDocumentContentChangeEvent} from 'vscode';
import {VSCodeApi} from '../Api/VSCodeApi';

/*-------------------------------------------------------------------------
 * Enum
 *-----------------------------------------------------------------------*/
export enum CodeType {
    None,
    Comment,
    Namespace,
    Class,
    Interface,
    Struct,
    Enum,
    Delegate,
    Field,
    Property,
    Method,
    Event,
}

export interface IDocommentDomain {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/
    _event: TextDocumentContentChangeEvent;
    _vsCodeApi: VSCodeApi;
    _activeEditor: TextEditor;


    /*-------------------------------------------------------------------------
     * Entry Method
     *-----------------------------------------------------------------------*/
    Execute(activeEditor: TextEditor, event: TextDocumentContentChangeEvent, languageId: string);


    /*-------------------------------------------------------------------------
     * Domain Method
     *-----------------------------------------------------------------------*/
    IsTriggerDocomment(): boolean;
    GetCodeType(code: string): CodeType;
    GeneDocomment(code: string, codeType: CodeType): string;
    WriteDocomment(code: string, codeType: CodeType, docommnet: string): void;
    MoveCursorTo(code: string, codeType: CodeType, docommnet: string): void;
    dispose(): void;

}
