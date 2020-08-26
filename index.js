const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const categoriesController = require("./categories/categoriesController");
const articlesController = require("./articles/articlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

//View Engine
app.set("view engine", "ejs");

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

app.get("/", (req, res) => {
  Article.findAll({
    order: [
      ['id', 'DESC']
    ]
  }).then((articles) => {
    res.render("index", { articles: articles });
  });
});

app.get("/:slug", (req, res) => {
  let slug = req.params.slug;
  Article.findOne({
    where: {
      slug: slug,
    },
  }).then(article=>{
    if(article !=undefined){
      res.render('article', {article: article})
    }else {
      res.redirect('/')
    }
  }).catch(err =>{
    res.redirect('/')
  })
});

app.listen(8080, () => {
  console.log("Servidor conectado com sucesso!");
});
