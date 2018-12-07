import {BodyDeclaration} from './body-declaration-handler';

function BlockDeclaration(expression, wrapper, lineNumber, type) {
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.wrapper = wrapper;
    this.type = type;
}

BlockDeclaration.prototype.init = function () {
    let body = new BodyDeclaration(this.expression.body, this, this.lineNumber);

    body.init();

    return 'Success';
};

BlockDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

BlockDeclaration.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {BlockDeclaration};
