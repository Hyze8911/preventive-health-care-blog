const express = require('express')
const app = express.Router()

  const comment = require("../../controllers/comment.controller.js");

  // Create a new comment
  app.post("/comment", (req, res)=>{
    comment.create({
      pid:req.body.cid,
      detail: req.body.detail,
      uid:req.body.uid,
    }).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  });

  // Retrieve all comment
  app.get("/comment", (req, res)=>{
    comment.findAll().then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
   });

  // Retrieve a single comment with commentId
  app.get("/comment/:commentId", (req, res)=>{
    comment.findOne({
      where: { pid: req.params.commentId }
    }).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  });

  // Delete a comment with commentId
  app.delete("/comment/:commentId", (req, res)=>{
    comment.destroy({
      where: { cid: req.params.commentId }
    }).then((data)=>{
      if(data == 1){
        res.status(200).send({message: "Delete success"})
      }else{
        res.status(404).send({message: "Comment not found"})
      }
    }).catch((err)=>{
      res.status(500).send(err)
    })
  });

  // Update a comment with customerId
  app.put("/comment/:commentId", (req, res)=>{
    comment.update({ detail: db.Sequelize.literal('edit') },{
      where: { cid: req.params.userId }
    }).then((data)=>{
      res.status(200).send(data)
    }).catch((err)=>{
      res.status(500).send(err)
    })
  });

  module.exports = app