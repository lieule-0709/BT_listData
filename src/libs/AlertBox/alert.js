/**
 * 
 * @param {string} message
 * @param {number} type
 * 0: Danger
 * 1: Success
 * 2: Info
 * 3: Warning 
 * @param {number} timeout
 * millisecond
 */
    export default function alertMessage(message, type, timeout) {
    let prefix = '';
    let alertClass = '';

    switch(type) {
        case 0:
            prefix = 'Danger';
            break;
        case 1: 
            prefix = 'Success';
            alertClass = 'success';
            break;
        case 2: 
            prefix = 'Info';
            alertClass = 'info';
            break;    
        case 3: 
            prefix = 'Warning';
            alertClass = 'warning';
            break;
    }

    let alert = document.createElement('div');
    alert.className += 'alert ' + alertClass;
    let span = document.createElement('span');
    span.className += 'closebtn';
    let strong = document.createElement('strong');

    span.innerHTML = '&times;';
    strong.innerHTML = prefix;
    alert.appendChild(span);
    alert.appendChild(strong);
    alert.innerHTML += ' ' + message;

    let alertContainer = document.getElementById('div_AlertContainer');

    alertContainer.appendChild(alert);

    span.onclick = function(){
        let div = this.parentElement;
        fade(div);
    }

    setTimeout(() => {
        fade(alert);
    }, timeout)
}

function fade(component) {
    component.style.opacity = "0";
    setTimeout(function(){ component.style.display = "none"; component.remove();}, 400);
}