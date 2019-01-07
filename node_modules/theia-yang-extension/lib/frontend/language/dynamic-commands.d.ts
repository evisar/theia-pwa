import { CommandRegistry, MenuModelRegistry, Disposable } from '@theia/core/lib/common';
import { EditorManager } from '@theia/editor/lib/browser';
export declare class ContextMenuCommands {
    protected menuRegistry: MenuModelRegistry;
    protected registry: CommandRegistry;
    protected editorManager: EditorManager;
    constructor(menuRegistry: MenuModelRegistry, registry: CommandRegistry, editorManager: EditorManager);
    registerCommand(id: string, callback: (...args: any[]) => any, thisArg?: any): Disposable;
    private isYangEditor;
}
//# sourceMappingURL=dynamic-commands.d.ts.map