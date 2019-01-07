import { FrontendApplication, KeybindingRegistry } from '@theia/core/lib/browser';
import { BaseLanguageClientContribution, LanguageClientFactory, Languages, Workspace, ILanguageClient } from '@theia/languages/lib/browser';
import { MessageConnection } from 'vscode-jsonrpc';
import { DiagramManagerProvider, DiagramManager } from 'theia-sprotty/lib';
import { CommandRegistry, Disposable } from '@theia/core/lib/common';
import { SemanticHighlightingService } from '@theia/editor/lib/browser/semantic-highlight/semantic-highlighting-service';
import { ContextMenuCommands } from './dynamic-commands';
export declare class YangLanguageClientContribution extends BaseLanguageClientContribution {
    protected yangDiagramManagerProvider: DiagramManagerProvider;
    protected keybindingRegistry: KeybindingRegistry;
    protected commandRegistry: CommandRegistry;
    protected commands: ContextMenuCommands;
    protected readonly semanticHighlightingService: SemanticHighlightingService;
    readonly id: string;
    readonly name: string;
    constructor(workspace: Workspace, languages: Languages, languageClientFactory: LanguageClientFactory, yangDiagramManagerProvider: DiagramManagerProvider, keybindingRegistry: KeybindingRegistry, commandRegistry: CommandRegistry, commands: ContextMenuCommands, semanticHighlightingService: SemanticHighlightingService);
    protected readonly globPatterns: string[];
    waitForActivation(app: FrontendApplication): Promise<any>;
    createLanguageClient(connection: MessageConnection): ILanguageClient;
    protected waitForOpenDiagrams(diagramManagerProvider: Promise<DiagramManager>): Promise<any>;
    registerCommand(id: string, callback: (...args: any[]) => any, thisArg?: any): Disposable;
}
//# sourceMappingURL=yang-language-client-contribution.d.ts.map