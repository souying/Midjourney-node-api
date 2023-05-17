# Midjourney-node-api

代理 MidJourney 的discord频道，实现api形式调用AI绘图  

前端大佬感兴趣的快速提pr, 本人不是专业后端,代码不保证无bug    

## 现有功能
- [x] 支持 Imagine、U、V 指令，绘图完成后回调  
- [x] 支持队列执行  
- [x] 支持中文 prompt 翻译，需配置百度翻译
- [x] 队列任务存储在本地小型数据库  

## 后续计划
- [ ] 定时清空所有任务  
- [ ] 账号池子（暂定）
- [ ] 看情况优化 
- [ ] docker安装方式 

## 使用前提
1. 科学上网
2. node环境 node 18版本以上
3. 注册 MidJourney，创建自己的频道，参考 https://docs.midjourney.com/docs/quick-start

## 快速启动
1.确保服务器已经有node环境18以上    
2.拉取代码   
```
git clone https://github.com/erictik/midjourney-api.git
cd midjourney-api
```
3.下载依赖  
```
yarn
# or npm
npm install
```
4.项目跟目录下新建 .env 文件 参考.env.example  

5.启动项目 启动后访问127.0.0.1：3000    
```
npm start   
```
6.在线接口文档 https://docs.apipost.cn/preview/c1f3039454fb9e67/02235e4d4590d910?target_id=78d9eb39-d6f9-4ee5-b2fa-82ff6b15678e    

7.端口修改/bin/www  3000改成其他  

## API接口说明  

#### 接口状态
> 已完成

#### 接口URL
> http://127.0.0.1:3000/api/v1/trigger/submit?action=IMAGINE&prompt=一只狗&taskId=123456789&index=1&state=main&notifyHook=http://www.baidu.com

#### 请求方式
> GET

#### Content-Type
> urlencoded

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
action | IMAGINE | String | 是 | 动作: 必传，IMAGINE（绘图）、UPSCALE（选中放大）、VARIATION（选中变换）
prompt | 一只狗 | String | 是 | 绘图参数: IMAGINE时必传
taskId | 123456789 | String | 是 | 任务ID: UPSCALE、VARIATION时必传
index | 1 | String | 是 | 图序号: 1～4，UPSCALE、VARIATION时必传，表示第几张图
state | main | String | 是 | 自定义字符串: 非必传，供回调到业务系统里使用
notifyHook | http://www.baidu.com | String | 是 | 支持每个任务配置不同回调地址，非必传
#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
action | IMAGINE | - | 是 | 动作: 必传，IMAGINE（绘图）、UPSCALE（选中放大）、VARIATION（选中变换）
prompt | 一只狗 | - | 是 | 绘图参数: IMAGINE时必传
taskId | 123456789 | - | 是 | 任务ID: UPSCALE、VARIATION时必传
index | 1 | - | 是 | 图序号: 1～4，UPSCALE、VARIATION时必传，表示第几张图
state | main | - | 是 | 自定义字符串: 非必传，供回调到业务系统里使用
notifyHook | http://www.baidu.com | - | 是 | 支持每个任务配置不同回调地址，非必传  

#### 成功响应示例
```javascript
{
	"code": 1,
	"description": "成功",
	"result": "1234679"
}
```
#### 错误响应示例
```javascript
{
	"code": 0,
	"description": "失败"
}
```
## /mj绘图相关api/提交绘画任务post
```text
提交任务，后台持续执行任务，成功或者失败后更改任务状态
```
#### 接口状态
> 已完成

#### 接口URL
> http://127.0.0.1:3000/api/v1/trigger/submit

#### 请求方式
> POST

#### Content-Type
> urlencoded

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
action | IMAGINE | String | 是 | 动作: 必传，IMAGINE（绘图）、UPSCALE（选中放大）、VARIATION（选中变换）
prompt | 一只狗 | String | 是 | 绘图参数: IMAGINE时必传
taskId | 123456789 | String | 是 | 任务ID: UPSCALE、VARIATION时必传
index | 1 | String | 是 | 图序号: 1～4，UPSCALE、VARIATION时必传，表示第几张图
state | main | String | 是 | 自定义字符串: 非必传，供回调到业务系统里使用
notifyHook | http://www.baidu.com | String | 是 | 支持每个任务配置不同回调地址，非必传
#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
action | IMAGINE | - | 是 | 动作: 必传，IMAGINE（绘图）、UPSCALE（选中放大）、VARIATION（选中变换）
prompt | 一只狗 | - | 是 | 绘图参数: IMAGINE时必传
taskId | 123456789 | - | 是 | 任务ID: UPSCALE、VARIATION时必传
index | 1 | - | 是 | 图序号: 1～4，UPSCALE、VARIATION时必传，表示第几张图
state | main | - | 是 | 自定义字符串: 非必传，供回调到业务系统里使用
notifyHook | http://www.baidu.com | - | 是 | 支持每个任务配置不同回调地址，非必传


#### 成功响应示例
```javascript
{
	"code": 1,
	"description": "成功",
	"result": "1234679"
}
```
#### 错误响应示例
```javascript
{
	"code": 0,
	"description": "失败"
}
```
## /mj绘图相关api/查询单个任务get
```text
查询任务完成情况
```
#### 接口状态
> 已完成

#### 接口URL
> http://127.0.0.1:3000/api/v1//task/fetch?_id=8a2c5959-143b-46c5-adb6-242652ac8141

#### 请求方式
> GET

#### Content-Type
> form-data

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
_id | 8a2c5959-143b-46c5-adb6-242652ac8141 | String | 是 | 任务id
#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
_id | 8a2c5959-143b-46c5-adb6-242652ac8141 | - | 是 | 任务id

#### 成功响应示例
```javascript
{
	"_id": "8a2c5959-143b-46c5-adb6-242652ac8141",
	"index": "1",
	"action": "VARIATION",
	"prompt": "一只狗",
	"promptEn": "A dog",
	"taskId": "1108302168013938689",
	"uri": "f61e-4eac-9991-475799668483.png",
	"hash": "adbd1ba4-f61e-4eac-9991-475799668483",
	"content": "A dog--niji --seed 5587",
	"progress": "done",
	"description": "/imagine A dog",
	"submitTime": 1684310738264,
	"finishTime": 1684310741027,
	"state": "main",
	"notifyHook": "http://www.baidu.com",
	"imageUrl": "adbd1ba4-f61e-4eac-9991-475799668483.png",
	"status": "SUCCESS"
}
```
#### 错误响应示例
```javascript
{
    code:0
}
```
## /mj绘图相关api/查询单个任务post
```text
查询全部任务
```
#### 接口状态
> 已完成

#### 接口URL
> http://127.0.0.1:3000/api/v1//task/fetch?_id=8a2c5959-143b-46c5-adb6-242652ac8141

#### 请求方式
> POST

#### Content-Type
> form-data

#### 请求Query参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
_id | 8a2c5959-143b-46c5-adb6-242652ac8141 | String | 是 | 任务id
#### 请求Body参数
参数名 | 示例值 | 参数类型 | 是否必填 | 参数描述
--- | --- | --- | --- | ---
_id | 8a2c5959-143b-46c5-adb6-242652ac8141 | - | 是 | 任务id

#### 成功响应示例
```javascript
{
	"_id": "8a2c5959-143b-46c5-adb6-242652ac8141",
	"index": "1",
	"action": "VARIATION",
	"prompt": "一只狗",
	"promptEn": "A dog",
	"taskId": "1108302168013938689",
	"uri": "f61e-4eac-9991-475799668483.png",
	"hash": "adbd1ba4-f61e-4eac-9991-475799668483",
	"content": "A dog--niji --seed 5587",
	"progress": "done",
	"description": "/imagine A dog",
	"submitTime": 1684310738264,
	"finishTime": 1684310741027,
	"state": "main",
	"notifyHook": "http://www.baidu.com",
	"imageUrl": "adbd1ba4-f61e-4eac-9991-475799668483.png",
	"status": "SUCCESS"
}
```
#### 错误响应示例
```javascript
{
    code:0
}
```
## /mj绘图相关api/查询任务列表post
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> http://127.0.0.1:3000/api/v1//task/list

#### 请求方式
> POST

#### Content-Type
> form-data


#### 成功响应示例
```javascript
[
	{
		"_id": "8a2c5959-143b-46c5-adb6-242652ac8141",
		"index": "1",
		"action": "VARIATION",
		"prompt": "一只狗",
		"promptEn": "A dog",
		"taskId": "1108302168013938689",
		"uri": "f61e-4eac-9991-475799668483.png",
		"hash": "adbd1ba4-f61e-4eac-9991-475799668483",
		"content": "A dog--niji --seed 5587",
		"progress": "done",
		"description": "/imagine A dog",
		"submitTime": 1684310738264,
		"finishTime": 1684310741027,
		"state": "main",
		"notifyHook": "http://www.baidu.com",
		"imageUrl": "adbd1ba4-f61e-4eac-9991-475799668483.png",
		"status": "SUCCESS"
	}
]
```
#### 错误响应示例
```javascript
{
    code:0
}
```
## /mj绘图相关api/查询任务列表get
```text
暂无描述
```
#### 接口状态
> 已完成

#### 接口URL
> http://127.0.0.1:3000/api/v1//task/list

#### 成功响应示例
```javascript
[{
	"_id": "8a2c5959-143b-46c5-adb6-242652ac8141",
	"index": "1",
	"action": "VARIATION",
	"prompt": "一只狗",
	"promptEn": "A dog",
	"taskId": "1108302168013938689",
	"uri": "f61e-4eac-9991-475799668483.png",
	"hash": "adbd1ba4-f61e-4eac-9991-475799668483",
	"content": "A dog--niji --seed 5587",
	"progress": "done",
	"description": "/imagine A dog",
	"submitTime": 1684310738264,
	"finishTime": 1684310741027,
	"state": "main",
	"notifyHook": "http://www.baidu.com",
	"imageUrl": "adbd1ba4-f61e-4eac-9991-475799668483.png",
	"status": "SUCCESS"
}]
```
#### 错误响应示例
```javascript
{
    code:0
}
```
