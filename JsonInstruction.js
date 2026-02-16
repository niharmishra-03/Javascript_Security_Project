const express = require ( "express" )
const app = express()

app.use(express.json())

let users = [
    { id: 1, name: "Ali", age: 25},
    { id: 2, name: "Sara", age: 22},
]

app.post("/users", (req, res) => {
    const newUser = {
        id: users.length +1,
        name: req. body. name,
        age: req. body. age
    }

    users.push(newUser)
    res.send(newUser)
} )

app.get("/users", (req, res) => {
    res.send(users)
})

app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id == req. params. id)

    if (!user) return res.status(404).send("User not found")

    res.send(user)
    
})

app.put("/users/:id", (req, res) => {
    const user = users.find(u => u.id == req.params. id )

    if (!user) return res.status(404).send("User not found")

    user.name = req.body. name
    user. age = req. body. age

    res. send(user)
})

app.delete("/users/:id", (req, res) => {
    users = users.filter( u => u.id != req.params.id)
    res. send("user deleted")
})

app. listen(3000, () => {
    console. log ("Server running on port 3000")
})