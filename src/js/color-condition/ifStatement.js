import {colorCondition} from '../utils/common';
import {ColorHandler} from './color-handler';

function IfStatement(wrapper, payload, input) {
    this.wrapper = wrapper;
    this.payload = payload;
    this.input = input;
}

IfStatement.prototype.colorCode = function () {
    this.colorCondition();

    this.handleBody();
};

IfStatement.prototype.colorCondition = function () {
    let condition =  this.payload.declaration.condition;

    colorCondition(this.payload, this.getParams(), condition, this.input);
};

IfStatement.prototype.handleBody = function () {
    let bodyCode = this.payload.body;

    for (let i = 0; i < bodyCode.length; i++) {
        let colorCreator = new ColorHandler([bodyCode[i]], this, this.input);
        colorCreator.colorCode();
    }
};

IfStatement.prototype.getWrapperParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

IfStatement.prototype.getParams = function () {
    if (!this.wrapper || !this.wrapper.getParams) return [];

    return this.wrapper.getParams();
};

export {IfStatement};
