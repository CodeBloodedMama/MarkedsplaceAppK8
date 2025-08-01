const express = require('express');
const router = express.Router();
var amqp = require('amqplib/callback_api');

const rabbitmqConfig = {
    protocol: 'amqp',
    //hostname: 'rabbit-server', // local host name
    hostname: '10.42.8.24', // remote cluster host name
    username: 'guest',
    password: 'guest',
    port: 5672,
    vhost: '/',
    authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL'],
};

// Home page route
router.get('/', async (req, res) => {
    req.session.sellerId = req.query.sellerId;
    req.session.user_id = req.query.user_id;
    req.session.user_displayName = req.query.user_displayName;
    res.render('index');
});

// GET - Product details
router.post('/sendMessage', async (req, res) => {
    sendMessage(req.session.sellerId, req.session.user_id, req.session.user_displayName, req.body.msgContent);
});

router.get('/getMessage', async (req, res) => {
    consumeMessages(req.session.user_id, req.session.sellerId, (messages) => {
        res.send(messages);
    });
});

function sendMessage(qname, msgType, displayName, msgContent){
    amqp.connect(rabbitmqConfig, function(error0, connection) {
        if (error0) {
            throw error0;
        }

        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            channel.assertQueue(qname, {
                durable: false
            });
            
            const timestamp = new Date().toLocaleString(undefined, {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'});
            // Construct the message object with type and content
            const message = {
                type: msgType,
                timestamp: timestamp,
                displayName: displayName,
                msgContent: msgContent
            };

            // Send message to queue
            channel.sendToQueue(qname, Buffer.from(JSON.stringify(message)));

            console.log(" [x] Sent %s", JSON.stringify(message));

            setTimeout(function() {
                connection.close();
            }, 500);
        });
    });
}

function consumeMessages(qname, msgType, callback) {
    let messages = [];

    amqp.connect(rabbitmqConfig, function(error0, connection) {
        if (error0) {
            throw error0;
        }

        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            channel.assertQueue(qname, {
                durable: false
            });

            channel.consume(qname, function(msg) {
                if (msg !== null) {
                    const message = JSON.parse(msg.content.toString());
                    if (message.type === msgType) {
                        console.log(" [x] Received %s", JSON.stringify(message));
                        messages.push(message);
                        channel.ack(msg);
                    }
                }
            });

            setTimeout(function() {
                connection.close();
                callback(messages);
            }, 500);
        });
    });
}

module.exports = router;