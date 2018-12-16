import assert from 'assert';
import {parseCode} from '../src/js/utils/code-analyzer';
import {facadeDeclaration} from "../src/js/statement-payload/facade-declaration-handler";
import {ColorHandler} from "../src/js/color-condition/color-handler";
import {CodeHandler} from "../src/js/statement-code/code-handler";

describe('The color condition', () => {
    it('is should do complicated statement-symbolic-substitution', () => {
        let codeToParse = 'let d = 2;\n' +
            '\n' +
            'function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '\n' +
            '    while (a < z) {\n' +
            '        c = a + b;\n' +
            '        z = c * 2;\n' +
            '    }\n' +
            '\n' +
            '    \n' +
            '    if (b < z) {\n' +
            '        c = c + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else if (b < z * 2) {\n' +
            '        c = c + x + 5;\n' +
            '        return x + y + z + c;\n' +
            '    } else {\n' +
            '        c = c + z + 5;\n' +
            '        return x + y + z + c;\n' +
            '    }\n' +
            '}\n' +
            '\n' +
            'd = 333;';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        let inputCode = '1,2,3';
        let inputCodeSplitted = eval('[' + inputCode + ']');

        let colorCode = new ColorHandler(payload, null, inputCodeSplitted);
        colorCode.colorCode();

        let codeCreatorHandler = new CodeHandler(payload);
        codeCreatorHandler.createCode();
        let code = codeCreatorHandler.getCode();

        assert.equal(
            JSON.stringify(code),
            '[{"text":"function foo (x, y, z) {","style":{"marginLeft":"0px"}},{"text":"while  (a<z) {","style":{"marginLeft":"20px"}},{"text":"z = (c)*(2);","style":{"marginLe' +
            'ft":"40px"}},{"text":"}","style":{"marginLeft":"20px"}},{"text":"if  (b<z) {","style":{"marginLeft":"20px","backgroundColor":"#7FFF00"}},{"text":"return x+y+z+c;","style":{"ma' +
            'rginLeft":"40px"}},{"text":"}","style":{"marginLeft":"20px"}},{"text":"else if  (b<(z)*(2)) {","style":{"marginLeft":"20px","backgroundColor":"#7FFF00"}},{"text":"return x+y+z+c;' +
            '","style":{"marginLeft":"40px"}},{"text":"}","style":{"marginLeft":"20px"}},{"text":"else  {","style":{"marginLeft":"20px"}},{"text":"return x+y+z+c;","style":{"marginLeft":"' +
            '40px"}},{"text":"}","style":{"marginLeft":"20px"}},{"text":"}","style":{"marginLeft":"0px"}}]'
        );
    });

    it('is should do  color condition to function with while statement', () => {
        let codeToParse = 'function foo(x, y, z){\n' +
            '    let a = x + 1;\n' +
            '    let b = a + y;\n' +
            '    let c = 0;\n' +
            '    \n' +
            '    while (a < z) {\n' +
            '        c = a + b;\n' +
            '        z = c * 2;\n' +
            '    }\n' +
            '    \n' +
            '    return z;\n' +
            '}\n';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        let inputCode = '1,2,3';
        let inputCodeSplitted = eval('[' + inputCode + ']');

        let colorCode = new ColorHandler(payload, null, inputCodeSplitted);
        colorCode.colorCode();

        let codeCreatorHandler = new CodeHandler(payload);
        codeCreatorHandler.createCode();
        let code = codeCreatorHandler.getCode();

        assert.equal(
            JSON.stringify(code),
            '[{"text":"function foo (x, y, z) {","style":{"marginLeft":"0px"}},{"text":"while  (a<z) {","style":{"marginLeft":"20px"}},{"text":"z = (c)*(2);","style":{"marginLe' +
            'ft":"40px"}},{"text":"}","style":{"marginLeft":"20px"}},{"text":"return z;","style":{"marginLeft":"20px"}},{"text":"}","style":{"marginLeft":"0px"}}]'
        );
    });

    it('is should do  color condition to if statements inside all if statements', () => {
        let codeToParse = 'if (true) {\n' +
            '    if (true) {\n' +
            '        let a = 2\n' +
            '    } else if (true) {\n' +
            '        let a = 2\n' +
            '    } else {\n' +
            '        let a = 2\n' +
            '    }\n' +
            '    let a = 2\n' +
            '} else if (true) {\n' +
            '    if (true) {\n' +
            '        let a = 2\n' +
            '    } else if (true) {\n' +
            '        let a = 2\n' +
            '    } else {\n' +
            '        let a = 2\n' +
            '    }\n' +
            '    let a = 2\n' +
            '} else {\n' +
            '    if (true) {\n' +
            '        let a = 2\n' +
            '    } else if (true) {\n' +
            '        let a = 2\n' +
            '    } else {\n' +
            '        let a = 2\n' +
            '    }\n' +
            '    let a = 2\n' +
            '}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        let inputCode = '1,2,3';
        let inputCodeSplitted = eval('[' + inputCode + ']');

        let colorCode = new ColorHandler(payload, null, inputCodeSplitted);
        colorCode.colorCode();

        let codeCreatorHandler = new CodeHandler(payload);
        codeCreatorHandler.createCode();
        let code = codeCreatorHandler.getCode();

        assert.equal(
            JSON.stringify(code),
            '[{"text":"if  (true) {","style":{"marginLeft":"0px","backgroundColor":"#7FFF00"}},{"text":"if  (true) {","style":{"marginLeft":"20px","backgroundColor":"#7FFF00"}' +
            '},{"text":"}","style":{"marginLeft":"20px"}},{"text":"else if  (true) {","style":{"marginLeft":"20px","backgroundColor":"#7FFF00"}},{"text":"}","style":{"marginLeft":"20px"}},' +
            '{"text":"else  {","style":{"marginLeft":"20px"}},{"text":"}","style":{"marginLeft":"20px"}},{"text":"}","style":{"marginLeft":"0px"}},{"text":"else if  (true) {","style":{"' +
            'marginLeft":"0px","backgroundColor":"#7FFF00"}},{"text":"if  (true) {","style":{"marginLeft":"20px","backgroundColor":"#7FFF00"}},{"text":"}","style":{"marginLeft":"20px"}},{"te' +
            'xt":"else if  (true) {","style":{"marginLeft":"20px","backgroundColor":"#7FFF00"}},{"text":"}","style":{"marginLeft":"20px"}},{"text":"else  {","style":{"marginLeft":"20px"}},{' +
            '"text":"}","style":{"marginLeft":"20px"}},{"text":"}","style":{"marginLeft":"0px"}},{"text":"else  {","style":{"marginLeft":"0px"}},{"text":"if  (true) {","style":{"marginL' +
            'eft":"20px","backgroundColor":"#7FFF00"}},{"text":"}","style":{"marginLeft":"20px"}},{"text":"else if  (true) {","style":{"marginLeft":"20px","backgroundColor":"#7FFF00"}},{"tex' +
            't":"}","style":{"marginLeft":"20px"}},{"text":"else  {","style":{"marginLeft":"20px"}},{"text":"}","style":{"marginLeft":"20px"}},{"text":"}","style":{"marginLeft":"0px"}' +
            '}]'
        );
    });

    it('is should do  color condition to if multiple statements ', () => {
        let codeToParse = 'if (true) {\n' +
            '    let c1 = 2;\n' +
            '    let c2 = 3;\n' +
            '    let c3 = 4;\n' +
            '} else if (b < z * 2) {\n' +
            '    let c1 = 2;\n' +
            '    let c2 = 3;\n' +
            '    let c3 = 4;\n' +
            '} else {\n' +
            '    let c1 = 2;\n' +
            '    let c2 = 3;\n' +
            '    let c3 = 4;\n' +
            '}';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        let inputCode = '1,2,3';
        let inputCodeSplitted = eval('[' + inputCode + ']');

        let colorCode = new ColorHandler(payload, null, inputCodeSplitted);
        colorCode.colorCode();

        let codeCreatorHandler = new CodeHandler(payload);
        codeCreatorHandler.createCode();
        let code = codeCreatorHandler.getCode();

        assert.equal(
            JSON.stringify(code),
            '[{"text":"if  (true) {","style":{"marginLeft":"0px","backgroundColor":"#7FFF00"}},{"text":"}","style":{"marginLeft":"0px"}},{"text":"else if  (b<(z)*(2)) {","sty' +
            'le":{"marginLeft":"0px","backgroundColor":"#7FFF00"}},{"text":"}","style":{"marginLeft":"0px"}},{"text":"else  {","style":{"marginLeft":"0px"}},{"text":"}","style":{"marginL' +
            'eft":"0px"}}]'
        );
    });

    // it('is should do  color condition with only boolean ', () => {
    //     let codeToParse = 'function name(x,y,z) {\n' +
    //         '    if (true) {\n' +
    //         '        let c1 = x\n' +
    //         '        let c2 = y\n' +
    //         '        let c3 = z\n' +
    //         '    } else if (false) {\n' +
    //         '        let c1 = x\n' +
    //         '        let c2 = y\n' +
    //         '        let c3 = z\n' +
    //         '    } else {\n' +
    //         '        let c1 = x\n' +
    //         '        let c2 = y\n' +
    //         '        let c3 = z\n' +
    //         '    }\n' +
    //         '}';
    //     let parsedCode = parseCode(codeToParse);
    //
    //     let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
    //     facadeDeclarationHandler.createPayloads();
    //     let payload = facadeDeclarationHandler.getPayloads();
    //
    //     let inputCode = '1,2,3';
    //     let inputCodeSplitted = eval('[' + inputCode + ']');
    //
    //     let colorCode = new ColorHandler(payload, null, inputCodeSplitted);
    //     colorCode.colorCode();
    //
    //     let codeCreatorHandler = new CodeHandler(payload);
    //     codeCreatorHandler.createCode();
    //     let code = codeCreatorHandler.getCode();
    //
    //     assert.equal(
    //         JSON.stringify(code),
    //         '[{"text":"function name (x, y, z) {","style":{"marginLeft":"0px"}},{"text":"if  (true) {","style":{"marginLeft":"20px","backgroundColor":"#7FFF00"}},{"text":"}",' +
    //         '"style":{"marginLeft":"20px"}},{"text":"else if  (false) {","style":{"marginLeft":"20px","backgroundColor":"#FF4500"}},{"text":"}","style":{"marginLeft":"20px"}},{"text":"else' +
    //         '{","style":{"marginLeft":"20px"}},{"text":"}","style":{"marginLeft":"20px"}},{"text":"}","style":{"marginLeft":"0px"}}]'
    //     );
    // });

    it('is should handle unrecognized statements', () => {
        let codeToParse = 'try {\n' +
            '}\n' +
            'catch(error) {\n' +
            '}\n';
        let parsedCode = parseCode(codeToParse);

        let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
        facadeDeclarationHandler.createPayloads();
        let payload = facadeDeclarationHandler.getPayloads();

        let inputCode = '1,2,3';
        let inputCodeSplitted = eval('[' + inputCode + ']');

        let colorCode = new ColorHandler(payload, null, inputCodeSplitted);
        colorCode.colorCode();

        let codeCreatorHandler = new CodeHandler(payload);
        codeCreatorHandler.createCode();
        let code = codeCreatorHandler.getCode();

        assert.equal(
            JSON.stringify(code),
            '[]'
        );
    });

    // it('is should do  color condition to function with if statement', () => {
    //     let codeToParse = 'function foo(x, y, z){\n' +
    //         '    let a = x + 1;\n' +
    //         '    let b = a + y;\n' +
    //         '    let c = 0;\n' +
    //         '    \n' +
    //         '    if (b < z) {\n' +
    //         '        c = c + 5;\n' +
    //         '        return x + y + z + c;\n' +
    //         '    } else if (b < z * 2) {\n' +
    //         '        c = c + x + 5;\n' +
    //         '        return x + y + z + c;\n' +
    //         '    } else {\n' +
    //         '        c = c + z + 5;\n' +
    //         '        return x + y + z + c;\n' +
    //         '    }\n' +
    //         '}\n';
    //     let parsedCode = parseCode(codeToParse);
    //
    //     let facadeDeclarationHandler = new facadeDeclaration(parsedCode);
    //     facadeDeclarationHandler.createPayloads();
    //     let payload = facadeDeclarationHandler.getPayloads();
    //
    //     let inputCode = '1,2,3';
    //     let inputCodeSplitted = eval('[' + inputCode + ']');
    //
    //     let colorCode = new ColorHandler(payload, null, inputCodeSplitted);
    //     colorCode.colorCode();
    //
    //     let codeCreatorHandler = new CodeHandler(payload);
    //     codeCreatorHandler.createCode();
    //     let code = codeCreatorHandler.getCode();
    //
    //     assert.equal(
    //         JSON.stringify(code),
    //         '[{"text":"function foo (x, y, z) {","style":{"marginLeft":"0px"}},{"text":"if  (b<z) {","style":{"marginLeft":"20px","backgroundColor":"#7FFF00"}},{"text":"return' +
    //         'x+y+z+c;","style":{"marginLeft":"40px"}},{"text":"}","style":{"marginLeft":"20px"}},{"text":"else if  (b<(z)*(2)) {","style":{"marginLeft":"20px","backgroundColor":"#7FFF00"}},{' +
    //         '"text":"return x+y+z+c;","style":{"marginLeft":"40px"}},{"text":"}","style":{"marginLeft":"20px"}},{"text":"else  {","style":{"marginLeft":"20px"}},{"text":"return x+y+z+c;","' +
    //         'style":{"marginLeft":"40px"}},{"text":"}","style":{"marginLeft":"20px"}},{"text":"}","style":{"marginLeft":"0px"}}]'
    //     );
    // });

});
