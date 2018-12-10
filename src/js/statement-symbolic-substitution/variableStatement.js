import {getGlobalVariables} from '../utils/common';

function VariableStatement(wrapper, payloads) {
    this.wrapper = wrapper;
    this.payloads = payloads;
    this.localVariables = {};
}

VariableStatement.prototype.doSymbolicSubstitution = function () {

};

VariableStatement.prototype.getGlobalVariables = function () {
    return getGlobalVariables(this.wrapper);
};

VariableStatement.prototype.getLocalVariables = function () {
    return this.localVariables;
};

export {VariableStatement};
