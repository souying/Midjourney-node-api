require('dotenv').config();
const { Midjourney } = require("../libs");
const NUMBER = process.env.NUMBER;
const { v4: uuidv4 } = require('uuid');
const db = require('../models/data').taskList;
const temTaskDb = require('../models/data').temtask;
(async function(){
  await temTaskDb.remove();
})
const md5 = require('md5');

const apiUrl = 'http://api.fanyi.baidu.com/api/trans/vip/translate';
const appid = process.env.baiduAPPID;
const secret = process.env.baiduSECRET;

function isChinese(str) {
  const reg = /^[\u4E00-\u9FA5]+$/;
  return reg.test(str);
}

// 添加一个任务
async function addTask(action, prompt, taskId, index, state, notifyHook) {
  let task;
  const qs = prompt;
  let requestTranslate;
  if(appid&&secret){
    if (isChinese(qs)) {
      console.log("中转英")
      requestTranslate = (q) => {
        const salt = Math.random();
        const sign = md5(appid + q + salt + secret);
        const params = {
          q,
          from: 'zh',
          to: 'en',
          salt,
          appid,
          sign,
        };
        const query = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');
        return fetch(`${apiUrl}?${query}`).then(res => res.json());
      };
      const v = await requestTranslate(qs);
      task = {
        "_id": uuidv4(),
        "index": index,
        "action": action,
        "prompt": v.trans_result[0].src,
        "promptEn": v.trans_result[0].dst,
        "taskId": taskId ? taskId : "",
        "uri": "",
        "hash": "",
        "content": v.trans_result[0].dst,
        "progress": "",
        "description": "/imagine " + v.trans_result[0].dst,
        "submitTime": "",
        "finishTime": "",
        "creationTime": Date.now(),
        "state": state,
        "notifyHook": notifyHook,
        "imageUrl": "",
        "status": "NOT_START"
      };
      await db.insert(task);
      return task;
    } else {
      console.log("英转中")
      requestTranslate = (q) => {
        const salt = Math.random();
        const sign = md5(appid + q + salt + secret);
        const params = {
          q,
          from: 'en',
          to: 'zh',
          salt,
          appid,
          sign,
        };
        const query = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');
        return fetch(`${apiUrl}?${query}`).then(res => res.json());
      };
      const v = await requestTranslate(qs);
      task = {
        "_id": uuidv4(),
        "index": index ? index : "",
        "action": action,
        "prompt": v.trans_result[0].dst,
        "promptEn": v.trans_result[0].src,
        "taskId": taskId ? taskId : "",
        "uri": "",
        "hash": "",
        "content": v.trans_result[0].src,
        "progress": "",
        "description": "/imagine " + v.trans_result[0].src,
        "submitTime": "",
        "finishTime": "",
        "creationTime": Date.now(),
        "state": state ? state : "",
        "notifyHook": notifyHook ? notifyHook : "",
        "imageUrl": "",
        "status": "NOT_START"
      };
      await db.insert(task);
      return task;
    }
  }else{
    task = {
      "_id": uuidv4(),
      "index": index ? index : "",
      "action": action,
      "prompt": prompt,
      "promptEn": prompt,
      "taskId": taskId ? taskId : "",
      "uri": "",
      "hash": "",
      "content": "",
      "progress": "",
      "description": "/imagine " + v.trans_result[0].src,
      "submitTime": "",
      "finishTime": "",
      "creationTime": Date.now(),
      "state": state ? state : "",
      "notifyHook": notifyHook ? notifyHook : "",
      "imageUrl": "",
      "status": "NOT_START"
    };
    await db.insert(task);
    return task;
  }
  
}

// 查询任务列表的方法，插入到临时队列
async function findTask() {
  let taskList = await db.find({ 'status': 'NOT_START' });
  let taskLists = taskList.sort((a, b) => b.creationTime - a.creationTime);
  let temTaskData = await temTaskDb.find({ 'status': 'IN_PROGRESS' });
  console.log(`排队数:${taskLists.length}`);
  console.log(`正在执行任务数:${temTaskData.length}`);
  console.log(`队列空闲位置:${NUMBER - temTaskData.length}位`);
  for (let i = 0; i < Math.min(taskLists.length, NUMBER - temTaskData.length); i++) {
    let item = await temTaskDb.findOne({ '_id': taskLists[i]._id });
    if (!item) {
      console.log(`准备执行任务${taskLists[i]._id}`);
      await temTaskDb.insert(taskLists[i]);
    }
  }
}

// 定时器，每2秒检测是否有新任务，有则执行任务
setInterval(async () => {
  try {
    console.log("正在监听新任务，时间戳：", Date.now());
    await findTask();
    await startTask();
  } catch (error) {
    console.log("执行任务出错：", error);
    await temTaskDb.remove();
  }
}, 2000);

async function main(id,context) {
  const client = new Midjourney(
    process.env.SERVER_ID,
    process.env.CHANNEL_ID,
    process.env.SALAI_TOKEN,
    false
  );
  const msg = await client.Imagine(context + "--niji", id, (uri) => {
    console.log("loading", uri);
  });
  return msg;
}

// 根据一张图变形
async function main_v(id, _id, index) {
  let data = await db.findOne({ _id: id });
  // console.log(data)
  if (data && data.status != "SUCCESS") {
    return { code: 0 };
  }
  const client = new Midjourney(
    process.env.SERVER_ID,
    process.env.CHANNEL_ID,
    process.env.SALAI_TOKEN,
    false
  );
  const msg = await client.Variation(
    data.content,
    _id,
    index,
    data.taskId,
    data.hash,
    (uri) => {
      console.log("loading", uri);
    });
  return msg;
}

// 获取大图
async function main_u(id, _id, index) {
  let data = await db.findOne({ _id: id })
  if (data && data.status != "SUCCESS") {
    return { code: 0 };
  }
  const client = new Midjourney(
    process.env.SERVER_ID,
    process.env.CHANNEL_ID,
    process.env.SALAI_TOKEN,
    true
  );
  const msg = await client.Upscale(
    data.content,
    _id,
    index,
    data.taskId,
    data.hash,
    (uri) => {
      console.log("loading", uri);
    });
  return msg;
}

// 运行任务

async function startTask(){
  let temTaskData = await temTaskDb.find();

  if(temTaskData){
    let notStartedTasks = temTaskData.filter(task => task.status === 'NOT_START');

    for(let i = 0;i<notStartedTasks.length;i++){
      console.log("类型:"+notStartedTasks[i].action)
      console.log("开始启动"+notStartedTasks[i]._id+"任务")
      let msg;
      let param = {
        "submitTime":Date.now(),
        "status": "IN_PROGRESS"
      }
      try {
        if(notStartedTasks[i].action==="IMAGINE"){
          await Promise.all([
            db.update({_id:notStartedTasks[i]._id},{ $set: param }),
            temTaskDb.update({_id:notStartedTasks[i]._id},{ $set: param })
          ]);
          msg = await main(notStartedTasks[i]._id,notStartedTasks[i].promptEn)
        }else if(notStartedTasks[i].action==="UPSCALE"){
          await Promise.all([
            db.update({_id:notStartedTasks[i]._id},{ $set: param }),
            temTaskDb.update({_id:notStartedTasks[i]._id},{ $set: param })
          ]);
          msg = await main_u(notStartedTasks[i].taskId,notStartedTasks[i]._id,notStartedTasks[i].index)
        }else if(notStartedTasks[i].action==="VARIATION"){
          await Promise.all([
            db.update({_id:notStartedTasks[i]._id},{ $set: param }),
            temTaskDb.update({_id:notStartedTasks[i]._id},{ $set: param })
          ]);
          msg = await main_v(notStartedTasks[i].taskId,notStartedTasks[i]._id,notStartedTasks[i].index)
        }
        if(msg.code===0){
          let param = {
            "finishTime":Date.now(),
            "status":"FAILURE",
          }
          await db.update({_id:notStartedTasks[i]._id},{ $set: param });
          console.log(notStartedTasks[i]._id+"任务失败")
          await temTaskDb.remove({id:msg._id}); //完成任务删除临时
          let data = await db.findOne({_id:notStartedTasks[i]._id})
          // 回调地址
          if(data.notifyHook){
            fetch(data.notifyHook, {
              method: 'POST',
              body: JSON.stringify(data),
              headers: { 'Content-Type': 'application/json' }
            })
              .then(response => response.text())
              .then(data => console.log(data))
              .catch(error => console.error(error));
              }
        }else if(msg.code===1){
          let param = {
            "finishTime":Date.now(),
            "status":"SUCCESS",
            taskId: msg.id,
            uri: msg.uri,
            imageUrl:msg.uri,
            hash: msg.hash,
            content: msg.content,
            progress: msg.progress
          }
          await db.update({_id:msg._id},{ $set: param });
          console.log(msg._id+"任务成功")
          await temTaskDb.remove({_id:msg._id}); //完成任务删除临时
          let data = await db.findOne({_id:msg._id})
          // 回调地址
          if(data.notifyHook){
            fetch(data.notifyHook, {
              method: 'POST',
              body: JSON.stringify(data),
              headers: { 'Content-Type': 'application/json' }
            })
              .then(response => response.text())
              .then(data => console.log(data))
              .catch(error => console.error(error));
              }
        }
      } catch (error) {
        let param = {
          "finishTime":Date.now(),
          "status":"FAILURE",
        }
        await db.update({_id:notStartedTasks[i]._id},{ $set: param });
        console.log(notStartedTasks[i]._id+"任务失败")
        await temTaskDb.remove({_id:notStartedTasks[i]._id}); //报错删除临时
        let data = await db.findOne({_id:notStartedTasks[i]._id})
          // 回调地址
          if(data.notifyHook){
            fetch(data.notifyHook, {
              method: 'POST',
              body: JSON.stringify(data),
              headers: { 'Content-Type': 'application/json' }
            })
              .then(response => response.text())
              .then(data => console.log(data))
              .catch(error => console.error(error));
              }
      }

    }
  }
}






module.exports = {
  addTask
}