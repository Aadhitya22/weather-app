const bodyParser = require("body-parser");
const exp = require("constants");
const express = require("express");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const city = req.body.cityName;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=994ae7e8779f19bd1d1f3081f9384668&units=metric";
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const description = weatherData.weather[0].description;
      const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.set("Content-Type", "text/html");
      res.write(
        "<body style='background-color: rgb(182, 222, 235);text-align: center; margin:3rem;'"
      );
      res.write("<p>Hello!</p>");
      res.write(
        "<p style='margin: 1rem;'>The weather is currently " +
          description +
          "</p>"
      );
      res.write("<img src=" + imgUrl + ">");
      res.write(
        "<h1 style='margin: 2rem;'>The temperature in " +
          city +
          " is " +
          temp +
          " degrees Celsius</h1>"
      );

      res.send();
    });
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is up and running");
});
