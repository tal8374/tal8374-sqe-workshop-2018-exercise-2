import {SymbolicSubstitutionHandler} from './symbolic-substitution-handler';
import {getGlobalVariables, updateLocalVariable} from '../utils/common';

function WhileStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
    this.localVariables = {};
}

WhileStatement.prototype.handlers = {
    'VariableDeclarator': updateLocalVariable,
    'AssignmentExpression': updateLocalVariable,
};

WhileStatement.prototype.doSymbolicSubstitution = function () {
    this.handleDeclaration();

    this.initializeLocalVariables();
};

WhileStatement.prototype.initializeLocalVariables = function () {
    let body = this.payload.body;

    for (let i = 0; i < body.length; i++) {
        let payload = body[i];
        let type = payload.type;

        if (this.handlers[type]) {
            updateLocalVariable(payload, this.localVariables, this.getGlobalVariables(), []);
        } else {
            let symbolicSubstitution = new SymbolicSubstitutionHandler([payload], this);
            symbolicSubstitution.doSymbolicSubstitution();
        }
    }
};

WhileStatement.prototype.getGlobalVariables = function () {
    return getGlobalVariables(this.wrapper);
};

WhileStatement.prototype.getLocalVariables = function () {
    return this.localVariables;
};

WhileStatement.prototype.handleDeclaration = function () {
    if (!this.payload.declaration || !this.payload.declaration.condition) return;
    let payload = {};
    payload.value = this.payload.declaration.condition;
    updateLocalVariable(payload, Object.assign({}, this.localVariables), this.getGlobalVariables(), []);
    this.payload.declaration.condition = payload.value;
};


export {WhileStatement};
