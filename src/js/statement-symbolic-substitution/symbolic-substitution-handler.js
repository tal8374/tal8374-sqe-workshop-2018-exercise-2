import {FunctionStatement} from './functionStatement';
import {WhileStatement} from './whileStatement';
import {ElseIfStatement} from './elseIfStatement';
import {ReturnStatement} from './returnStatement';
import {getGlobalVariables, updateLocalVariable} from '../utils/common';
import {IfStatement} from './ifStatement';

function SymbolicSubstitutionHandler(payload, wrapper) {
    this.payload = payload;
    this.wrapper = wrapper;
    this.localVariables = {};
}

SymbolicSubstitutionHandler.prototype.handlers = {
    // 'VariableDeclarator': VariableStatement,
    'FunctionDeclaration': FunctionStatement,
    'WhileStatement': WhileStatement,
    // 'AssignmentExpression': AssignmentStatement,
    'IfStatement': IfStatement,
    'else if statement': ElseIfStatement,
    'ReturnStatement': ReturnStatement,
};

SymbolicSubstitutionHandler.prototype.localVariablesHandlers = {
    'VariableDeclarator': updateLocalVariable,
    'AssignmentExpression': updateLocalVariable,
};

SymbolicSubstitutionHandler.prototype.doSymbolicSubstitution = function () {
    this.initializeLocalVariables();

    for (let i = 0; i < this.payload.length; i++) {
        let payload = this.payload[i];
        let codeType = payload.type;
        if (!this.handlers[codeType]) continue;

        let symbolicSubstitutionHandler = new this.handlers[codeType](this, payload);
        console.log(codeType)
        console.log(payload)
        console.log(symbolicSubstitutionHandler)
        console.log(symbolicSubstitutionHandler.doSymbolicSubstitution)
        symbolicSubstitutionHandler.doSymbolicSubstitution();
    }
};

SymbolicSubstitutionHandler.prototype.initializeLocalVariables = function () {
    let body = this.payload;

    for (let i = 0; i < body.length; i++) {
        let type = body[i].type;

        if (!this.localVariablesHandlers[type]) continue;

        updateLocalVariable(body[i], this.localVariables, this.getGlobalVariables(), []);
    }
};

SymbolicSubstitutionHandler.prototype.getGlobalVariables = function () {
    return getGlobalVariables(this.wrapper);
};

SymbolicSubstitutionHandler.prototype.getLocalVariables = function () {
    return this.localVariables;
};

export {SymbolicSubstitutionHandler};
