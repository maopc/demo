var app = getApp();
var util = require('../../utils/util.js');
Page({

  data: {
    newsList:[],
    topNews: [],
    newsType: 'guoji',
    selsectState: [1, 0, 0, 0, 0],
    showMore: '0'
  },

  onLoad: function (options) {
    var date = Date.parse(new Date());
    console.log(date);
    var that = this;
    var signature = util.hexMD5(app.globalData.xinwenSecretKeyValue + date + app.globalData.xinwenAccessKeyValue);
    console.log(signature);
    // 访问头条新闻
    wx.request({
      url: app.globalData.xinwenBase, 
      data: {
        'size':15,
        'category':'Society',
        'signature': signature,
        'timestamp': date,
        "access_key": app.globalData.xinwenAccessKeyValue,
        'region':'江苏'
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        console.log(res.data)
        if(res.data.success !=true){
          console.log('获取失败');
          return;
        }
        for (var i = 0; i < res.data.data.news.length;i++){
          var tmp = res.data.data.news[i];
          var time = tmp.gmt_publish;
         // console.log(time);
          var date = new Date(time);
          var Y = date.getFullYear() + '年';
          var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
          var D = date.getDate() + '日';
          var h = date.getHours() + '时';
          var m = date.getMinutes() + '分';
          //console.log(M + D + h + m);
          tmp.gmt_publish =M+D+h+m;
        }
        this.setData({
          'newsList': res.data.data.news
        })
      }
      //success: function (res) {
      //  console.log(res);
      //  if (res.data.login_status == '0') {
      //    that.setData({
      //      topNews: res.data.result.data
      //    })
      //  } else {
      //    console.log('获取失败');
      //  }
      //}
    })
  },
  showMore: function (){
    if(this.data.showMore=='0'){
      this.setData({
        showMore: '1'
      })
    } else if (this.data.showMore == '1'){
      this.setData({
        showMore: '0'
      })
    }
    
  },
  //数据受限没有详情信息，给用户一个提示就好
  bindViewTap: function (event) {
    wx.showModal({
      title: '提示',
      content: '实时更新，但因为免费接口资源受限，新闻详情请访问官方网站哈😘',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: "谢谢支持",
            duration: 1000,
            icon: "success"
          })
        } else if (res.cancel) {
          wx.showToast({
            title: "🙄🙄🙄",
            duration: 1000,
            icon: "success"
          })
        }
      }
    })
  },

  clickNation: function () {
    this.setData({
      newsType: 'guoji',
      selsectState: [1, 0, 0, 0, 0]
    })
    this.getNews();
  },
  clickSport: function () {
    this.setData({
      newsType: 'tiyu',
      selsectState: [0, 1, 0, 0, 0]
    })
    this.getNews();
  },
  clickScience: function () {
    this.setData({
      newsType: 'keji',
      selsectState: [0, 0, 1, 0, 0]
    })
    this.getNews();
  },
  clickHappy: function () {
    this.setData({
      newsType: 'yule',
      selsectState: [0, 0, 0, 1, 0]
    })
    this.getNews();
  },
  clickFinance: function () {
    this.setData({
      newsType: 'caijing',
      selsectState: [0, 0, 0, 0, 1]
    })
    this.getNews();
  },

  getNews: function () {
    var that = this
    // 访问聚合数据的网络接口-头条新闻
    wx.request({
      url: app.globalData.juhetoutiaoBase,
      data: {
        type: this.data.newsType,
        key: app.globalData.juhetoutiaoKey
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data.error_code == 0) {
          that.setData({
            topNews: res.data.result.data
          })
        } else {
          console.log('获取失败');
        }
      }
    })
  },

  onShareAppMessage: function () {
    return {
      title: '热点新闻30条~',
      desc: '分享个小程序，希望你喜欢☺️~',
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