const express = require('express');
const unirest = require('unirest');

const app = express();
const port = process.env.PORT || 3000;

var message_id = 0;

var from = '12013898384';

var messages = ['Where are you today?', 'How are you feeling today?', 'Are you traveling anywhere today?']

function sendSms(id, to, from){
    unirest.post('https://nexmo-nexmo-messaging-v1.p.mashape.com/send-sms?from=' + from + '&to=' + to + '&text=' + messages[id])
        .header('X-Mashape-Key', '**********************************')
        .header('X-Mashape-Host', 'nexmo-nexmo-messaging-v1.p.mashape.com')
        .header('Content-Type', 'application/x-www-form-urlencoded')
        .end(function (result) {
            console.log(messages[id]);
            
        });
}

app.post('/sms', (req, res) => {
    // res.send({ message: 'Hello From My App' });

    let to = req.query.to;

    message_id = 0;

    if(to === undefined){
        res.status(400);
        res.send('Missing Parameters');
    } else {
        sendSms(message_id, to, from);
        res.send({ message: 'Message Sent' });
    }
});

app.get('/inbound-sms', (req, res) => {
    // onsole.log(req.query);
    console.log(req.query.text)
    res.status(204).send()
    message_id += 1;
    if (message_id > 2) {

    } else {
        sendSms(message_id, req.query.msisdn, from);
    }
})

app.listen(port, () => console.log(`Listening on port ${port}`));