function printCode(code) {
    let codeWrapper = document.getElementById('codeWrapper');

    code.forEach(function (codeStatement) {
        var div = document.createElement('div');

        div.innerText = codeStatement.text;
        div.style.marginLeft = codeStatement.style.marginLeft;
        codeWrapper.appendChild(div);
    });
}

function addMarginLeft(code, numberOfTabs) {
    if (!code.style) {
        code.style = {};
    }

    code.style.marginLeft = 20 * numberOfTabs + 'px';
}

function replaceAll(str, search, replacement, params) {
    if(isParam(search, params)) return str;

    return str.split(search).join(replacement);
}


function updateLocalVariable(payload, localVariables, globalVariables, params) {
    let variableName = payload.name || '';
    let variableContent = payload.value || '';

    variableContent = doSymbolicSubstitutionTo(variableContent, variableName, localVariables, globalVariables, params);

    payload.value = variableContent;
    localVariables[variableName] = variableContent;

    updateParamValue(params, variableName, variableContent);
}

function updateParamValue(params, variableName, variableContent) {
    let paramPayload = params.filter(param => param.name === variableName);

    if(paramPayload.length !== 1) return;

    paramPayload = paramPayload[0];
    paramPayload.value = variableContent;
}

function doSymbolicSubstitutionTo(variableContent, variableName, localVariables, globalVariables, params) {
    variableContent = doSymbolicSubstitutionWithLocalVariableTo(variableContent, variableName, localVariables, params);

    variableContent = doSymbolicSubstitutionWithGlobalVariableTo(variableContent, variableName,
        localVariables, globalVariables, params);

    return variableContent;
}

function isParam(variableName, params) {
    for (let i = 0; i < params.length; i++) {
        if (params[i].name === variableName) {
            return true;
        }
    }

    return false;
}

function doSymbolicSubstitutionWithLocalVariableTo(variableContent, variableName, localVariables, params) {
    for (let localVariable in localVariables) {
        if (localVariables.hasOwnProperty(localVariable)) {
            variableContent = replaceAll(variableContent, localVariable, localVariables[localVariable], params);
        }
    }

    return variableContent;
}

function doSymbolicSubstitutionWithGlobalVariableTo(variableContent, variableName, localVariables, globalVariables, params) {
    for (let globalVariable in globalVariables) {
        if (globalVariables.hasOwnProperty(globalVariable) && !(globalVariables in localVariables)) {

            variableContent = replaceAll(variableContent, globalVariable, globalVariables[globalVariable], params);
        }
    }

    return variableContent;
}

function getGlobalVariables(wrapper, params) {
    if (!wrapper) {
        return {};
    }

    return getGlobalVariablesHelper(wrapper, params);
}

function getGlobalVariablesHelper(wrapper, params) {
    if (!wrapper) return {};

    let tmp = getGlobalVariablesHelper(wrapper.wrapper, params);
    let wrapperLocalVariables = wrapper.getLocalVariables();

    for (var property in tmp) {
        if (!tmp.hasOwnProperty(property)) return;

        if (property in wrapperLocalVariables) {
            wrapperLocalVariables[property] = replaceAll(wrapperLocalVariables[property], property, tmp[property], params);
        } else {
            wrapperLocalVariables[property] = tmp[property];
        }

    }

    return wrapperLocalVariables;
}


export {printCode, addMarginLeft, replaceAll, updateLocalVariable, getGlobalVariables};
