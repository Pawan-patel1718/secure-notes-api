let express = require("express")
const user_route = require("./routes/users")
const notes_route = require("./routes/notes")
const cors = require("cors");
const dotenv = require('dotenv');

let app = express();


app.use(cors({
    origin: "*"
}))


// Set up Global configuration access
dotenv.config();

let PORT = process.env.PORT || 8000;

app.use(express.json());


app.get("/", (req, res) => {
    res.json({ status: true })
})

// All Api Routes 
app.use("/api/user", user_route)

app.use(function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    } else {
        req.authToken = req.headers.authorization.split(' ')[1];
    }
    next();
});

app.use("/api/notes", notes_route)


app.listen(PORT, () => {
    console.log("App is listening on port " + PORT)
})