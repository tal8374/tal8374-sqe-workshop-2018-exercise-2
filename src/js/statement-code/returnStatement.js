import {addMarginLeft} from '../utils/common';

function ReturnStatement(wrapper, payloads, numberOfTabs) {
    this.wrapper = wrapper;
    this.payloads = payloads;
    this.code = [];
    this.numberOfTabs = numberOfTabs;
}

ReturnStatement.prototype.createCode = function () {
    let text = 'return ' + this.payloads.value + ';';

    var code = {
        text: text
    };

    addMarginLeft(code, this.numberOfTabs);

    this.code.push(code);
};

ReturnStatement.prototype.getWrapperParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

ReturnStatement.prototype.getParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

ReturnStatement.prototype.getCode = function () {
    return this.code;
};

export {ReturnStatement};
