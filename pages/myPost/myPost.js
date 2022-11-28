import { getdate } from '../../utils/date'


const db = wx.cloud.database()
const post = db.collection('Post')


Page({
	data:{
		postlist:[]
	},



	onLoad(){
		this.getPostList()
	},


	async getPostList(){
		
		let data ={
			id:wx.getStorage("currentUser")._openid

		};

		let { result } = await wx.cloud.callFunction({
			name: 'getPostList',
			data
		  })

		result.data?.forEach(item => item.publish_date = getdate(item.publish_date))

		let postList = result.data.length ? result.data : []


		this.setData({ postList })
		

	},

	
	 onDelete(event){
		 //console.log(event.currentTarget)
		
		wx.showModal({
		  title:"提示",
		  content:"确定删除该帖子吗？",
		  showCancel:true
		}).then(async res=>{
		  if(res.confirm)
		  {
			
			let postid = event.currentTarget.id
			let data = {postid}
			await wx.cloud.callFunction({
				name:"deletePost",
				data
				
			}).then(()=>{
				wx.reLaunch({
				  url: '/pages/myPost/myPost',
				})
			})
		  }
		})
		  
	  }


})