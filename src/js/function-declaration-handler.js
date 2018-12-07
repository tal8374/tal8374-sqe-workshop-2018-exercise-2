import {insertLineHandler} from './common';
import {BodyDeclaration} from './body-declaration-handler';
import {Expression} from './expression-handler';

function FunctionDeclaration(body, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.body = body;
    this.lineNumber = lineNumber;
    this.type = type;
}

FunctionDeclaration.prototype.init = function () {
    this.handleFunctionDeclaration();

    this.handleParamsDeclaration();

    this.handleFunctionBody();

    this.increaseLineNumber();

    return 'Success';
};

FunctionDeclaration.prototype.handleFunctionBody = function () {
    var bodyDeclarationInstance = new BodyDeclaration(this.body.body.body, this, this.lineNumber + 1);

    bodyDeclarationInstance.init();
};

FunctionDeclaration.prototype.handleParamsDeclaration = function () {
    var params = this.body.params;

    for (let i = 0; i < params.length; i++) {
        var payload = this.getParamData(params[i]);

        insertLineHandler(payload);
    }
};

FunctionDeclaration.prototype.getParamData = function (param) {
    let name = new Expression(param);

    return {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : 'Param',
        name: name.getExpression(),
        value: null,
    };
};

FunctionDeclaration.prototype.handleFunctionDeclaration = function () {
    var payLoad = this.getFunctionData();

    insertLineHandler(payLoad);
};

FunctionDeclaration.prototype.getFunctionData = function () {
    return {
        lineNumber: this.lineNumber,
        type: this.body.type,
        name: this.body.id.name,
        value: null,
    };
};

FunctionDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

FunctionDeclaration.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {FunctionDeclaration};
