const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn){
    conn.createChannel(function(errr, ch){
        const ex = 'logs'; // exchange name
        const msg = process.argv[2] || 'Hello World';
        ch.assertExchange(ex, 'fanout', {durable: false}); // create exchange (name, exchange_mode, options)
        ch.publish(ex, '', new Buffer(msg)); // publish message means broadcst to all subscriber
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() { conn.close(); process.exit(0) }, 500);
})