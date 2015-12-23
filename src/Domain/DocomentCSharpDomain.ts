import {TextEditor, Position} from 'vscode';
import {VSCodeApi} from '../Api/VSCodeApi';
import {StringUtil} from '../Utility/StringUtil';

/*-------------------------------------------------------------------------
 * Enum
 *-----------------------------------------------------------------------*/
enum CodeType {
    Namespace,
    Class,
    Interface,
    Struct,
    Enum,
    Delegate,
    Field,
    Property,
    Method,
    Event
}

export class DocomentCSharpDomain {

    /*-------------------------------------------------------------------------
     * Field
     *-----------------------------------------------------------------------*/
    private _activeEditor: TextEditor;
    private _vsCodeApi: VSCodeApi;

    /*-------------------------------------------------------------------------
     * Public Method
     *-----------------------------------------------------------------------*/
    public Insert(activeEditor: TextEditor) {

        this._activeEditor = activeEditor;
        this._vsCodeApi = new VSCodeApi(activeEditor);

        // Detect CSharp
        if (!this._vsCodeApi.IsCSharp()) return;
        
        // Fire Document Comment
        if (!this.IsTriggerDocComment()) return;

        // Get Code
        const code: string = this._vsCodeApi.ReadNextCodeFromCurrent();

        // Detect Code Type
        const codeType: CodeType = this.GetCodeType(code);
        console.log(codeType);
        if (codeType === null) return;
        
        // Gene Comment
        const docComment = this.GeneDocComment(codeType, code);
        console.log(docComment);
        if (docComment === null) return;
        
        // Write Comment
        this.WriteComment(docComment);
    }


    /*-------------------------------------------------------------------------
     * Domain Method
     *-----------------------------------------------------------------------*/
    private IsTriggerDocComment(): Boolean {
        const activeChar: string = this._vsCodeApi.ReadCharAtCurrent();
        if (activeChar == null) return false;
        const isSlashKey: Boolean = (activeChar === '/');
        const isEnterKey: Boolean = (activeChar === ''); // '' = Enter Key
        if (!isSlashKey && !isEnterKey) return false;

        const activeLine: string = this._vsCodeApi.ReadLineAtCurrent();
        if (activeLine == null) return false;
        const isDocComment: Boolean = (activeLine.endsWith('///'));
        if (!isDocComment) return false;

        const position: number = this._vsCodeApi.GetActiveCharPosition();
        const positionDocComment: number = activeLine.lastIndexOf('///') + ((isEnterKey) ? 3 : 2);
        const isLastPosition: Boolean = (position === positionDocComment);
        if (!isLastPosition) return false;

        return true;
    }

    private GetCodeType(code: string): CodeType {

        /* Namespace */
        const isNamespace: boolean = code.match(/.*namespace /) !== null;
        if (isNamespace) return CodeType.Namespace;

        /* Type */
        const isClass: boolean = code.match(/.*class /) !== null;
        if (isClass) return CodeType.Class;

        const isInterface: boolean = code.match(/.*interface /) !== null;
        if (isInterface) return CodeType.Interface;

        const isStruct: boolean = code.match(/.*struct /) !== null;
        if (isStruct) return CodeType.Struct;

        const isEnum: boolean = code.match(/.*enum /) !== null;
        if (isEnum) return CodeType.Enum;

        const isDelegate: boolean = code.match(/.*delegate /) !== null;
        if (isDelegate) return CodeType.Delegate;

        /* Event */
        const isEvent: boolean = code.match(/.*event /) !== null;
        if (isEvent) return CodeType.Event;

        /* Method */
        const isMethod: boolean = false; // TODO:
        if (isMethod) return CodeType.Method;

        /* Field */
        const isField: boolean = false; // TODO:
        if (isField) return CodeType.Field;

        /* Property */
        const isProperty: boolean = false; // TODO:
        if (isProperty) return CodeType.Property;

        return null;
    }

    private GeneDocComment(codeType: CodeType, code: string): string {
        const indent: string = StringUtil.GetIndent(code);

        // TODO:
        let comment:string = "";
        switch (codeType) {
            case CodeType.Namespace:
                break;
            case CodeType.Class:
                comment =         ` <summary>\n`
                    + indent + `/// \n`
                    + indent + `/// </summary>`;
                break;
            case CodeType.Interface:
                break;
            case CodeType.Struct:
                break;
            case CodeType.Enum:
                break;
            case CodeType.Delegate:
                break;
            case CodeType.Event:
                break;
            case CodeType.Method:
                break;
            case CodeType.Field:
                break;
            case CodeType.Property:
                break;
            default:
                break;
        }

        return comment;
    }

    private WriteComment(text: string): void {
        const position = this._vsCodeApi.GetActivePosition();
        const positionShift = this._vsCodeApi.ChangeVSCodePosition(position, 1);
        this._vsCodeApi.InsertText(positionShift, text);
    }

    dispose() {
    }

}
