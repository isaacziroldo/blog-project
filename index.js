const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");

const connection = require("./database/database");
const categoriesController = require("./categories/categoriesController");
const articlesController = require("./articles/articlesController");
const usersController = require("./user/userController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./user/user");

//View Engine
app.set("view engine", "ejs");

//Sessions
app.use(session({
  secret: "fjkshafjhnaçfçasj",
  cookie: {
    maxAge: 30000
  }
}))

//Static
app.use(express.static("public"));

//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Database
connection
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso!");
  })
  .catch((error) => {
    console.log(error);
  });

//Routes

app.use("/", categoriesController);

app.use("/", articlesController);

app.use("/", usersController);

app.get('/session', (req,res)=>{
  
})

app.get("/", (req, res) => {
  Article.findAll({
    order: [["id", "DESC"]],
    limit: 4,
  }).then((articles) => {
    Category.findAll().then((categories) => {
      res.render("index", { articles: articles, categories: categories });
    });
  });
});

app.get("/:slug", (req, res) => {
  let slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug,
    },
  })
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          res.render("article", { article: article, categories: categories });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.get("/category/:slug", (req, res) => {
  let slug = req.params.slug;
  Category.findOne({
    where: {
      slug: slug,
    },
    include: [
      {
        model: Article,
      },
    ],
  })
    .then((category) => {
      if (category != undefined) {
        Category.findAll().then((categories) => {
          res.render("index", {
            articles: category.articles,
            categories: categories,
          });
        });
      } else {
        res.redirect("/");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });
});

app.listen(8080, () => {
  console.log("Servidor conectado com sucesso!");
});
