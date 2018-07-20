const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 1,
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'myjdb'
})

/** 
 * 当从 pool 中获取一个 connection 时触发
 * 下面的 pool.getConnection 触发 acquire 事件
 */
pool.on('acquire', connection => {
  console.log('Connection %d acquired', connection.threadId)
})

/** 
 * 当 pool 中创建了一个新的连接时触发
 *   在 acquire 事件之前触发
 *   创建了新连接不一定被马上使用
 */
pool.on('connection', connection => {
  console.log('a new connection %d is made', connection.threadId)
})

/** 
 * 当有 callback 排队等待可用的 connection 时触发
 * 此例中，pool 最大连接数为 1，调用 pool.getConnection() 两次
 *  -> 则第二个 callback 会排队等待第一个 callback release 掉 connection
 * 事件触发顺序：
 *    a callback has been queued
 *    a new connection 36 is made
 *    Connection 36 acquired
 *    query results
 *    Connection 36 acquired
 *    query results
 */
pool.on('enqueue', () => {
  console.log('a callback has been queued')
})

/** 
 * 当有 connection 被 release 时触发
 * 事件触发顺序：
 *    a callback has been queued
 *    a new connection 37 is made
 *    Connection 37 acquired
 *    connection 37 released
 *    query results
 *    Connection 37 acquired
 *    connection 37 released
 *    query results
 */
pool.on('release', connection => {
  console.log('connection %d released', connection.threadId)
})

pool.on('error', error => {
  console.error(error, 'sql failed: ' + error.sql)
})

export default {mysql, pool}
