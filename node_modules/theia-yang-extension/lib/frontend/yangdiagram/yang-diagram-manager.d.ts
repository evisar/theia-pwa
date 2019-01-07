import { LanguageClientContribution } from '@theia/languages/lib/browser';
import { EditorManager } from '@theia/editor/lib/browser';
import { TheiaSprottyConnector, TheiaFileSaver, DiagramManagerImpl, DiagramWidgetRegistry } from 'theia-sprotty/lib';
import { ThemeManager } from './theme-manager';
export declare class YangDiagramManager extends DiagramManagerImpl {
    readonly diagramType: string;
    readonly iconClass: string;
    _diagramConnector: TheiaSprottyConnector;
    constructor(languageClientContribution: LanguageClientContribution, theiaFileSaver: TheiaFileSaver, editorManager: EditorManager, diagramWidgetRegistry: DiagramWidgetRegistry, themeManager: ThemeManager);
    readonly diagramConnector: TheiaSprottyConnector;
    readonly label: string;
}
//# sourceMappingURL=yang-diagram-manager.d.ts.map