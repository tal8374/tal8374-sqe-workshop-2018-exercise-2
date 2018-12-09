import {VariableStatement} from './variableStatement';
import {FunctionStatement} from './functionStatement';
import {WhileStatement} from './whileStatement';
import {AssignmentStatement} from './assignmentStatement';
import {IfStatement} from './ifStatement';
import {ElseIfStatement} from './elseIfStatement';
import {ReturnStatement} from './returnStatement';
import {BreakStatement} from './breakStatement';
import {ContinueStatement} from './continueStatement';

function codeHandler(payloads, wrapper, numberOfTabs = 0) {
    this.payloads = payloads;
    this.wrapper = wrapper;
    this.code = [];
    this.numberOfTabs = numberOfTabs;
}

codeHandler.prototype.handlers = {
    'VariableDeclarator': VariableStatement,
    'FunctionDeclaration': FunctionStatement,
    'WhileStatement': WhileStatement,
    'AssignmentExpression': AssignmentStatement,
    'IfStatement': IfStatement,
    'else if statement': ElseIfStatement,
    'ReturnStatement': ReturnStatement,
    'BreakStatement': BreakStatement,
    'ContinueStatement': ContinueStatement,
};

codeHandler.prototype.createCode = function () {
    for (let i = 0; i < this.payloads.length; i++) {
        let codeType = this.payloads[i].type;

        if (!this.handlers[codeType]) return;

        let codeHandler = new this.handlers[codeType](this.wrapper, this.payloads[i], this.numberOfTabs);
        codeHandler.createCode();
        let code = codeHandler.getCode();


        for (let i = 0; i < code.length; i++) {
            if (this.wrapper) {
                this.wrapper.code.push(code[i]);
            } else {
                this.code.push(code[i]);
            }
        }
    }
};

codeHandler.prototype.printCode = function () {

};

codeHandler.prototype.getCode = function () {
    return this.code;
};


export {codeHandler};
