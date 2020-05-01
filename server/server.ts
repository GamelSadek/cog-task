import express = require('express');
import dotEnv = require('dotenv');
import bodyParser from 'body-parser';
import Route from './route';
import cors = require('cors');
import { connection } from './database/util';
const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

dotEnv.config();

app.use(express.json());
connection();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
app.use('/', Route)