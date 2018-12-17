function addMarginLeft(code, numberOfTabs) {
    if (!code.style) {
        code.style = {};
    }

    code.style.marginLeft = 20 * numberOfTabs + 'px';
}

function addColor(code, backgroundColor) {
    code.style.backgroundColor = backgroundColor;
}

function replaceAll(str, search, replacement) {
    return str.split(search).join(replacement);
}

function updateLocalVariable(payload, localVariables, globalVariables, params) {
    let variableName = payload.name || '';
    let variableContent = payload.value || '';

    variableContent = doSymbolicSubstitutionTo(variableContent, variableName, localVariables, globalVariables, params);
    localVariables[variableName] = getVariableContent(variableContent);
    variableContent = getVariableContent(variableContent);
    payload.value = variableContent;

    updateParamValue(params, variableName, variableContent);
}

function getVariableContent(variableContent) {
    var expr = new RegExp('(?<=[-+*/])|(?=[-+*/])');
    let splittedVariableContent = variableContent.split(expr);
    const mappedVariableContent = splittedVariableContent.map(content => {
        try {
            content = eval(content);
            return JSON.stringify(content);
        } catch (e) {
            return content;
        }
    });

    return mappedVariableContent.join(' ');
}

function updateParamValue(params, variableName, variableContent) {
    let paramPayload = params.filter(param => param.name === variableName);
    if (paramPayload.length !== 1) return;

    paramPayload = paramPayload[0];
    paramPayload.value = variableContent;
}

function doSymbolicSubstitutionTo(variableContent, variableName, localVariables, globalVariables, params) {
    variableContent = doSymbolicSubstitutionWithLocalVariableTo(variableContent, variableName, localVariables, params);

    variableContent = doSymbolicSubstitutionWithGlobalVariableTo(variableContent, variableName,
        localVariables, globalVariables, params);

    return variableContent;
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

function colorCondition(payload, params, condition, inputs) {
    for (let i = 0; i < params.length; i++) {
        condition = replaceAll(condition, params[i].name, inputs[i], []);
    }

    let isEntered = checkCondition(condition);

    if (!payload.style) {
        payload.style = {};
    }

    payload.style.backgroundColor = isEntered ? '#7FFF00' : '#FF4500';
}

function checkCondition(condition) {
    try {
        return eval(condition);

    } catch (e) {
        if (typeof condition === 'string') {
            return condition.length;
        }
    }
}


export {addMarginLeft, replaceAll, updateLocalVariable, getGlobalVariables, colorCondition, addColor};
