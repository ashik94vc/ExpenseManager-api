var http = require('http');
var express = require('express');
var path = require('path')
var fs = require('fs')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

mongoose.connect("mongodb://admin:root@ds147995.mlab.com:47995/expensemanager")
var db = mongoose.connection
db.on('error',console.error.bind(console,'connection-error'))
db.once('open',function()
{

});

var expenseSchema = mongoose.Schema({
  moneySpent : Number,
  notes: String,
  timeStamp: String,
  title: String,
})

var Expense = mongoose.model('expense',expenseSchema)
app.use(bodyParser.json())

var port = process.env.PORT || 8080;

app.get('/',function(req,res){
  Expense.find({},function(err,data)
  {
    res.send(data)
  })
})

app.post('/updateExpense/',function(req,res){
  var expense = new Expense(req.body)
  Expense.update({timeStamp: expense.timeStamp},expense,function(err,data){
    if(err) {
      console.log(err)
    }
    else {
      console.log(data)
      Expense.find({},function(err,consolidatedData) {
        res.send(consolidatedData)
      })
    }
  })
})
app.get('/deleteExpense/:timestamp',function(req,res) {
  var timestamp = req.params.timestamp
  Expense.remove({timeStamp: timestamp},function(err){
    if(err) {
      console.log(err)
    }
    else {

      Expense.find({},function(err,data) {
        res.send(data)
      })
    }
  }).exec()
})
app.post('/addExpense',function(req,res){
  console.log(req.body)
  var expense = new Expense(req.body)
  expense.save(function(err,expense)
  {
    res.send(expense)
  })
})
var server = app.listen(port,function(){
  console.log("Listening on port"+port)
})
