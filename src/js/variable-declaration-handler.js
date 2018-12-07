import {insertLineHandler} from './common';

import {ValueExpression} from './value-expression-handler';

function VariableDeclaration(body, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.body = body;
    this.lineNumber = lineNumber;
    this.type = type;
}

VariableDeclaration.prototype.init = function () {
    let declarations = this.body.declarations;

    for (let i = 0; i < declarations.length; i++) {
        this.variableDeclarationHandler(declarations[i]);
    }

    if(this.wrapper) {
        this.wrapper.increaseLineNumber(this.lineNumber + 1);
    }

    return 'Success';
};

VariableDeclaration.prototype.variableDeclarationHandler = function (declaration) {
    let payload = this.parseVariable(declaration);

    insertLineHandler(payload);
};

VariableDeclaration.prototype.parseVariable = function parseVariable(declaration) {
    let valueExpression = new ValueExpression(declaration.init);
    let value = valueExpression.getValue();

    return {
        type: this.type ? this.type : declaration.type,
        name: declaration.id.name,
        value: '' + value,
        lineNumber: this.lineNumber,
    };
};

export {VariableDeclaration};
