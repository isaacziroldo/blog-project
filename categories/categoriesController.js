const express = require("express");
const router = express.Router();
const Category = require('./Category')
const slugify = require('slugify')

router.get("/categories", (req, res) => {
  res.send("ROTAS DE CATEGORIAS");
});

router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new");
});

router.get("/categories/save", (req, res) => {
  let title = req.body.title;
  if(titlle != undefined){
    Category.create({
      title: title,
      slug:slugify(title)
    })

  } else{
    res.redirect('/admin/categories/new')
  }
});

module.exports = router;
