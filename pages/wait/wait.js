const app = getApp()
Page({
  data: {
    showModal1: false,
    showModal2: false,
    showModal3: true,
    showModal4: false,
    showModal5: false
  },
  onLoad: function () {
    this.daojishi();//一进来就拍照倒计时

    this.ctx = wx.createCameraContext()//创建摄像头对象
  },
  daojishi: function () {
    var that = this;
    if (!that.data.counting) {
      //开始倒计时2秒
      countDown(that, 2);
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
  onConfirm: function () {
    this.hideModal();
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
})
function countDown(that, count) {
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
          url: `http://192.168.1.121:8800/information/${id}/compare`,
          filePath: res.tempImagePath,
          method: 'POST',
          name: 'photo',
          success: function (res) {
            console.log(res)
            var that = this
            if(res.data.code==0){
              console.log(res.data.code)
              that.setdata({
                showModal4: true
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
    countDown(that, count);
  }, 1000);
}


