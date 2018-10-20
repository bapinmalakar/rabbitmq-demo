const amqp = require('amqplib/callback_api');

const args = process.argv.slice(2);

if (args.length == 0) {
    console.log("Usage: receive_logs_topic.js <facility>.<severity>");
    process.exit(1);
}

amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (error, ch) {
        const ex = 'topic_exchnage';

        ch.assertExchange(ex, 'topic', { durable: false });
        ch.assertQueue('', { exclusive: true }, function (queueError, q) {
            args.forEach(function (key) { // for register the keys to accept
                console.log('Keeeyyyyy:: ', key);
                ch.bindQueue(q.queue, ex, key);
            });

            ch.consume(q.queue, function (msg) {
                console.log(" [x] %s:'%s'", msg.fields.routingKey, msg.content.toString());
            }, { noAck: true });

        })
    })
})