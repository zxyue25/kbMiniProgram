const { $Message } = require('../../dist/base/index');
var interval = null //倒计时函数
var app = getApp();
var requestIP = app.globalData.requestIP;
Page({
  data: {
    auth:"none",
    courseList:null,
    username: '',
    tel: '',
    primarytel:'',
    authcode: '',
    time: '获取验证码', //倒计时 
    currentTime: 60,//限制60s
    isClick: false,//获取验证码按钮，默认允许点击
    visible5: false,
    actions5: [
      {
        name: '取消'
      },
      {
        name: '确认报名',
        color: '#ed3f14',
        loading: false
      }
    ]
  },

  handleOpen5() {
    var that = this;
    that.setData({
      visible5: true
    });
  },

  handleClick5({ detail }) {
    var that = this;

    if (detail.index === 0) {
      that.setData({
        visible5: false
      });
    } else {
    /*//判断手机号是否正确
      let that = this;
      var requestIP = app.globalData.requestIP
      //第一步：验证手机号码
      var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;// 判断手机号码的正则
      console.log("手机号" + that.data.tel);
      if (that.data.tel.length == 0) {
        wx.showToast({
          title: '请填写正确的手机号码!',
          icon: 'none',
          duration: 1000
        })
        return false;
      }

      else if (!myreg.test(that.data.tel)) {
        wx.showToast({
          title: '请填写正确的手机号码!',
          icon: 'none',
          duration: 1000
        })
        return false;
      }
    //判断验证码是否正确*/

    that.pay();
    
    }
  },
  //发起支付
  pay:function(e){
    var that = this;
    const action = [...that.data.actions5];
    action[1].loading = true;

    that.setData({
      actions5: action
    });

    setTimeout(() => {
      action[1].loading = false;
      that.setData({
        visible5: false,
        actions5: action
      });
      $Message({
        content: '报名成功！',
        type: 'success'
      });
    }, 2000);
    //
   /* wx.requestPayment({
     timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res) {

      },
      fail(res) {
        var that = this;
        const action = [...that.data.actions5];
        action[1].loading = true;

        that.setData({
          actions5: action
        });

        setTimeout(() => {
          action[1].loading = false;
          that.setData({
            visible5: false,
            actions5: action
          });
          $Message({
            content: '报名失败！',
            type: 'success'
          });
        }, 2000);
      }
    })*/
  },

  onLoad: function (options) {
    var that = this;
    var classid = options.classid;
    that.setData({
      classid: classid
    })
    console.log(classid);
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
          console.log(res.data)
          that.setData({
            courseList: res.data.data
          });
        }
      },
      fail(res) {
      }
    })
    that.getMyInfo();
  },

  getMyInfo:function(e){
    var that = this;
    wx.request({
      url: requestIP + '/user/getMyInfo',
      data: {
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'userid': app.globalData.userid
      },
      success(res) {
        console.log("获取个人信息" + res.data.resultCode)
        if (res.data.resultCode == '101') {
          that.setData({
            username: res.data.data.name,
            primarytel: res.data.data.username,
            tel: res.data.data.username
          });
        }
      }
    })
  },

  //获取用户名
  usernameInput: function (event) {
    this.setData({ username: event.detail.value })
  },

  //获取手机号码
  telInput: function (e) {
    var that = this;
    console.log(e.detail.value);
    console.log(that.data.primarytel);
    if (e.detail.value == that.data.primarytel) {
      that.setData({
        auth: "none"
      });
    }
    else {
      that.setData({
        auth: "block"
      });
    }
    that.setData({ tel: e.detail.value })
  },

  //获取验证码
  authcodeInput: function (event) {
    this.setData({ authcode: event.detail.value })
  },


  //验证
  gainAuthCodeAction: function () {
    let that = this;
    var requestIP = app.globalData.requestIP
    //第一步：验证手机号码
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;// 判断手机号码的正则
    console.log("手机号" + that.data.tel);
    if (that.data.tel.length == 0) {
      wx.showToast({
        title: '请填写正确的手机号码!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    else if (!myreg.test(that.data.tel)) {
      wx.showToast({
        title: '请填写正确的手机号码!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    wx.request({
      url: requestIP + '/student/sendCode',
      data: {
        phone: that.data.tel,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userid': app.globalData.userid
      },// 设置请求的 header
      success: function (res) {
        if (res.data.resultCode == "101") {
          console.log(res.data.data);
        } else {
          console.log("请求失败");
        }
      },
    })  

    //第二步：设置计时器
    // 先禁止获取验证码按钮的点击
    that.setData({
      isClick: true,
    })
    //60s倒计时 setInterval功能用于循环，常常用于播放动画，或者时间显示
    var currentTime = that.data.currentTime;
    interval = setInterval(function () {
      currentTime--;//减
      that.setData({
        time: currentTime + '秒后获取'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 60,
          isClick: false
        })
      }
    }, 1000);
  },

  //报名
  signUp: function (e) {

    let that = this;

    if (that.data.username.length == 0)
    {
      wx.showToast({
        title: '请填写姓名!',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    that.setData({
      visible5:true
    });
  }
});