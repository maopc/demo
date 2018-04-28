App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
  },

  globalData: {
    changeCity:'0',
    defaultCity: '',
    defaultCounty: '',
    weatherData: '',
    air: '',
    day: '',
    g_isPlayingMusic: false,
    g_currentMusicPostId: null,
    doubanBase: "https://douban.uieee.com",
    heWeatherBase: "https://free-api.heweather.com",
    
    xinwenBase:"https://api.xinwen.cn/news/all",
    xinwenSecretKeyValue:"171d4b128c734755b358b69b03572d9c",
    xinwenAccessKeyValue:"CpH82uqbgbKDmS8T",

    tencentMapKey: "OXTBZ-UIZE6-BKGSZ-MO7H2-UN3DJ-MOBWP",
    heWeatherKey: "3c9596086a1e466d970ff68859064a14",
    curBook: ""
  }

})
