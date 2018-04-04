const express= require('express')
const bodyParser= require('body-parser')
const massive= require('massive');
const cors= require('cors')
require('dotenv').config();

const port = 5050
const app = express();

app.use(bodyParser.json());
app.use( cors());

app.listen( port, () => console.log('listening on port', port))