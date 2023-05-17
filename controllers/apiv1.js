const api = {}
require("dotenv").config();
const {addTask}= require('../common/task-queue');
const db = require('../models/data').taskList;
api.submit = async function(req,res){
  if(req.body.action){
    const { action, prompt,taskId,index,state,notifyHook} = req.body;
    // console.log('POST参数:', action, prompt,taskId,index,state,notifyHook);
    let taskItem = await addTask(action, prompt,taskId,index,state,notifyHook)
    res.status(200).json({
        "code": 1,
        "description": "成功",
        "result": taskItem._id
      });
  }else{
    const { action, prompt,taskId,index,state,notifyHook } = req.query;
    // console.log('Get参数:', action, prompt,taskId,index,state,notifyHook);
    let taskItem = await addTask(action, prompt,taskId,index,state,notifyHook)
    res.status(200).json({
        "code": 1,
        "description": "成功",
        "result": taskItem._id
      });
  }
}


api.fetch = async function(req,res){
  if(req.body.id){
    const { _id} = req.body;
    
    let data = await db.findOne({_id:_id})
    if(data){
      res.status(200).json(data);
    }else{
      res.status(400).json({
        code:0
      });
    }
  }else{
    const { _id} = req.query;
    
    let data = await db.findOne({_id:_id})
    if(data){
      res.status(200).json(data);
    }else{
      res.status(400).json({
        code:0
      });
    }
  }
}

api.list = async function(req,res){
    
    let data = await db.find()
    if(data){
      res.status(200).json(data);
    }else{
      res.status(400).json({
        code:0
      });
    }
}


module.exports =  api