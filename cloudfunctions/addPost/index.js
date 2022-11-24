// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    try{
        let{amount,options,remark,wxnumber,author_name,author_avatar}=event

        let post ={
            _openid:cloud.getWXContext().OPENID,
            author_name,
            author_avatar,
            amount,
            options,
            wxnumber,
            remark,
            publish_date:new Date(),
            status:0
        }

        db.collection('Post').add({data:post})

        return {
            code: 0,
            success: true
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