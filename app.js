const express = require("express")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")


const app = express()

app.use(bodyParser.json())

const PORT = 4000
const secret_key = "mysecretkey123"

const users = [
    {id: 1, username: "admin", password: "1234"},
    {id: 2, username: "user", password: "abcd"}
]

app.post("/login", (req, res) => {
    const {username, password} = req.body

    const user = users.find(
        u => u.username === username  && u.password === password
    )

    if(!user){
        return res.status(401).json( {message: "Invalid Credentials"})
    }

    const token = jwt.sign(
        {id: user.id, username: user.username},
        secret_key,
        {expiresIn: "1h"}
    )

    res.json({token})
})

function verifyToken (req, res, next){
    const header = req.headers["authorization"]

    if(!header)
        return res.status(403).json({message: "Token missing"})

    const token = header.split(" ")[1]

    jwt.verify(token, secret_key, (err, decoded) => {
        if (err) return res.status(401).json({message: "Invalid token"})

        req.user = decoded
        next()
    })
}

app.get("/dashboard", verifyToken, (req, res) =>{
    res.json({
        message: "welcome to dashboard",
        user: req.user
    })
})


app.listen(PORT, () => {
    console.log(`Server security running on port ${PORT}`)
})

