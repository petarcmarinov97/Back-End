const {publisher}=require('./index');

function firstHandler(msg) {
    console.log('First', msg);
}

function secondHandler(msg) {
    console.log('Second', msg.length);
}

function trirdHandler(a, b) {
    console.log('trird', a + b);
}

publisher.on('ping', firstHandler);
publisher.on('ping', secondHandler);
publisher.on('pong', trirdHandler);