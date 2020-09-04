  const express = require('express')
  const app = express.Router()
  const db = require('../../models/db')
  const post = db.post

  // Create a new Post
  app.post("/post", (req, res)=>{
    post.create({
      uid:req.body.uid,
      title: req.body.title,
      tex:req.body.tex,
      rank: req.body.rank,
      tag:req.body.tag
    }).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  });

  // Retrieve all Post
 app.get("/post", (req, res)=>{
  post.findAll().then((data)=>{
    res.status(200).send(data)
  }).catch((err)=>{
    res.status(500).send(err)
  })
 });
 

  // Retrieve a single Post with PostId
  app.get("/post/:postId", (req, res)=>{
    post.findOne({
      where: { pid: req.params.postId }
    }).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  });

  // Delete a Post with PostId
  app.delete("/post/:postId",(req, res)=>{
    post.destroy({
      where: { pid: req.params.postId }
    }).then((data)=>{
      if(data == 1){
        res.status(200).send({message: "Delete success"})
      }else{
        res.status(404).send({message: "Post not found"})
      }
    }).catch((err)=>{
      res.status(500).send(err)
    })
  } );

  // Update a Post with customerId 
  app.put("/post/:postId", (req, res)=>{
    post.update({ rank: db.Sequelize.literal('rank + 1') },{
      where: { pid: req.params.postId }
    }).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  });

  module.exports = app