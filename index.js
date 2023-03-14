// ---
// Drag & drop handlers

function dragstart_handler(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    console.log(e.dataTransfer);
}

function dragover_handler(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
}
function drop_handler(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (data === 'drag-me') {
        let elNew = document.createElement('div');
        elNew.classList.add('sticker');
        e.target.appendChild(elNew);
        elNew.addEventListener('dblclick', e  => {
            e.target.contentEditable = 'true';
            e.target.focus();
        })
        elNew.addEventListener('blur', e =>  {
            e.target.contentEditable = 'false';
        })
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
    elMain.addEventListener('drop', drop_handler);
    elDragMe.addEventListener('dragstart', dragstart_handler);

});

window.addEventListener('resize', e => {
    
    renderMain();

});
