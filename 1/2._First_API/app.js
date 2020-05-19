const app = require("express")(); 
const request = require('request');

app.get("/", (req, res) => {
    res.send({ message: "Hello there" });
});

// define something on the path /aboutMe that returns a JSON representation of you

app.get("/aboutMe", (req, res) => {
    const me = {
        name: "Radu"
    };
    res.send(me);
});

// define something on the path /aboutThisWebsite 
// that returns a JSON representation of the website
app.get("/aboutThisWebsite", (req, res) => {
    const aboutThisWebsite = {
        name: "thiswebsiteIdunno"
    };
    //if (aboutThisWebsite) {
        res.send(aboutThisWebsite);
    // }
    // res.send("Sorry, no info about this website.");
    // this here won't run
});

const weekdays = ["Sunday", "Monday", "Tuesday", 
                "Wednesday", "Thursday", "Friday", "Saturday"];

app.get("/time", (req, res) => {
    const date = new Date();

    res.send({ 
        date: date.toLocaleTimeString(),
        hour: date.getHours(),
        weekday: weekdays[date.getDay()],
        anotherWeekday: date.toLocaleString("en-us", { weekday: "long" })
    });
});

app.get("/testroute", (req, res) => {
    if (true) {
        return res.send({ message: "Inside the if" });
    }
    return res.send({ message: "Outside the if" });
});

app.get("/user/:id", (req, res) => {
    console.log(req.params);
    return res.send({ id: req.params.id });
});

app.get("/search", (req, res) => {
    return res.send(req.query);
});



app.get("/google", (req, res) => {
    request('http://www.google.com', (error, response, body) => {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        return res.send(body);
      });    
})

app.get("/documentation", (req, res) => {
    console.log(__dirname);
    //return res.redirect("/documentationtwo");
   return res.sendFile(__dirname + "/public/documentation.html");
});

app.get("/documentationtwo", (req, res) => {
    console.log(__dirname);
    return res.sendFile(__dirname + "/public/documentationtwo.html");
});


app.listen(3000, error => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", 3000);
});
