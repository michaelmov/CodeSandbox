class PubSub {
    constructor() {
        this.events = {}
    }

    on(eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    }

    off(eventName, fn) {
        if(this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                  this.events[eventName].splice(i, 1);
                  break;
                };
            }
        };
    }

    emit(eventName, data) {
        if(this.events[eventName]) {
            this.events[eventName].forEach(function(fn) { 
                fn(data);
            });
        }
    }
}

const pubSub = new PubSub();

pubSub.on('clicked', function(data) {
    const subscribers = document.querySelectorAll('.subscriber p');

    subscribers.forEach(function(sub, index) {
        setTimeout(function() {
            sub.innerHTML = data;
        }, index * 1000);
        
    })
});


document.querySelector('#pubSubForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const text = document.querySelector('#text').value;
    pubSub.emit('clicked', text);
});




