const app = getApp()
Page({
  data: {
    showModal2: false,
    showModal3: true,
    showModal4: false,
    showModal5: false,count:0
  },
  onLoad: function () {
    this.daojishi();//一进来就拍照倒计时

    this.ctx = wx.createCameraContext()//创建摄像头对象
  },
  daojishi: function () {
    var that = this;
    if (!that.data.counting) {
      //开始倒计时2秒
      this.countDown(that, 2);
    }
  },
  
  
  camera:function(){
      var that=this;
    var ctx = wx.createCameraContext()
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal5: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm:function(){
    wx.navigateTo({
      url: '../end/end'
    })
  },
  onCancel1: function () {
    wx.navigateTo({
      url: '../photoprompt/photoprompt'
    })
  },
  onCancel2: function () {
    wx.navigateTo({
      url: '../photoprompt/photoprompt'
    })
  },
  onConfirm1: function () {
    wx.navigateTo({
      url: '../wait/wait'
    })
  },
  countDown:function(that, count) {
    if (count == 0) {
      that.ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          console.log(res);
          that.setData({
            src: res.tempImagePath[0]
          })
          console.log(res.tempImagePath);
          const id = app.globalData.systemObj
          wx.uploadFile({
            url: `https://wx.kamtewog.com/fapi/information/${id}/compare`,
            filePath: res.tempImagePath,
            method: 'POST',
            name: 'photo',
            success: function (res) {
              console.log(res)
              const data = JSON.parse(res.data);
              if (data.code == 0) {
                console.log(data.code)
                that.setData({
                  showModal3: false,
                  showModal4: true,
                })
              } else {
                that.setData({
                  showModal3: false,
                  showModal2: true,
                  msg:data.msg
                })
              }
            }
          })
        }
      })

      that.setData({
        counting: false
      })
      return;
    }
    setTimeout(function () {
    }, 1000)
    that.setData({
      counting: true,
    })
    setTimeout(function () {
      count--;
      that.countDown(that, count);
    }, 1000);
  }
})


