import {getGlobalVariables} from '../utils/common';

function AssignmentStatement(wrapper, payloads) {
    this.wrapper = wrapper;
    this.payloads = payloads;
    this.localVariables = {};
}

AssignmentStatement.prototype.doSymbolicSubstitution = function () {

};

AssignmentStatement.prototype.getLocalVariables = function () {
    return this.localVariables;
};


AssignmentStatement.prototype.getGlobalVariables = function () {
    return getGlobalVariables(this.wrapper);
};

export {AssignmentStatement};
