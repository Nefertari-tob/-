const app = getApp();
Page({
  data: {
    photo:""
  },
  onLoad() {
    console.log(app)
  },

  accessdenied: function() {
    wx.redirectTo({
      url: '../index/index'
    })
  },
  chooseimage: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function(res) {
        var path = res.tempFilePaths[0]
        console.log(res)
        that.setData({
          photo: path,
        })
        const id = app.globalData.systemObj
        wx.uploadFile({
          url: `https://wx.kamtewog.com/fapi/information/${id}/upload`,
          filePath: path,
          method: 'POST',
          name: 'photo',
          success: function (res) {
            var data = JSON.parse(res.data)
            app.globalData.systemcode = data.code;
            var co = app.globalData.systemcode
            console.log(co)
            
            console.log(data)
            if(data.code==0){
              wx.showToast({
                title: '图片上传成功 请进行下一步',
                icon: 'none',
                duration: 2000
              })

            }else{
              wx.showModal({
                title: data.msg,
                content: '请重新上传',
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    that.setData({
                      photo: '',
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                    wx.navigateTo({
                      url: '../index/index'
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  agreetovisit: function() {
    const co = app.globalData.systemcode
    console.log(co)
    if(co==0){
      wx.navigateTo({
        url: '../wait/wait'
      })
    }else if(co==-1){
      wx.showToast({
        title: '请上传合格的照片',
        icon: 'none',
        duration: 2000   
      })
    }
    else{
      wx.showToast({
        title: '请上传照片',
        icon: 'none',
        duration: 2000
      })
    }
        
      }
})