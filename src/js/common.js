var curLineNumber = 1;

function insertLineHandler(payload) {
    try {
        var table = document.getElementById('myTable');
    } catch (e) {
        return 'Failure';
    }
    var row = table.insertRow(curLineNumber++);

    insertLine(row, payload);
}

function insertLine(row, payload) {
    var lines = createLines(row, 5);

    lines[0].innerHTML = payload.lineNumber;
    lines[1].innerHTML = payload.type ? payload.type : '';
    lines[2].innerHTML = payload.name ? payload.name : '';
    lines[3].innerHTML = payload.condition ? payload.condition : '';
    lines[4].innerHTML = payload.value ? payload.value : '';
}

function createLines(row, numOfLines) {
    let lines = [];

    for (let i = 0; i < numOfLines; i++) {
        lines.push(row.insertCell(i));
    }

    return lines;
}

export {insertLineHandler};
