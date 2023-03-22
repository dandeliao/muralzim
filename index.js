// ---
// State

var state = {
    lastSticker: 0,
    flux: 'column', // column || row
    theme: 'light' // light || dark
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
        elNew.innerText = 'double-click to edit text...';
        switch (state.fluxInSticker) {
            case 'horizontal':
                elNew.style.flexDirection = 'row';
                break;
            case 'vertical':
                elNew.style.flexDirection = 'column';
                break;
        }
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

function renderHeader() {

    let elFlux = document.querySelector('#flux');
    for (let child of elFlux.children) {
        if (child.classList.contains(state.flux)) {
            child.ariaPressed = 'true';
            child.classList.add('pressed');
        } else {
            child.ariaPressed = 'false';
            child.classList.remove('pressed');
        }
    }

    let elTheme = document.querySelector('#theme');
    for (let child of elTheme.children) {
        if (child.classList.contains(state.theme)) {
            child.ariaPressed = 'true';
            child.classList.add('pressed');
        } else {
            child.ariaPressed = 'false';
            child.classList.remove('pressed');
        }
    }

    let cssTheme = document.getElementById('css-theme');
    switch (state.theme) {
        case 'light':
            cssTheme.href = 'theme-light.css';
            break;
        case 'dark':
            cssTheme.href = 'theme-dark.css';
            break;
    }

}

function renderMain() {

    let elMain = document.querySelector('main');
    elMain.style.minWidth = window.innerWidth + 'px';
    elMain.style.minHeight = window.innerHeight - 50 + 'px';

    switch (state.flux) {
        case 'column':
            elMain.style.flexDirection = 'row';
            break;
        case 'row':
            elMain.style.flexDirection = 'column';
            break;
    }
    
    allChildren(elMain, (element) => {
        if (element.classList.contains('sticker')) {
            switch (state.flux) {
                case 'column':
                    element.style.flexDirection = 'column';
                    break;
                case 'row':
                    element.style.flexDirection = 'row';
                    break;
            }
        }
    });

}

// ---
// Initial setup

window.addEventListener('DOMContentLoaded', e => {

    let elMain =    document.querySelector('main');
    let elHeader =  document.querySelector('header');
    let elDragMe =  document.querySelector('#drag-me');

    renderMain();

    elMain.addEventListener('dragover', dragover_handler);
    elMain.addEventListener('dragleave', dragleave_handler);
    elMain.addEventListener('drop', drop_handler);
    elDragMe.addEventListener('dragstart', dragstart_handler);

    renderHeader();

    let elTrash = document.querySelector('#trash');
    let elFlux = document.querySelector('#flux');
    let elTheme = document.querySelector('#theme');

    elTrash.addEventListener('dragover', dragover_handler);
    elTrash.addEventListener('dragleave', dragleave_handler);
    elTrash.addEventListener('drop', e => {
        e.preventDefault();
        e.target.classList.remove('drag-over');
        const data = e.dataTransfer.getData("text/plain");
        if (data !== 'drag-me') {
            document.getElementById(data).remove();
        }
    });

    for (let child of elFlux.children) {
        if (child.classList.contains('flux')) {
            child.addEventListener('click', e => {
                let btn = e.target;
                if (btn.classList.contains('column')) {
                    state.flux = 'column';
                } else if (btn.classList.contains('row')) {
                    state.flux = 'row';
                }
                console.log(state);
                renderHeader();
                renderMain();
            });
        }
    }

    for (let child of elTheme.children) {
        if (child.classList.contains('theme')) {
            child.addEventListener('click', e => {
                let btn = e.target;
                if (btn.classList.contains('light')) {
                    state.theme = 'light';
                } else if (btn.classList.contains('dark')) {
                    state.theme = 'dark';
                }
                console.log(state);
                renderHeader();
                renderMain();
            })
        }
    }
});

window.addEventListener('resize', e => {
    
    renderMain();

});

// ---
// Auxiliary functions

function allChildren (node, callback) {
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      allChildren(child, callback);
      callback(child);
    }
}