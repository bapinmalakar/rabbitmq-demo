const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn){
    conn.createChannel(function(err, ch){
        const ex = 'logs';
        ch.assertExchange(ex, 'fanout', {durable: false}); // create exchange same as lik publisher
        ch.assertQueue('', {exclusive: true}, function(err, q){ // create queue with empty name means queue will be delete after disconnect

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);

            ch.bindQueue(q.queue, ex, ''); // push message to queue
            ch.consume(q.queue, function(msg){
                console.log('Message Received:: ', msg.content.toString());
            })
        })
    })
})