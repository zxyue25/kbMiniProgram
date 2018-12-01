// pages/class_chat_edit/class_chat_edit.js
var app = getApp();
// var util = require('../../utils/util.js');  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatcontent:"",
    chattime:"",
    classid:"",
    level:"",
    coursename:"",
    texts: "最少10个字",
    min: 10,//最少字数
    max: 100, //最多字数 (根据自己需求改变)
    focus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    var classid = that.options.classid
    var level = that.options.level
    var coursename = that.options.coursename
    that.setData({
      coursename:coursename,
      classid:classid ,
      level:level
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },

  chatInput: function (event) {
    // 获取输入框的内容
    var value = event.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最少字数限制
    if (len < this.data.min)
      this.setData({
        texts: "最少10个字"
      })
    else if (len > this.data.min)
      this.setData({
        chatcontent: event.detail.value.replace(/\s+/g, ''),
        texts: " "
      })

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数 
    });
  },

  returnchat: function (e) {
    var that = this;
    var requestIP = app.globalData.requestIP
    //判断评论是否为空
    if (that.data.chatcontent.length == 0) {
      wx.showToast({
        title: '请输入评论!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    //发请求
    else {
      wx.request({
        url: requestIP + '/user/addDiscuss',
        data: {
          classid: that.data.classid,
          content:that.data.chatcontent,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'userid': app.globalData.userid
        },// 设置请求的 header
        success: function (res) {
          if (res.data.resultCode == "101") {
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000
            })
            wx.navigateBack({
            })
            
          } else {
            console.log("请求失败");
          }
        },
      })
    }
  },
  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },

})