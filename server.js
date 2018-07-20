const yargs=require('yargs');
const requests=require('request');
//var express=require('express');
//var app=express();
// app.get('/',(req,res)=>{
// 	res.send('<h1>Welcome to the server</h1>')
// })

// app.listen(3000,()=>{
// 	console.log('server is up and running ');
// })

var argv=yargs
			.options(
			{
				a : {
					demand : true,
					describe : 'Address to fetch weather',
					string : true
				}
			})
			.help()
			.alias('help','h')//this is to convert h to help even when h is entered
			.argv;

//console.log(argv);
var aa="AIzaSyB_2du6csFfUgpZoGiqhETl3XMx-91lGD8";
//note the slanting quote below
var aadr=encodeURIComponent(argv.a);
var url=`https://maps.googleapis.com/maps/api/geocode/json?address=${aadr} &key=${aa}` 	 
var lat;
var lon;


requests({
	url:url,
	json:true
},(error,response,body)=> {

	//console.log(body);
if(body.status==="OK")
{
	 lat=body.results[0].geometry.location.lat;
	 lon=body.results[0].geometry.location.lng;
	console.log(lat+" "+lon);	
	var _url=`https://api.darksky.net/forecast/7c5d7a4dc12a580455061442b8ed8c3f/${lat},${lon}`

	requests({
		url:_url,
		json:true
	},(errorr,responsee,bodyy)=> {

      var temp=bodyy.currently.temperature;
      console.log(temp);

      })
}

})



//console.log(url);
