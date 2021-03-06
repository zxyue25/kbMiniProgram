// pages/class_des/class_des.js
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({
  data:{
    phoneNumber: app.globalData.ad_telephone,
    classid:null,
    coursename:""
  },
  GOclass_signUp:function(e)
  {
    var that = this;
    var classid = that.data.classid;
    wx.navigateTo({
      url: '../class_signUp/class_signUp?classid='+classid,
    })
  },
  call:function(e){
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phoneNumber,
    })
  },
  //获取手机号码
  telInput: function (event) {
    this.setData({ tel: event.detail.value })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    //模拟加载    
    setTimeout(function () {      // complete      
      wx.hideNavigationBarLoading() //完成停止加载      
      wx.stopPullDownRefresh() //停止下拉刷新   
    }, 1500);
  var that = this;
  that.getClassInfo();
  },

  onShareAppMessage: function (ops) {
    var that = this
    var coursename = that.data.coursename
    var classid = that.data.classid
    var nickname = app.globalData.nickName
    var shareStatus = app.globalData.userstatus
    return {
      title: nickname + '给你分享了' + coursename + '课程，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
      path: '/pages/class_des_signUp/class_des_signUp?shareStatus=' + shareStatus
    }
  },

  onLoad: function (options) {
    var that = this;
    if (wx.getStorageSync("classid")) {
      var classid = wx.getStorageSync("classid");
    } else if (that.options.classid) {
      var classid = that.options.classid;
    }
    that.setData({
      classid:classid
    })
  that.getClassInfo();
  },
  
  getClassInfo: function () {
    var that = this;
    var classid = that.data.classid;
    wx.request({
      url: requestIP + '/student/getClassInfo',
      data: {
        classid: classid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        if (res.data.resultCode == '101') {
          that.setData({
            courseList: res.data.data,
            phoneNumber: res.data.data.hotline,
            coursename: res.data.data.coursename,
          });
        }
      },
      fail(res) {
      }
    })
  }
})