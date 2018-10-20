const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (err, conn) {
    conn.createChannel(function (error, ch) {
        const ex = 'topic_exchnage';
        let args = process.argv.slice(2);
        console.log('Args is:: ', args);
        let key = (args.length > 0) ? args[0] : 'anonymous.info';
        console.log('key is:: ', key);
        let msg = args.slice(1).join(' ') || 'Hello World!';
        console.log('Msg is:: ', msg);

        ch.assertExchange(ex, 'topic', { durable: false });
        ch.publish(ex, key, new Buffer(msg));
        console.log(" [x] Sent %s:'%s'", key, msg);
    })
    setTimeout(() => { conn.close(), process.exit(0) }, 500);
})