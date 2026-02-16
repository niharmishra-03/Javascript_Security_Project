var express = require ("express")
var app = express()
app.get('/', function(req, resp){
    resp.send("Welcome to the rest API")
})

app.listen(9000, () => console.log("API started listening"))
