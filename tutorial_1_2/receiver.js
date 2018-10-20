var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'hello';
        // ch.prefetch(1); //one task ata a time
        ch.assertQueue(q, { durable: false });
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function (msg) {
            const secs = msg.content.toString().length * 1000;
            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(() => console.log('[x] Task Done'), secs);
        }, { noAck: false });
    });
});