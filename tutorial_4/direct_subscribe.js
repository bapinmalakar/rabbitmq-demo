const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn){
    console.log('Inserrtttt')
    conn.createChannel(function(err, ch){
        const ex = 'logss';
        ch.assertExchange(ex, 'direct', {durable: false});
        ch.assertQueue('', {exclusive: true}, function(err, q){
            ch.bindQueue(q.queue, ex, 'red');
            ch.consume(q.queue, function(msg){
                console.log('Red receive message::: ', msg.content.toString());
            })
        })
    })
})