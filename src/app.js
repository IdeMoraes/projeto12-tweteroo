import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [
];
const tweets = [
];

app.post('/sign-up', (req, res) => {
    const user = req.body;
    if(!user.username || !user.avatar){
        return res.status(400).send(`Todos os campos são obrigatórios!`);
    }
    users.push(user);
    res.status(201).send("OK");
});

app.post('/tweets', (req, res) => {
    const tweet = req.body;
    if(!tweet.username || !tweet.tweet){
        return res.status(400).send(`Todos os campos são obrigatórios!`);
    }
    tweets.push(tweet);
    res.status(201).send("OK");
});

app.get('/tweets', (req, res) => {
    const answer = [];
    let i=0;
    if(tweets.length>=10){
        i = tweets.length-10
    }
    for (i; i<tweets.length; i++){
        answer.push({
            username: tweets[i].username,
            avatar: `${users.filter((user)=>user.username===tweets[i].username)[0].avatar}`,
            tweet: tweets[i].tweet
        });
    }
    res.send(answer);
});

app.get('/tweets/:username', (req, res) => {
    const username = req.params.username;
    const user = users.find((element) => element.username === username);
    if (user === undefined){
        return res.send(`Usuário não encontrado`);
    }
    const avatar = user.avatar;
    const filteredTweets = tweets.filter((element) => element.username === username);
    for (let i=0; i<filteredTweets.length;i++){
        filteredTweets[i].avatar = avatar;
    }
    res.send(filteredTweets);
});

app.listen(5005);