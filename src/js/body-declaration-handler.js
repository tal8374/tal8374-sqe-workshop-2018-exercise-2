import {VariableDeclaration} from './variable-declaration-handler';
import {FunctionDeclaration} from './function-declaration-handler';
import {WhileDeclaration} from './while-declaration-handler';
import {AssignmentExpression} from './assignment-expression-handler';
import {IfExpression} from './if-expression-handler';
import {ReturnExpression} from './return-expression-handler';
import {BreakStatementExpression} from './break-expression-handler';
import {ContinueStatementExpression} from './continue-expression-handler';
import {BlockDeclaration} from './block-declaration-handler';

function BodyDeclaration(body, wrapper, lineNumber = 1, type) {
    this.body = body;
    this.lineNumber = lineNumber;
    this.wrapper = wrapper;
    this.type = type;
}

BodyDeclaration.prototype.handlers = {
    'VariableDeclaration': VariableDeclaration,
    'FunctionDeclaration': FunctionDeclaration,
    'WhileStatement': WhileDeclaration,
    'ExpressionStatement': AssignmentExpression,
    'AssignmentExpression': AssignmentExpression,
    'IfStatement': IfExpression,
    'ReturnStatement': ReturnExpression,
    'BreakStatement': BreakStatementExpression,
    'ContinueStatement': ContinueStatementExpression,
    'BlockStatement': BlockDeclaration,
};

BodyDeclaration.prototype.init = function () {
    if (!this.body.length) {
        this.body = [this.body];
    }

    for (let i = 0; i < this.body.length; i++) {
        this.handleDeclaration(this.body[i]);
    }

    return 'Success';
};

BodyDeclaration.prototype.handleDeclaration = function (declaration) {
    let declarationType = declaration.type;

    if (this.handlers[declarationType]) {
        let declarationHandler = new this.handlers[declarationType](declaration, this, this.lineNumber, this.type);

        declarationHandler.init();
    }
};

BodyDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

BodyDeclaration.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {BodyDeclaration};
