const express = require('express');
const app = express();
const spHandle = require('./spotifyHandler');
const bkHandle = require('./booksHandler');
const { insertDB, findDB} = require('./cloudConn')


findDB();

