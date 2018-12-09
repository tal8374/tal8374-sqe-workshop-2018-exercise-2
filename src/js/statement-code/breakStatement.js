import {addMarginLeft} from '../utils/common';

function BreakStatement(wrapper, payloads, numberOfTabs) {
    this.wrapper = wrapper;
    this.payloads = payloads;
    this.code = [];
    this.numberOfTabs = numberOfTabs;
}

BreakStatement.prototype.createCode = function () {
    let text = 'break;';

    var code = {
        text: text
    };

    addMarginLeft(code, this.numberOfTabs);

    this.code.push(code);
};


BreakStatement.prototype.getCode = function () {
    return this.code;
};

export {BreakStatement};
