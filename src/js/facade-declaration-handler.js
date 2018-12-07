import {BodyDeclaration} from './body-declaration-handler';

function facadeDeclarationHandler(parsedCode) {
    var handler = new BodyDeclaration(parsedCode.body, null, 1);

    handler.init();
}

export {facadeDeclarationHandler};