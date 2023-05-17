# Midjourney-node-api
Midjourney-api,nodejs,非官方api

## 全局公共参数
#### 全局Header参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 全局Query参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 全局Body参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 全局认证方式
```text
noauth
```
#### 全局预执行脚本
```javascript
暂无预执行脚本
```
#### 全局后执行脚本
```javascript
暂无后执行脚本
```
## /mj绘图相关api
```text
暂无描述
```
#### Header参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### Query参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### Body参数
参数名 | 示例值 | 参数描述
--- | --- | ---
暂无参数
#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
## /mj绘图相关api/提交绘画任务get
```text
暂无描述
```
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
#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
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
暂无描述
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
#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
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
暂无描述
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
#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
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
暂无描述
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
#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
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

#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
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

#### 请求方式
> GET

#### Content-Type
> form-data

#### 认证方式
```text
noauth
```
#### 预执行脚本
```javascript
暂无预执行脚本
```
#### 后执行脚本
```javascript
暂无后执行脚本
```
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
