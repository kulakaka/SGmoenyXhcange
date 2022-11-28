// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  let sort = {publish_date:-1}
  let type1 = {options:'SGD-RMB'}
  let type2 = {options:'RMB-SGD'}
  let screen ={status:0}
 //const skip = event.pageSize * (event.pageIndex -1)


 //get RmbToSgdList
 if(event.type===1){
  try{
    let postList = await db.collection('Post').
    aggregate().match(screen).match(type1).sort(sort)
    // .skip(skip)
    // .limit(event.pageSize)
    .end()

    return {
      code: 0,
      data: postList.list,
      success: true
    }
  }
  catch(err){
    console.error('transaction error')
  console.error(err)
  return {
    code: 1,
    success: false
  }
  }
}
//get SgdToRmbList

if(event.type===0){
  try{
    let postList = await db.collection('Post').
    aggregate().match(screen).match(type2).sort(sort)
    // .skip(skip)
    // .limit(event.pageSize)
    .end()

    return {
      code: 0,
      data: postList.list,
      success: true
    }
  }
  catch(err){
    console.error('transaction error')
    console.error(err)
  return {
    code: 1,
    success: false
  }
  }
}


//get my post
if(event.id) screen._openid = event.id
try{
  let postList = await db.collection('Post').aggregate().match(screen).end()

  return {
    code:0,
    data:postList.list,
    success:true
  }
}
catch(err) {
  console.error('transaction error')
  return {
    code: 1,
    success: false
  }
}
}