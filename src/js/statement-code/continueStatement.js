import {addMarginLeft} from '../utils/common';

function ContinueStatement(wrapper, payloads, numberOfTabs) {
    this.wrapper = wrapper;
    this.payloads = payloads;
    this.code = [];
    this.numberOfTabs = numberOfTabs;
}

ContinueStatement.prototype.createCode = function () {
    let text = 'continue;';

    var code = {
        text: text
    };

    addMarginLeft(code, this.numberOfTabs);

    this.code.push(code);
};


ContinueStatement.prototype.getCode = function () {
    return this.code;
};

export {ContinueStatement};
