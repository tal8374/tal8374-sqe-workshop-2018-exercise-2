import $ from 'jquery';
import {parseCode} from './utils/code-analyzer';

import {facadeDeclaration} from './statement-payload/facade-declaration-handler';
import {CodeHandler} from './statement-code/code-handler';
import {printCode} from './utils/common';
import {SymbolicSubstitutionHandler} from './statement-symbolic-substitution/symbolic-substitution-handler';

$(document).ready(function () {

    $('#button').click(() => {
        let payloads = getPayloads();

        // console.log(payloads);

        doSymbolicSubstitution(payloads);

        // console.log(payloads);

        // let inputCode = $('#inputCode').val();

        let code = createCode(payloads);

        printCode(code);

    });

});

function getPayloads() {
    let codeToParse = $('#codePlaceholder').val();
    let parsedCode = parseCode(codeToParse);

    let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
    facadeDeclarationHandler.createPayloads();
    return facadeDeclarationHandler.getPayloads();
}

function doSymbolicSubstitution(payloads) {
    let symbolicSubstitution = new SymbolicSubstitutionHandler(payloads);
    symbolicSubstitution.doSymbolicSubstitution();
}

function createCode(payloads) {
    let codeCreatorHandler = new CodeHandler(payloads);
    codeCreatorHandler.createCode();
    return codeCreatorHandler.getCode();
}
