import {addMarginLeft} from '../utils/common';
import {codeHandler} from './code-handler';

function IfStatement(wrapper, payloads, numberOfTabs) {
    this.wrapper = wrapper;
    this.payloads = payloads;
    this.code = [];
    this.numberOfTabs = numberOfTabs;
}

IfStatement.prototype.createCode = function () {
    this.createDeclarationCode();

    this.createBodyCode();

    this.closeCode();
};


IfStatement.prototype.createDeclarationCode = function () {
    let conditionText = ' (' + this.payloads.declaration.condition + ')';

    let text = 'if ' + conditionText + ' {';

    var code = {
        text: text
    };

    addMarginLeft(code, this.numberOfTabs);

    this.code.push(code);
};

IfStatement.prototype.createBodyCode = function () {
    let bodyCode = this.payloads.body;

    for (let i = 0; i < bodyCode.length; i++) {
        let codeCreator = new codeHandler([bodyCode[i]], this, this.numberOfTabs + 1);
        codeCreator.createCode();
        let createdCode = codeCreator.getCode();

        for (let j = 0; j < createdCode.length; j++) {
            this.code.push(createdCode[j]);
        }
    }
};

IfStatement.prototype.closeCode = function () {
    let text = '}';

    var code = {
        text: text
    };

    addMarginLeft(code, this.numberOfTabs);

    this.code.push(code);
};


IfStatement.prototype.getCode = function () {
    return this.code;
};

export {IfStatement};
