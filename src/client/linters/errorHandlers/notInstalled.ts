'use strict';
import { isNotInstalledError } from '../../common/helpers';
import { StandardErrorHandler } from './standard';

export class NotInstalledErrorHandler extends StandardErrorHandler {
    public handleError(expectedFileName: string, fileName: string, error: Error): boolean {
        if (!isNotInstalledError(error)) {
            return false;
        }

        this.installer.promptToInstall(this.product);
        const customError = `Linting with ${this.id} failed.\nYou could either install the '${this.id}' linter or turn it off in setings.json via "python.linting.${this.id}Enabled = false".`;
        this.outputChannel.appendLine(`\n${customError}\n${error + ''}`);
        return true;
    }
}
