const amqp = require('amqplib/callback_api');
// create connection
amqp.connect('amqp://localhost', function(error, connection) {
    if (error) {
        throw error;
    }
    //create channel
    connection.createChannel(function(error, channel) {
        if (error) {
            throw error;
        }

        let queue = 'hello';
        let msg = process.argv.slice(2).join(' ') || "Hello World!"
        console.log(process.argv.slice(2), "process.argv.slice(2)");
        console.log(process.argv.slice(2).join(' '), "process.argv.slice(2).join(' ')");
        // create/assert queue
        channel.assertQueue(queue, {
            durable: true
        });
        // sending msg to queue
        channel.sendToQueue(queue, Buffer.from(msg),{
            persistent: true
        });

        console.log(`sent ${msg}`  );
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
