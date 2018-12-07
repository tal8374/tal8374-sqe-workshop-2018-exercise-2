import {BodyDeclaration} from './body-declaration-handler';
import {Expression} from './expression-handler';

function WhileDeclaration(expression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.type = type;
    this.payloads = [];
}

WhileDeclaration.prototype.init = function () {
    this.handleWhileDeclaration();

    this.handleWhileBody();

    this.increaseLineNumber();

    return 'Success';
};

WhileDeclaration.prototype.handleWhileBody = function () {
    let bodyContent = this.expression.body.type === 'BlockStatement' ? this.expression.body.body : this.expression.body;

    let body = new BodyDeclaration(bodyContent, this, this.lineNumber + 1);

    body.init();

    let payloads = body.getPayloads();

    for(let i = 0; i < payloads.length; i++) {
        this.payloads.push(payloads[i]);
    }
};

WhileDeclaration.prototype.handleWhileDeclaration = function () {
    var payload = this.getWhileData();

    this.payloads.push(payload);
};

WhileDeclaration.prototype.getWhileData = function () {
    let expression = new Expression(this.expression.test);

    return {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : this.expression.type,
        name: null,
        value: null,
        condition: expression.getExpression(),
    };
};

WhileDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

WhileDeclaration.prototype.getLineNumber = function () {
    return this.lineNumber;
};

WhileDeclaration.prototype.getPayloads = function () {
    return this.payloads;
};

export {WhileDeclaration};
