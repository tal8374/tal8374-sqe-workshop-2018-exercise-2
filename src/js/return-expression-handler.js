import {insertLineHandler} from './common';
import {Expression} from './expression-handler';

function ReturnExpression(returnExpression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.returnExpression = returnExpression;
    this.lineNumber = lineNumber;
    this.type = type;
}

ReturnExpression.prototype.init = function () {
    this.handleExpression();

    this.increaseLineNumber();

    return 'Success';
};

ReturnExpression.prototype.handleExpression = function () {
    let payload = this.getPayload();

    insertLineHandler(payload);
};

ReturnExpression.prototype.getPayload = function () {
    let expression = new Expression(this.returnExpression.argument);

    return {
        type: this.type ? this.type : this.returnExpression.type,
        value: '' + expression.getExpression(),
        lineNumber: this.lineNumber,
    };
};

ReturnExpression.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

ReturnExpression.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {ReturnExpression};
