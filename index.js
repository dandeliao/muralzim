// ---
// State

var state = {
    lastSticker: 0
}

// ---
// Drag & drop handlers

function dragstart_handler(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    console.log(e.dataTransfer);
}

function dragover_handler(e) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    e.target.classList.add('drag-over');
}

function dragleave_handler(e) {
    e.preventDefault();
    e.target.classList.remove('drag-over');
}

function drop_handler(e) {
    
    e.preventDefault();
    e.target.classList.remove('drag-over');
    const data = e.dataTransfer.getData("text/plain");
    
    if (data === 'drag-me') {
        
        let elNew = document.createElement('div');
        
        elNew.classList.add('sticker', 'drop-zone');
        elNew.setAttribute('id', `sticker-${state.lastSticker + 1}`);
        elNew.setAttribute('draggable', 'true');
        e.target.appendChild(elNew);
        e.stopPropagation();

        state.lastSticker++;

        elNew.addEventListener('dragstart', dragstart_handler);
        elNew.addEventListener('dragover', dragover_handler);
        elNew.addEventListener('dragleave', dragleave_handler);
        elNew.addEventListener('drop', drop_handler);

        elNew.addEventListener('dblclick', e  => {
            e.preventDefault();
            e.stopPropagation();
            e.target.contentEditable = 'true';
            e.target.focus();
        })
        elNew.addEventListener('blur', e =>  {
            e.preventDefault();
            e.stopPropagation();
            e.target.contentEditable = 'false';
        })

    }  else {

        e.target.appendChild(document.getElementById(data));

    }
}

// ---
// Rendering

function renderMain() {

    let elMain = document.querySelector('main');
    elMain.style.minWidth = window.innerWidth + 'px';
    elMain.style.minHeight = window.innerHeight - 50 + 'px';

}

// ---
// Main events

window.addEventListener('DOMContentLoaded', e => {

    let elMain =    document.querySelector('main');
    let elHeader =  document.querySelector('header');
    let elDragMe =  document.querySelector('#drag-me');

    renderMain();

    elMain.addEventListener('dragover', dragover_handler);
    elMain.addEventListener('dragleave', dragleave_handler);
    elMain.addEventListener('drop', drop_handler);
    elDragMe.addEventListener('dragstart', dragstart_handler);

});

window.addEventListener('resize', e => {
    
    renderMain();

});
