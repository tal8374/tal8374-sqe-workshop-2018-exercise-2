import {updateLocalVariable, getGlobalVariables} from '../utils/common';

function ReturnStatement(wrapper, payload) {
    this.wrapper = wrapper;
    this.payload = payload;
    this.localVariables = {};
}

ReturnStatement.prototype.handlers = {
    'VariableDeclarator': updateLocalVariable,
    'AssignmentExpression': updateLocalVariable,
};

ReturnStatement.prototype.doSymbolicSubstitution = function () {
    this.initializeLocalVariables();
};

ReturnStatement.prototype.initializeLocalVariables = function () {
    updateLocalVariable(this.payload, this.localVariables, this.getGlobalVariables(), []);
};

ReturnStatement.prototype.getLocalVariables = function () {
    return this.localVariables;
};

ReturnStatement.prototype.getGlobalVariables = function () {
    return getGlobalVariables(this.wrapper);
};

export {ReturnStatement};
