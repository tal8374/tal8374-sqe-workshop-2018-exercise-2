import {colorCondition} from '../utils/common';
import {ColorHandler} from './color-handler';

function ElseIfStatement(wrapper, payload, input) {
    this.wrapper = wrapper;
    this.payload = payload;
    this.input = input;
}

ElseIfStatement.prototype.colorCode = function () {
    if (this.isElseIfStatement()) {
        this.colorCodeElseIfStatement();
    }

    this.handleBody();
};

ElseIfStatement.prototype.handleBody = function () {
    let bodyCode = this.payload.body;

    for (let i = 0; i < bodyCode.length; i++) {
        let colorCreator = new ColorHandler([bodyCode[i]], this, this.input);
        colorCreator.colorCode();
    }
};

ElseIfStatement.prototype.colorCodeElseIfStatement = function () {
    let condition =  this.payload.declaration.condition;

    colorCondition(this.payload, this.getParams(), condition, this.input);
};

ElseIfStatement.prototype.isElseIfStatement = function () {
    return this.payload.declaration;
};

ElseIfStatement.prototype.getWrapperParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

ElseIfStatement.prototype.getParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

export {ElseIfStatement};
