import { MonacoEditor } from "@theia/monaco/lib/browser/monaco-editor";
import { MonacoEditorModel } from '@theia/monaco/lib/browser/monaco-editor-model';
import { MonacoEditorProvider } from "@theia/monaco/lib/browser/monaco-editor-provider";
import { MonacoEditorService } from "@theia/monaco/lib/browser/monaco-editor-service";
import { MonacoToProtocolConverter, ProtocolToMonacoConverter } from 'monaco-languageclient';
import { EditorPreferences } from "@theia/editor/lib/browser";
import { MonacoTextModelService } from "@theia/monaco/lib/browser/monaco-text-model-service";
import { MonacoContextMenuService } from "@theia/monaco/lib/browser/monaco-context-menu";
import { MonacoWorkspace } from "@theia/monaco/lib/browser/monaco-workspace";
import { MonacoCommandServiceFactory } from "@theia/monaco/lib/browser/monaco-command-service";
import { MonacoQuickOpenService } from '@theia/monaco/lib/browser/monaco-quick-open-service';
import { MonacoDiffNavigatorFactory } from '@theia/monaco/lib/browser/monaco-diff-navigator-factory';
export declare class YangMonacoEditorProvider extends MonacoEditorProvider {
    protected readonly editorService: MonacoEditorService;
    protected readonly monacoModelResolver: MonacoTextModelService;
    protected readonly contextMenuService: MonacoContextMenuService;
    protected readonly m2p: MonacoToProtocolConverter;
    protected readonly p2m: ProtocolToMonacoConverter;
    protected readonly workspace: MonacoWorkspace;
    protected readonly commandServiceFactory: MonacoCommandServiceFactory;
    protected readonly editorPreferences: EditorPreferences;
    protected readonly quickOpenService: MonacoQuickOpenService;
    protected readonly diffNavigatorFactory: MonacoDiffNavigatorFactory;
    constructor(editorService: MonacoEditorService, monacoModelResolver: MonacoTextModelService, contextMenuService: MonacoContextMenuService, m2p: MonacoToProtocolConverter, p2m: ProtocolToMonacoConverter, workspace: MonacoWorkspace, commandServiceFactory: MonacoCommandServiceFactory, editorPreferences: EditorPreferences, quickOpenService: MonacoQuickOpenService, diffNavigatorFactory: MonacoDiffNavigatorFactory);
    protected createMonacoEditorOptions(model: MonacoEditorModel): MonacoEditor.IOptions;
}
//# sourceMappingURL=yang-monaco-editor-provider.d.ts.map