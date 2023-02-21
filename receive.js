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
    let exchange = 'logs';
    let queue = 'hello';

    // create/assert queue
    // channel.assertQueue(queue, {
    //   durable: true
    // });

    channel.assertExchange(exchange, 'fanout', {
      // durable: false
      durable: true
    });

    const queuechannel = channel.assertQueue('queue', {
      exclusive: true
    }, function(error, q) {
      if (error) {
        throw error;
      }
    })


    // channel.prefetch(1);
    console.log(` Waiting for messages in the    ${queue} queue`  );
    channel.bindQueue(queue, exchange, 'info');

    // channel.consume(queue, function(msg) 
    channel.consume(queue, function(msg)
    {
        // let secs = msg.content.toString().split('.').length - 1;
        const details = JSON.parse(msg.content);
        // console.log(msg,"msg");
        // console.log(msg.content, "msg.content");
        // console.log(msg.content.toString(), "msg.content.toString()");
        // console.log(" Received ", msg.content.toString());
        // setTimeout(function() {
            console.log(" Done");
            console.log(details);
          // }, secs * 1000);
    }, {
      // automatic acknowledgment mode,
        // noAck: true
      // manual acknowledgment mode
        noAck: false
    });
  });
})
// });