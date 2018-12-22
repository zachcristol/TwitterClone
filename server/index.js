const express = require("express");
const app = express();
const cors = require("cors")
app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    var thing = {
        name: "zach",
        age: "21"
    };
    res.send(thing);
});

function isValidTweet(tweet) {
    return tweet.name && tweet.name.toString().trim != "" &&
        tweet.content && tweet.content.toString().trim != "";
}

app.post("/tweet", (req, res) => {
    console.log("hello");
    
    if (isValidTweet(req)) {
        const tweet = {
            name: req.body.name.toString(),
            content: req.body.content.toString()
        }
        console.log("got tweet");
        
        // insert in db
    } else {
        res.status(422);
        res.json({
            message: "Name and content are required."
        });
    }
    console.log(req.body);

});

app.listen(5000, () => {
    console.log("listining on http://localhost:5000");
    
})