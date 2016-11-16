/***************************
 * File : server.js
 * Contributors :
 * Florian Bellazouz,
 * Luc Sorignet
 **************************/

var express = require("express");
var app = express();
var fs = require('fs');

var startTime = Date.now();
var subtitleNumber = 1;


app.listen(8080);

app.get("/", function(req,res){
   res.sendFile(__dirname+"/index.html");
});

app.get("/save", function(req,res){
  res.end();
  fs.writeFile(startTime+'.srt', createSubtitle(),{flag:"a"});
});

// ------------------
// - TOOLS FUNCTIONS
// ------------------

/**
 * create a  str subtitle formated string
 * @param  {String} [message="Point d'intérêt"]   [description]
 * @return {[type]}                 [description]
 * export:
 * [subtitle index]
 * [subtitle start time] --> [subtitle end time]
 * [subtitle Max 2 lines]
 * [empty line]
 */
function createSubtitle(message = "Point d'intérêt")
{
  var timestamp =   Date.now() - startTime;
  var tempDebut = new Date(timestamp-3000);
  var tempFin = new Date(timestamp);
  var subtitle = subtitleNumber + "\n"
              + formatDate(tempDebut) + " --> " + formatDate(tempFin) + "\n"
              + message + "\n\n";
   subtitleNumber++;
   return subtitle;
}

/**
 * format a date
 * @param  {[type]} timestamp [description]
 * @return {[type]}           [description]
 */
function formatDate(timestamp){
    var time = new Date(timestamp);
    return formatNumber(time.getHours()-1,2)+":"+formatNumber(time.getMinutes(),2)+":"+formatNumber(time.getSeconds(),2)+","+formatNumber(time.getMilliseconds(),3);
}

/**
 * format a number to a string number with specify nb digits
 * @param  {[type]} number   [description]
 * @param  {[type]} nbDigits [description]
 * @return {[type]}          [description]
 */
function formatNumber(number, nbDigits)
{
    if(nbDigits<=1)
    {
      return "" + number;
    }
    var ref =  Math.pow(10,nbDigits-1);
    if(number < ref)
    {
      return formatNumber("0"+number,nbDigits-1);
    }
    else
    {
      return "" + number;
    }
}
