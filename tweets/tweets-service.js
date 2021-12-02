const dao = require(`./tweets-dao`)

const tweetDefault = {
    "topic": "Life",
    "userName": "Jose Annunziato",
    "verified": false,
    "handle": "jannunzi",
    "time": "2h",
    "avatar-image": "https://pbs.twimg.com/profile_images/983184059428827137/319qpRm4_400x400.jpg",
    "logo-image": "https://pbs.twimg.com/profile_images/983184059428827137/319qpRm4_400x400.jpg",
    "stats": {
        "comments": 0,
        "retweets": 0,
        "likes": 0
    },
};

module.exports = (app) => {

    const findAllTweets = (req, res) => {
        console.log("GETTING THEM")
        dao.findAllTweets()
            .then(tweets => res.json(tweets.reverse()));
    }


    const postNewTweet = (req, res) =>
        dao.createTweet({...tweetDefault, ...req.body })
        .then((instertedTweet) => res.json(instertedTweet))

    const deleteTweet = (req, res) =>
        dao.deleteTweet(req.params.id)
        .then((status) => res.sen(status));

    const likeTweet = (req, res) =>
        dao.findTweetById(req.params.id)
        .then(tweet => {
            if (tweet.liked === true) {
                tweet.liked = false;
                tweet.stats.likes--;
            } else {
                tweet.liked = true;
                tweet.stats.likes++;
            }
            dao.updateTweet(tweet._id, tweet)
                .then(status => res.send(status));
        })


    app.get('/api/tweets', findAllTweets);
    app.post('/api/tweets', postNewTweet);
    app.delete('/api/tweets/:id', deleteTweet);
    app.put('/api/tweets/:id/like', likeTweet);
};