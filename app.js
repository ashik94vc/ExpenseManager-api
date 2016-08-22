var http = require('http');
var express = require('express');
var path = require('path')
var fs = require('fs')
var app = express()
var bodyParser = require('body-parser')

var port = process.env.PORT || 8080;
app.post('/addExpense',function(req,res){
  console.log(req.body)
})
var server = app.listen(port,function(){
  console.log("Listening on port"+port)
})
