import {addMarginLeft} from '../utils/common';

function VariableStatement(wrapper, payloads, numberOfTabs) {
    this.wrapper = wrapper;
    this.payloads = payloads;
    this.code = [];
    this.numberOfTabs = numberOfTabs;
}

VariableStatement.prototype.createCode = function () {
    let text = 'let ' + this.payloads.name + ' = ' + this.payloads.value + ';';

    let code = {
        text: text
    };

    addMarginLeft(code, this.numberOfTabs);

    if (this.isParam()) return;

    this.code.push(code);
};

VariableStatement.prototype.isParam = function () {
    if (!this.params) return true;

    return this.params.filter(param => param.name === this.payloads.name).length > 0;
};

VariableStatement.prototype.getWrapperParams = function () {
    if(!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

VariableStatement.prototype.getParams = function () {
    if(!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

VariableStatement.prototype.getCode = function () {
    return this.code;
};

export {VariableStatement};
