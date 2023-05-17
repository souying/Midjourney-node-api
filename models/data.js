const taskList = require('../common/db')('./basedata/tasklist.db');
const temtask = require('../common/db')('./basedata/temtask.db');
module.exports = {
    taskList,
    temtask
}