const app = getApp()
Page({
  data: {
      name:"",
      idCard:"",
      systemId:"",
  }, 

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  

  onLoad: function (options) {
    
   var that=this;
      wx.request({
        url: 'https://wx.kamtewog.com/fapi/system/list',

        method:"GET",
        header:{
          'content-type':'application/json'
        },
        success(res) {
          console.log(res.data);
          that.setData({array:res.data.data}); 

        },
        
      })
      
  },

  nameInput:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  idInput:function(e){
    this.setData({
      idCard:e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log(e)
    var index = e.detail.value;
    var systemId = this.data.array[index].id;
    console.log(systemId);
    this.setData({
      index: e.detail.value,
      systemId
    })
  },
  accessdenied:function(){
    
    var that=this;
    var name=this.data.name;
    var idCard = this.data.idCard;
    // var dataid=this.data.array[index];
    var data={
      name:name,
      idCard: idCard,
      systemId: this.data.systemId,
    };
    var url ="https://wx.kamtewog.com/fapi/information/login";
    wx.request({
      url: url,
      method:'POST',
      data:data,
      header:{
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success(res){
        if(res.data.code==100){
          wx.showModal({
            title: res.data.msg,
            content: '请重新输入',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
                wx.navigateTo({
                  url: '../upload/upload'
                })
              }
            }
          })
        }else{
          console.log(res.data);
          app.globalData.systemObj = res.data.data.id;
          app.globalData.systemval = res.data.data.validated;
          var val = app.globalData.systemval
          if (val == true) {
            wx.showModal({
              title: '您的信息已经采集成功',
              content: '是否重新采集',
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
          } else {
            wx.navigateTo({
              url: '../photoprompt/photoprompt'
            })
          }
        } 
      }
    })
  }
})