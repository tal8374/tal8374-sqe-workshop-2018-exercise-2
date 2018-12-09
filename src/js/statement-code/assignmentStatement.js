import {addMarginLeft} from '../utils/common';

function AssignmentStatement(wrapper, payloads, numberOfTabs) {
    this.wrapper = wrapper;
    this.payloads = payloads;
    this.code = [];
    this.numberOfTabs = numberOfTabs;
}

AssignmentStatement.prototype.createCode = function () {
    let text = this.payloads.name + ' = ' + this.payloads.value + ';';

    var code = {
        text: text
    };

    addMarginLeft(code, this.numberOfTabs);

    this.code.push(code);
};

AssignmentStatement.prototype.getCode = function () {
    return this.code;
};

export {AssignmentStatement};
