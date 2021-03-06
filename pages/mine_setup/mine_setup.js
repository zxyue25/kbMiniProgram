// pages/mine_setup/mine_setup.js
var app = getApp();
var requestIP = app.globalData.requestIP
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
    avatarUrl:"",
    tel:"",
    newpassword: "",
    oldpassword: "",
    newpassword2: "",
    hiddenmodalput: true,
    showModal: false,
    userstatus:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that = this;
    wx.getStorage({
      key: "user",
      success(res) {
        that.setData({
          tel: res.data.tel,          
          avatarUrl: wx.getStorageSync('avatarUrl'),
          userstatus: res.data.userstatus,
        })
        if (res.data.userstatus == 3) 
        {
          that.setData({
            nickName: wx.getStorageSync('nickName')
          })
        }
        else{
          that.setData({
            nickName: res.data.name,
          })
        }
      }
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
  onShareAppMessage: function () {
    var that = this
    var nickname = app.globalData.nickName
    var shareStatus = app.globalData.userstatus
    return {
      title: nickname + '给你分享了"快乐课堂"，快打开看看吧',
      desc: '交友学习欢迎加入',
      imageUrl: '/image/onshare.png',
      path: '/pages/mine_setup/mine_setup?shareStatus=' + shareStatus
    }
  },

  //获取旧密码
  oldpasswordInput: function (event) {
    this.setData({ oldpassword: event.detail.value.replace(/\s+/g, '') })
  },

  //获取密码
  passwordInput: function (event) {
    this.setData({ newpassword: event.detail.value.replace(/\s+/g, '') })
  },

  //获取确认密码
  passwordInput2: function (event) {
    this.setData({ newpassword2: event.detail.value.replace(/\s+/g, '') })
  },

/**   * 弹窗   */  
showDialogBtn: function () { 
  this.setData({ showModal: true }) 
},  

/**   * 弹出框蒙层截断touchmove事件   */  
preventTouchMove: function () { },  

/**   * 隐藏模态对话框   */ 
hideModal: function () { 
  this.setData({ showModal: false }); 
},  
   
/**   * 对话框取消按钮点击事件   */  
onCancel: function () { 
  this.hideModal(); 
},  

/**   * 对话框确认按钮点击事件   */  
onConfirm: function () { 
  var that = this;
  if (that.data.oldpassword.length == 0) {
    wx.showLoading();
    wx.hideLoading();
    setTimeout(() => {
      wx.showToast({
        title: '请输入旧密码!',
        icon: 'none',
      });
      setTimeout(() => {
        wx.hideToast();
      }, 2000)
    }, 0);
    return false;
  }
  else if (that.data.newpassword.length == 0) {
    wx.showLoading();
    wx.hideLoading();
    setTimeout(() => {
      wx.showToast({
        title: '请输入新密码!',
        icon: 'none',
      });
      setTimeout(() => {
        wx.hideToast();
      }, 2000)
    }, 0);
    return false;
  }
  else if (that.data.newpassword2.length == 0) {
    wx.showLoading();
    wx.hideLoading();
    setTimeout(() => {
      wx.showToast({
        title: '请输入确认密码!',
        icon: 'none',
      });
      setTimeout(() => {
        wx.hideToast();
      }, 2000)
    }, 0);
    return false;
  }
  else if (that.data.newpassword != that.data.newpassword2) {
    wx.showLoading();
    wx.hideLoading();
    setTimeout(() => {
      wx.showToast({
        title: '两次密码请保持一致!',
        icon: 'none',
      });
      setTimeout(() => {
        wx.hideToast();
      }, 2000)
    }, 0);
    return false;
  }
  else {
    wx.request({
      url: requestIP + '/user/resetPwdTwo',
      data: {
        oldpwd: that.data.oldpassword,
        newpwd: that.data.newpassword2
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'userid': app.globalData.userid
      },
      success: function (res) {
        if (res.data.resultCode == "101") {
          wx.showLoading();
          wx.hideLoading();
          setTimeout(() => {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
            });
            setTimeout(() => {
              wx.hideToast();
            }, 2000)
          }, 0);      
        } else if (res.data.resultCode == "222"){
          wx.showLoading();
          wx.hideLoading();
          setTimeout(() => {
            wx.showToast({
              title: '请填写正确的旧密码',
              icon: "none",
            });
            setTimeout(() => {
              wx.hideToast();
            }, 2000)
          }, 0);       
        }
      },
      fail: function () {
        wx.showToast({
          title: '请求失败',
          icon: 'none',
        });
      },
    }) 
  }
    this.hideModal()
    this.setData({ 
      oldpassword:"",
      newpassword2:'',
      newpassword: '' 
    })
    this.setData({ 
      newpassword: '' 
    })
  },
  exit: function (e) {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: function (sm) {
        if (sm.confirm) {
          wx.removeStorage({
            key: 'user',
            success(res) {
            }
          })
          wx.redirectTo({
            url: '/pages/login/login',
          })
        } else if (sm.cancel) {
        }
      }
    })
  }
})