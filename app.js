const express = require("express");
const https  = require("https");
const BodyParser = require('body-parser'); 
const app = express();



app.use(BodyParser.urlencoded({extended : true}));
// app.use(express.urlencoded({extended:true}));
app.get("/",function(req,res)
{
    res.sendFile(__dirname + "/index.html");

   

    });

    app.post("/weatherapp", function(req, res){
    console.log(req.body.cityName);
    
        console.log("post request recieved.");
        const query=req.body.cityName;

        const url = "https://api.openweathermap.org/data/2.5/weather?lat=28.61&lon=77.80&appid=adbe6e3d42ac878df6c5c5fca189b128&units=metric&q="+query;
        https.get(url, function(response){
            console.log(response.statusCode);
    if(response.statusCode!=404)
    {

    
            response.on("data",function(data)
            {
                // it returns hexadecimal console.log(data);
            
           const weatherData = JSON.parse(data);
           console.log(weatherData);
           const temp =weatherData.main.temp;
           const feellike = weatherData.main.feels_like;
           const icon = weatherData.weather[0].icon;
           const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
    //     console.log(temp);
    //     console.log(feellike);
    // console.log(icon);
    
    
        res.write("<h1>The temperature in "+query+" is " + temp + " degree celcius</h1>");
        res.write("<h3>but it feels like " + feellike + "</h3>"); 
        res.write("<img src="+imageURL+">");
        res.send();
        });
      }});
    
    });


 








app.listen(3000,function(){
    console.log("Server is running at port : 3000");
});
