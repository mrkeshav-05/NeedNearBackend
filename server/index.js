import express from 'express';
import app from 'express';


app.get('/', function(req, res)) {
  res.send('Hello World!');
}

export {app}