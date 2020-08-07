const app = getApp();
Page({
  data: {
    photo:""
  },
  onLoad() {

    console.log(app)
  },

  accessdenied: function() {
    wx.navigateTo({
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
          url: `http://192.168.1.121:8800/information/${id}/upload`,
          filePath: path,
          method: 'POST',
          name: 'photo',
          success: function (res) {
            var data = JSON.parse(res.data)
            console.log(data)
            if(data.code==0){
              wx.showToast({
                title: '图片上传成功',
                icon: 'none',
                duration: 20000
              })

            }else{
              wx.showModal({
                title: data.msg,
                content: '请重新上传',
                success(res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                    wx.navigateTo({
                      url: '../photoprompt/photoprompt'
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
        wx.navigateTo({
          url: '../wait/wait'
        })
      }
})