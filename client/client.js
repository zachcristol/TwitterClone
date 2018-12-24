const form = document.querySelector("form");
const reload = document.getElementById('reload');
const debug = document.getElementById('debug');
const loader = document.querySelector(".loader");
const API_URL = "http://localhost:5000/";
loader.style.display = "none";

getAllTweets();


function getAllTweets() {
    fetch(API_URL + 'tweets', {
            method: 'GET',
        }).then(response => response.json())
        .then(json => {
            json.forEach(element => {
                var tweet = {
                    name: element.name,
                    content: element.content
                };
                createCard(tweet);
            });
        })
        .catch(err => {
            console.log('some ting wong', err);
        })
}

// Tweet form submission
form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevents page reload

    // Make tweet from form
    var formData = new FormData(form);
    var newTweet = {
        name: formData.get("name"),
        content: formData.get("content")
    };

    // Form and loader display
    loader.style.display = "";
    form.style.display = "none";

    // Post tweet
    fetch(API_URL + 'tweet', {
            method: "POST",
            body: JSON.stringify(newTweet),
            headers: {
                "content-type": "application/json"
            }
        }).then(response => response.json())
        .then(createdTweet => {
            form.reset();
            loader.style.display = "none";
            form.style.display = "";
            document.body.append(createdTweet.name);
        })
});


debug.addEventListener('click', (event) => {
    var tweet = {
        name: 'zach',
        content: 'hello there'
    };

    console.log(tweet);
    // document.body.append(JSON.stringify(tweet));



    createCard(tweet);



});

function createCard(tweet) {

    // console.log(tweet.name);


    var card = document.createElement("div");
    card.className = 'card';

    var nameNode = document.createElement('h3');
    var nameText = document.createTextNode(tweet.name);
    nameNode.appendChild(nameText);
    card.appendChild(nameNode);

    var contentNode = document.createElement('p');
    var contentText = document.createTextNode(tweet.content);
    contentNode.appendChild(contentText);
    card.appendChild(contentNode);




    // var content = document.createElement('p');
    // name.createTextNode(tweet.content);

    // card.appendChild(name);
    // card.appendChild(content);



    document.body.appendChild(card);


}