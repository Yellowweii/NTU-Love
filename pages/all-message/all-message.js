// pages/all-message/all-message.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    menutop: 0,
    menuright: "",
    menuheight: 0,
    statusheight: 0,
    allmessage: [],
    contentheight: [],
    show: false,
    id: "",
    page: 0,
    size: 5,
    number: "",
    switch: 0,
    j: 0,
  },
  before() {
    wx.navigateBack();
  },
  close(e) {
    this.setData({
      show: !this.data.show,
      id: e.currentTarget.dataset.id,
    });
  },
  quxiao() {
    this.setData({
      show: false,
    });
  },
  delete() {
    wx.request({
      url: "https://yellowwei.cn:443/publish",
      method: "DELETE",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        id: this.data.id,
      },
      success: (res) => {
        this.onLoad();
        this.setData({
          show: false,
        });
        wx.showToast({
          title: "删除成功",
          icon: "none",
        });
      },
    });
  },
  enlarge(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: [...e.currentTarget.dataset.id],
    });
  },
  addlove(e) {
    wx.showToast({
      title: "仅可在动态界面点赞哦 ！",
      icon: "none",
    });
  },
  todongtai(e) {
    wx.navigateTo({
      url: `/pages/comment/comment?id=${e.currentTarget.dataset.id}`,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      number: options.number,
    });
    wx.request({
      url: "https://yellowwei.cn:443/publish/three",
      method: "GET",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        number: this.data.number,
        page: this.data.page * this.data.size,
        size: this.data.size,
      },
      success: (res) => {
        this.setData({
          allmessage: res.data,
        });
      },
    });
    const resone = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: (restwo) => {
        this.setData({
          menuheight: resone.height * 2,
          menutop: resone.top * 2 + 6,
          menuright: (restwo.windowWidth - resone.right) * 2 + "rpx",
          statusheight: restwo.statusBarHeight * 2,
        });
      },
    });
    setTimeout(() => {
      let query = wx.createSelectorQuery();
      query
        .selectAll(".content")
        .boundingClientRect((rect) => {
          this.setData({
            contentheight: rect,
          });
        })
        .exec();
    }, 500);
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
  onReachBottom() {
    if (this.data.switch === 0) {
      this.data.page++;
      wx.request({
        url: "https://yellowwei.cn:443/publish/three",
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          number: this.data.number,
          page: this.data.page * this.data.size,
          size: this.data.size,
        },
        success: (res) => {
          if (res.data.length === 0) {
            this.data.page--;
            this.setData({
              switch: 1,
            });
            wx.showToast({
              title: "没有更多了~",
              icon: "none",
            });
          }
          this.setData({
            allmessage: [...this.data.allmessage, ...res.data],
          });
        },
      });
      setTimeout(() => {
        let query = wx.createSelectorQuery();
        query
          .selectAll(".content")
          .boundingClientRect((rect) => {
            this.setData({
              contentheight: rect,
            });
          })
          .exec();
      }, 500);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
