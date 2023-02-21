const express = require('express');
const index= new express();


const port = process.env.PORT || 5000;
index.use(express.json());


index.post('/messages', (req, res) => {
    let routingkey = req.body.logtype; 
    let message = req.body.message;
    let dateTime = req.body.dateTime;

//     res.send();
// })









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
        let exchange = 'logs';

        channel.assertExchange(exchange, 'fanout', {
            durable: true
          });



        const details = {
            logtype: routingkey,
            message : message,
            dateTime: dateTime
        }
        channel.publish(exchange, routingkey, Buffer.from(JSON.stringify(details)),{
            persistent: true 
        });
        console.log(`sent ${routingkey} log is sent to exchange ${exchange} details: ${details}`  );
    });
    // setTimeout(function() {
        // connection.close();
        // process.exit(0);
    // }, 500);
});


res.send();
})









index.listen(port, function() {
    console.log(`listening on ${port}`)
})