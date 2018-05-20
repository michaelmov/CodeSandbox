document.addEventListener("DOMContentLoaded", () => {
    // Cache DOM elements
    const inputElements = document.querySelectorAll('[mm-model]');
    const boundElements = document.querySelectorAll('[mm-bind]');
    // Initialize scope variable to hold the state of the model.
    let scope = {};
    
    init();

    // Set initial scope values 
    // scope.firstname = 'John';
    // scope.lastname = 'Doe';


    function init() {
        // Loop through input elements
        for (let el of inputElements) {
            if (el.type === 'text') {
                // Get property name from each input with an attribute of 'mm-model'
                let propName = el.getAttribute('mm-model');

                // Set property update logic
                setPropUpdateLogic(propName);
                
                // Update bound scope property on input change
                el.addEventListener('keyup', e => {
                    scope[propName] = el.value;
                })
            }
        }
    };

    function setPropUpdateLogic(prop) {
        if(!scope.hasOwnProperty(prop)) {
            let value;
            Object.defineProperty(scope, prop, {
                 // Automatically update bound dom elements when a scope property is set to a new value
                set: (newValue) => {
                    value = newValue;

                    // Set input elements to new value
                    for (let el of inputElements) {
                        if(el.getAttribute('mm-model') === prop) {
                            if(el.type) {
                                el.value = newValue;
                            }
                        }  
                    }
                    // Set all other bound dom elements to new value
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