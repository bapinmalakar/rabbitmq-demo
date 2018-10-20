var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello'; // name of queue
    const msg =  process.argv[process.argv.length -1]|| 'Hello World!';
    ch.assertQueue(q, {durable: false}); // equivalent to
    ch.sendToQueue(q, Buffer.from(msg), {persistent: true}); //  ch.sendToQueue(queuename, exchnage_type, message)
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});