Page({
  data: {
    radio:"",
    amount:"",
    wxnumber:'',
    remark:''
  },

  convertType(event) {
    this.setData({
      radio: event.detail,
    });
  },

  onChangeAmount(e) {
    this.setData({
      amount:e.detail
    })
  },
  onChangeWxnumber(e)
  {
    this.setData({
      wxnumber:e.detail
    })
  },
  onChangeReamrk(e){
    this.setData({
      remark:e.detail
    })
  },

  async onPublish()
  {

      this.isEmpty()
      if(!this.isEmpty()) return

      wx.showLoading({
        title: '发布中',
      })

      let {nick_name, avatar_url} = wx.getStorageSync('currentUser')
      let{radio,amount,wxnumber,remark} = this.data
      let data = {
          options:radio,
          amount:amount,
          wxnumber:wxnumber,
          remark:remark,
          author_name:nick_name,
          author_avatar:avatar_url
      }

      await wx.cloud.callFunction({
          name:"addPost",
          data
      }).then(()=>{
          this.setData({amount:"",remark:"",wxnumber:"",radio:""})
          wx.hideLoading()
          wx.switchTab({
            url: '/pages/index/index',
          })
      })
  },

  isEmpty()
  {
      const { radio,amount, wxnumber } = this.data
      if(!radio.trim()) {
          wx.showToast({
            title: '选项不能为空!',
            icon: 'none',
            duration: 1000
          })
          return false
        } else if(!amount.trim()) {
          wx.showToast({
            title: '金额不能为空!',
            icon: 'none',
            duration: 1000
          })
          return false
        }else if(!wxnumber.trim()) {
          wx.showToast({
            title: 'wx号不能为空!',
            icon: 'none',
            duration: 1000
          })
          return false
        }
        return true
  
  }

});