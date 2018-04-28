// pages/welcome/welcome.js
Page({

  clickLogo:function(){
    wx.reLaunch({
      url: '../index/index'
    });
    wx.showToast({
      title: 'loading',
      icon: 'loading',
      duration: 300
    })
  },

  onShareAppMessage: function () {
    return {
      title: '',
      desc: '',
      success: function (res) {
        wx.showToast({
          title: "分享成功",
          duration: 1000,
          icon: "success"
        })
      }
    }
  }
})