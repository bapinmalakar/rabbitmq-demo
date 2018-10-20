const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn){
    conn.createChannel(function(errr, ch){
        const ex = 'logss';
        const msg = process.argv[2] || 'Hello World';
        const route = process.argv[3] || 'red'
        ch.assertExchange(ex, 'direct', {durable: false});
        ch.publish(ex, route, new Buffer(msg));
    });
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
})