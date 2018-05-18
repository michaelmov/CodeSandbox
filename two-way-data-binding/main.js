document.addEventListener("DOMContentLoaded", () => {
    const inputElements = document.querySelectorAll('[mm-model]');
    const boundElements = document.querySelectorAll('[mm-bind]');
    let scope = {};
    
    init();

    scope.firstname = 'John';
    scope.lastname = 'Doe';

    function init() {
        for (let el of inputElements) {
            if (el.type === 'text') {
                let propName = el.getAttribute('mm-model');
    
                updateScopeProp(propName);
    
                el.addEventListener('keyup', e => {
                    scope[propName] = el.value;
                })
            }
        }
    };

    function updateScopeProp(prop) {
        if(!scope.hasOwnProperty(prop)) {
            let value;
            Object.defineProperty(scope, prop, {
                set: (newValue) => {
                    value = newValue;

                    for (let el of inputElements) {
                        if(el.getAttribute('mm-model') === prop) {
                            if(el.type) {
                                el.value = newValue;
                            }
                        }  
                    }
                    for (let el of boundElements) {
                        if(el.getAttribute('mm-bind') === prop) {
                            if (!el.type) {
                                el.innerHTML = newValue;
                            }
                        }
                    }
                }, 
                get: () => {
                    return value;
                },
                enumerable: true
            })
        }
        
    }
});