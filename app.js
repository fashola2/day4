const express = require("express")
const app = express()
const mustache = require("mustache-express")
const url = require("url")
const session = require("express-session")
let users = require("./users.js")
const bodyParser = require("body-parser")
app.engine("mustache", mustache())
app.set("view engine", "mustache")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
  extended: false
}))

let sess = {
  secret: "Its a mans world",
  cookie: {},
  saveUninitialized: true,
  resave: true
}
app.use(session(sess))
app.use(function(req, res, next) {
  if (req.path.toLowerCase() !== req.path) {
    var parsedUrl = url.parse(req.originalUrl)
    parsedUrl.pathname = parsedUrl.pathname.toLowerCase()
    res.redirect(url.format(parsedUrl))
  } else {
    next()
  }
})

app.get("/", function(req, res, next) {
  req.session.authorized = false
  res.redirect("/login", )
})
app.get("/login", function(req, res, next) {
  res.render("login")
})

app.post("/authorized", function(req, res) {
      const username = req.body.username
      const password = req.body.username

      let user
      for (var i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password){
          user = user[i]
        }
      } if (user){
      req.session.user = user
      req.session.authorized = true
      res.redirect("/index")
    } else {
      res.redirect("/login", {
        //message: "Bruh you trippin'"
      })
    }
})
    app.get("/index", function(req, res, next) {
      res.render("index")
    })

    app.listen(3000, function() {
      console.log("ok we are listening on port 3000")
    })
