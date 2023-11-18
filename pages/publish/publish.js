// pages/publish/publish.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    menutop: "",
    menuright: "",
    menuheight: "",
    height: 150,
    keyheight: 0,
    flag: false,
    imglist: [],
    videolist: [],
    value: "",
    index: 0,
    publishimg: [],
    publishvideo: [],
  },
  focus(e) {
    this.setData({
      keyheight: e.detail.height,
      height: 100,
    });
  },
  blur() {
    this.setData({
      keyheight: 0,
      height: 150,
    });
  },
  yes() {
    this.setData({
      flag: !this.data.flag,
    });
  },
  uploadimage() {
    if (this.data.videolist.length > 0) {
      wx.showToast({
        title: "上传视频后无法再上传图片！",
        icon: "none",
      });
      return;
    }
    if (this.data.imglist.length >= 6) {
      wx.showToast({
        title: "最多同时选择6张图片或视频！",
        icon: "none",
      });
    } else {
      wx.chooseMedia({
        count: 6 - this.data.imglist.length,
        mediaType: ["image"],
        sourceType: ["album", "camera"],
        success: (res) => {
          for (let i = 0; i < res.tempFiles.length; i++) {
            wx.uploadFile({
              filePath: res.tempFiles[i].tempFilePath,
              name: "file",
              url: "https://yellowwei.cn:443/Messageupload",
              header: {
                "content-type": "multipart/form-data",
              },
              success: (res) => {
                this.data.publishimg.push(res.data);
              },
            });
          }
          this.setData({
            imglist: [...this.data.imglist, ...res.tempFiles],
          });
          if (this.data.imglist.length > 0) {
            this.setData({
              index: 1,
            });
          } else {
            this.setData({
              index: 0,
            });
          }
        },
      });
    }
  },
  closeimg(e) {
    this.data.imglist.splice(e.target.dataset.id, 1);
    this.data.publishimg.splice(e.target.dataset.id, 1);
    this.setData({
      imglist: this.data.imglist,
      publishimg: this.data.publishimg,
    });
    console.log(this.data.imglist);
    console.log(this.data.publishimg);
    if (this.data.imglist.length > 0) {
      this.setData({
        index: 1,
      });
    } else {
      this.setData({
        index: 0,
      });
    }
  },
  closevideo(e) {
    this.data.videolist.splice(e.target.dataset.id, 1);
    this.setData({
      videolist: this.data.videolist,
    });
    if (this.data.imglist.length > 0) {
      this.setData({
        index: 1,
      });
    } else {
      this.setData({
        index: 0,
      });
    }
  },
  uploadvideo() {
    wx.showToast({
      title: "暂不支持上传视频哦！",
      icon: "none",
    });
  },
  input(e) {
    this.setData({
      value: e.detail.value,
    });
    if (this.data.value.trim() !== "") {
      this.setData({
        index: 1,
      });
    } else {
      this.setData({
        index: 0,
      });
    }
  },
  enlarge(e) {
    wx.previewImage({
      urls: [this.data.imglist[e.target.dataset.id].tempFilePath],
    });
  },
  before() {
    wx.navigateBack();
  },
  publish() {
    if (this.data.value.trim() === "") {
      wx.showToast({
        title: "输入的内容不能为空！",
        icon: "none",
      });
      return;
    }
    wx.request({
      url: "https://yellowwei.cn:443/publish",
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        nickname: wx.getStorageSync("nickname"),
        school: wx.getStorageSync("school"),
        grade: wx.getStorageSync("grade"),
        sex: wx.getStorageSync("sex"),
        touxiang: wx.getStorageSync("picture")[0],
        number: wx.getStorageSync("number"),
        publishtxt: this.data.value,
        publishimg: this.data.publishimg,
        publishvideo: this.data.publishvideo,
        anonymity: this.data.flag === false ? "不匿名" : "匿名",
        publishtime: new Date().getTime(),
      },
      success: (res) => {
        const arr = wx.getStorageSync("showlove");
        arr.unshift(0);
        wx.setStorageSync("showlove", arr);
        console.log(res.data);
        wx.switchTab({
          url: "/pages/college-circle/college-circle",
          success: function (e) {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onLoad();
          },
        });
        setTimeout(function () {
          wx.showToast({
            title: "发布成功！",
            icon: "none",
          });
        }, 100);
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const resone = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: (restwo) => {
        this.setData({
          menuheight: resone.height * 2 + "rpx",
          menutop: resone.top * 2 + 6 + "rpx",
          menuright: (restwo.windowWidth - resone.right) * 2 + "rpx",
        });
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
