import {SymbolicSubstitutionHandler} from './symbolic-substitution-handler';
import {getGlobalVariables, updateLocalVariable} from '../utils/common';

function FunctionStatement(wrapper, payload) {
    this.payload = payload;
    this.wrapper = wrapper;
    this.localVariables = {};
}

FunctionStatement.prototype.handlers = {
    'VariableDeclarator': updateLocalVariable,
    'AssignmentExpression': updateLocalVariable,
};

FunctionStatement.prototype.doSymbolicSubstitution = function () {
    this.initializeLocalVariables();
};

FunctionStatement.prototype.initializeLocalVariables = function () {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let type = body[i].type;
        let payload = body[i];

        if (this.handlers[type]) {
            updateLocalVariable(payload, this.localVariables, this.getGlobalVariables(), this.payload.params);
        } else {
            let symbolicSubstitution = new SymbolicSubstitutionHandler([payload], this);
            symbolicSubstitution.doSymbolicSubstitution();
        }
    }
};


FunctionStatement.prototype.getGlobalVariables = function () {
    return getGlobalVariables(this.wrapper);
};

FunctionStatement.prototype.getLocalVariables = function () {
    return this.localVariables;
};


export {FunctionStatement};
