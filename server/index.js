const express = require('express');
const app = express();
const cors = require('cors')
const monk = require('monk')
const db = monk('localhost/tweet')

const tweets = db.get('tweet');


app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {
    var thing = {
        name: 'zach',
        age: '21'
    };
});

app.post('/tweet', (req, res) => {
    if (isValidTweet(req)) {
        const tweet = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        }
        // insert in db
        tweets
            .insert(tweet)
            .then(createdTweet => res.json(createdTweet))
    } else {
        res.status(422);
        res.json({
            message: 'Name and content are required.'
        });
    }
});

app.get('/tweets', (req, res) => {
    tweets
        .find()
        .then(tweets => {
            res.json(tweets);
        })
});

function isValidTweet(req) {
    return req.body.name && req.body.name.toString().trim != '' &&
        req.body.content && req.body.content.toString().trim != '';
}


app.listen(5000, () => {
    console.log('listining on http://localhost:5000');
})