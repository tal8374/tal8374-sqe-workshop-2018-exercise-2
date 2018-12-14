import {FunctionStatement} from './functionStatement';
import {WhileStatement} from './whileStatement';
import {IfStatement} from './ifStatement';
import {ElseIfStatement} from './elseIfStatement';

function ColorHandler(payloads, wrapper, input) {
    this.payloads = payloads;
    this.wrapper = wrapper;
    this.input = input;

}

ColorHandler.prototype.handlers = {
    'FunctionDeclaration': FunctionStatement,
    'WhileStatement': WhileStatement,
    'IfStatement': IfStatement,
    'else if statement': ElseIfStatement,
};

ColorHandler.prototype.colorCode = function () {
    for (let i = 0; i < this.payloads.length; i++) {
        let codeType = this.payloads[i].type;

        if (!this.handlers[codeType]) continue;

        let codeHandler = new this.handlers[codeType](this.wrapper, this.payloads[i], this.input);
        codeHandler.colorCode();
    }
};

export {ColorHandler};
