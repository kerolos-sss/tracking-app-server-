import './global.d.impel'
import './models/User'
import './models/Track'
 
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routs/authRouter'
import bodyParser from 'body-parser'
import requireAuth from './middleware/requireAuth';

const mongoUri = 'mongodb+srv://admin:passwordpassword@cluster0.qq7lq.gcp.mongodb.net/test?retryWrites=true&w=majority&authSource=admin';
mongoose.set('useUnifiedTopology', true)
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    ssl: true,
    useUnifiedTopology: true,
    // authSource: "admin",
    // replicaSet: "cluster0",
    // useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connected")
});


const port = 3007
const app = express();

app.use(bodyParser.json())

app.use(authRouter)


app.get('/', requireAuth, (req, res) => {
    res.send((req.user as any)?.email)
});

app.listen(port, () => {
    console.log("Listening on port: " + port)
})




// mongoose.connection.on('connected', () => {
//     console.log("mongo db is connected");
// });



// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://admin:passwordpassword@cluster0.qq7lq.gcp.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object

//   console.log("count:",  collection.find())
//   client.close();
// });
