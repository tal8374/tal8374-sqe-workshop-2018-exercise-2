import {ColorHandler} from './color-handler';

function WhileStatement(wrapper, payloads, input) {
    this.wrapper = wrapper;
    this.payloads = payloads;
    this.input = input;
}

WhileStatement.prototype.colorCode = function () {
    let bodyCode = this.payloads.body;

    for (let i = 0; i < bodyCode.length; i++) {
        let colorCreator = new ColorHandler([bodyCode[i]], this, this.input);
        colorCreator.colorCode();
    }
};

export {WhileStatement};
