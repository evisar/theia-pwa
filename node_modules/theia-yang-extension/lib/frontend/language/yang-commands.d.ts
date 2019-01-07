import { CommandContribution, CommandRegistry, Command } from '@theia/core/lib/common';
import { Workspace } from "@theia/languages/lib/browser";
/**
 * Show YANG references
 */
export declare const SHOW_YANG_REFERENCES: Command;
/**
 * Apply Workspace Edit
 */
export declare const APPLY_WORKSPACE_EDIT: Command;
export declare class YangCommandContribution implements CommandContribution {
    protected readonly workspace: Workspace;
    constructor(workspace: Workspace);
    registerCommands(commands: CommandRegistry): void;
}
//# sourceMappingURL=yang-commands.d.ts.map