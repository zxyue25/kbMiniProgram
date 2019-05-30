//app.js
App({
  onLaunch: function (options) {
    //更多页面提示
    if (!wx.getStorageSync("flagMore")) {
      wx.setStorageSync("flagMore", 1);
    }
    var that = this
    //判断是否授权 未授权跳授权页面
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              that.globalData.nickName = res.userInfo.nickName
              that.globalData.avatarUrl = res.userInfo.avatarUrl
            }
          })
        }
        else {
          wx.redirectTo({
            url: '/pages/authorize/authorize',
          })
        }
      }
    })

    //判断是否还有缓存 有跳入index 无跳入login
    var userid = ''
    var userstatus = ''
    var openid = ''
    var tel = ''
    wx.getStorage({//获取本地缓存
      key: "user",
      success: function (res) {
        userid = res.data.userid
        userstatus = res.data.userstatus
        openid = res.data.openid
        tel = res.data.tel
        if (userid && tel && openid && userstatus) {
          if (userstatus == 1) {
            that.globalData.userid = userid
            that.globalData.userstatus = userstatus
            that.globalData.openid = openid
            wx.redirectTo({
              url: '/pages/index/A_index'
            })

          }
          else if (userstatus == 2) {
            that.globalData.userid = userid
            that.globalData.userstatus = userstatus
            that.globalData.openid = openid
            wx.redirectTo({
              url: '/pages/index/T_index'
            })
          }
          else if (userstatus == 3) {
            that.globalData.userid = userid
            that.globalData.userstatus = userstatus
            that.globalData.openid = openid
            wx.redirectTo({
              url: '/pages/index/index'
            })
          }
          else {
            wx.redirectTo({
              url: '/pages/login/login'
            })
          }
        }
        else {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    }) 

  },

  //学生   
  editTabBar: function () {
    //使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。 
    var curPageArr = getCurrentPages();    //获取加载的页面   
    var curPage = curPageArr[curPageArr.length - 1];    //获取当前页面的对象    
    var pagePath = curPage.route;    //当前页面url    
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;    //根据页面地址设置当前页面状态         
      }
    }
    curPage.setData({ tabBar: tabBar });
  },
  //老师
  editTabBar1: function () {
    var curPageArr = getCurrentPages();
    var curPage = curPageArr[curPageArr.length - 1];
    var pagePath = curPage.route;
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar = this.globalData.tabBar1;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;
      }
    }
    curPage.setData({ tabBar: tabBar });
  },

  //助教
  editTabBar2: function () {
    //使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。 
    var curPageArr = getCurrentPages();    //获取加载的页面   
    var curPage = curPageArr[curPageArr.length - 1];    //获取当前页面的对象    
    var pagePath = curPage.route;    //当前页面url    
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar = this.globalData.tabBar2;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;    //根据页面地址设置当前页面状态         
      }
    }
    curPage.setData({ tabBar: tabBar });
  },

  globalData: {
    openid: "",
    userid: "0137da84b68111e8ab8e00163e00299d",//学生 0137da84b68111e8ab8e00163e00299d 老师 039cd505e50911e8ab8e00163e00299d 助教 12459ec8a77a11e8ab8e00163e00299d 
    userInfo: null,
    userstatus: "",//用户身份
    code: "",
    storeid: "",
    province: "",//省
    video_link:"",//视频链接
    shareFlag:"",//1代表从分享过来，缓存里有classid
    city: "",//市
    areaname: "",//区
    storename: '',//门店名称
    // requestIP: "http://localhost:8080/happyschedule",
    requestIP:'https://curriculum.50fun.cn/happyschedule',
    //学生角色
    tabBar: {
      color: "black",
      selectedColor: "#1DA27F",
      backgroundColor: "#fff",
      borderStyle: "#dddee1",
      "list": [
        {
          "pagePath": "/pages/index/index",
          "text": "首页",
          "iconPath": "/image/index.png",
          "selectedIconPath": "/image/indexselected.png",
          "clas": "menu-item",
          "selectedColor": "#1DA27F",
          active: true
        },
        {
          "pagePath": "/pages/more/more",
          "text": "更多",
          "iconPath": "/image/more.png",
          "selectedIconPath": "/image/moreselected.png",
          "selectedColor": "#1DA27F",
          "clas": "menu-item",
          active: false
        },
        {
          "pagePath": "/pages/activity/activity",
          "text": "活动",
          "iconPath": "/image/activity.png",
          "selectedIconPath": "/image/activityselect.png",
          "selectedColor": "#1DA27F",
          "clas": "menu-item",
          active: false
        },
        {
          "pagePath": "/pages/mine/mine",
          "text": "我的",
          "iconPath": "/image/mine.png",
          "selectedIconPath": "/image/mineselected.png",
          "selectedColor": "#1DA27F",
          "clas": "menu-item",
          active: false
        }
      ],
      "position": "bottom"
    },

    //老师角色
    tabBar1: {
      color: "black",
      selectedColor: "#1DA27F",
      backgroundColor: "#fff",
      borderStyle: "#dddee1",
      "list": [{
        "pagePath": "/pages/index/T_index",
        "text": "首页",
        "iconPath": "/image/index.png",
        "selectedIconPath": "/image/indexselected.png",
        "clas": "menu-item1",
        "selectedColor": "#1DA27F",
        active: false
      },
      {
        "pagePath": "/pages/mine/T_mine",
        "text": "我的",
        "iconPath": "/image/mine.png",
        "selectedIconPath": "/image/mineselected.png",
        "selectedColor": "#1DA27F",
        "clas": "menu-item1",
        active: false
      }],
      "position": "bottom"
    },

    //助教角色
    tabBar2: {
      color: "black",
      selectedColor: "#1DA27F",
      backgroundColor: "#fff",
      borderStyle: "#dddee1",
      "list": [
        {
          "pagePath": "/pages/index/A_index",
          "text": "首页",
          "iconPath": "/image/index.png",
          "selectedIconPath": "/image/indexselected.png",
          "clas": "menu-item2",
          "selectedColor": "#1DA27F",
          active: true
        },
        {
          "pagePath": "/pages/order/order",
          "text": "预约",
          "iconPath": "/image/order.png",
          "selectedIconPath": "/image/orderselected.png",
          "selectedColor": "#1DA27F",
          "clas": "menu-item2",
          active: false
        },
        {
          "pagePath": "/pages/mine/A_mine",
          "text": "我的",
          "iconPath": "/image/mine.png",
          "selectedIconPath": "/image/mineselected.png",
          "selectedColor": "#1DA27F",
          "clas": "menu-item2",
          active: false
        }
      ],
      "position": "bottom"
    },
  }
})