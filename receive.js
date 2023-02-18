const amqp =require('amqplib/callback_api');

// create connection
amqp.connect('amqp://localhost', function(error, connection) {
  if (error) {
    throw error;
  }
  // create channel
  connection.createChannel(function(error, channel) {
    if (error) {
      throw error;
    }
    let queue = 'hello';

    // create/assert queue
    channel.assertQueue(queue, {
      durable: true
    });

    channel.prefetch(1);
    console.log(` Waiting for messages in the    ${queue} queue`  );


    channel.consume(queue, function(msg) {
        let secs = msg.content.toString().split('.').length - 1;
        console.log(msg.content.toString().split('.').length, "msg.content.toString().split('.').length");
        console.log(msg.content.toString().split('.'), "msg.content.toString().split('.')");
        console.log(msg,"msg");
        console.log(msg.content, "msg.content");
        console.log(msg.content.toString(), "msg.content.toString()");
        console.log(" Received ", msg.content.toString());
        // setTimeout(function() {
            console.log(" Done");
          // }, secs * 1000);
    }, {
      // automatic acknowledgment mode,
        // noAck: true
      // manual acknowledgment mode
        noAck: false
    });
  });
});