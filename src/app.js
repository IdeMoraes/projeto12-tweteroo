import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const users = [
/*     {
        username: 'bobesponja', 
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info" 
    },
    {
        username: 'patrick', 
        avatar: "https://upload.wikimedia.org/wikipedia/pt/b/b1/Patrick_Estrela.png" 
    },
    {
        username: 'lula', 
        avatar: "https://upload.wikimedia.org/wikipedia/pt/0/0c/Squidward_Tentacles.png" 
    },
    {
        username: 'sirigueijo', 
        avatar: "https://static.wikia.nocookie.net/wikiesponja/images/2/2d/Sr_Sirigueijo_de_Bob_Esponja.png/revision/latest?cb=20170325000158&path-prefix=pt-br" 
    } */
];
const tweets = [
/*     {
        username: "bobesponja",
        tweet: "eu amo o hub"
    },
    {
        username: "bobesponja",
        tweet: "eu sou uma esponja"
    },
    {
        username: "bobesponja",
        tweet: "eu moro num abacaxi"
    },
    {
        username: "patrick",
        tweet: "eu sou uma estrela"
    },
    {
        username: "patrick",
        tweet: "eu moro numa pedra"
    },
    {
        username: "patrick",
        tweet: "eu sou rosa"
    },
    {
        username: "lula",
        tweet: "eu sou uma lula"
    },
    {
        username: "lula",
        tweet: "eu sou rabugento"
    },
    {
        username: "lula",
        tweet: "minha casa é a minha cara"
    },
    {
        username: "sirigueijo",
        tweet: "eu sou um siri"
    },
    {
        username: "sirigueijo",
        tweet: "eu sou pai de uma baleia"
    },
    {
        username: "sirigueijo",
        tweet: "eu sou mão de vaca"
    } */
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

app.listen(5005);