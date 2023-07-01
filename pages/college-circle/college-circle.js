// pages/college-circle/college-circle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    menuheight: '',
    menutop: '',
    menuright: '',
    picture: '',
    number: '',
    index: true,
    contentheight: [],
    boxheight: 0,
    publish_message: [],
    imglist:[],
    show: false,
    id: '',
    page: 0,
    size: 10,
    switch: 0,
    j: 0,
    showlove: [],
    showmodal: true
  },
  toconfirm(){
    wx.navigateTo({
      url: '/pages/confirm/confirm',
    })
  },
  enlarge(e){
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: [...e.currentTarget.dataset.id]
    })
  },
  publish(){
    if(wx.getStorageSync('status') === '审核成功'){
      wx.navigateTo({
        url: '/pages/publish/publish',
      })
    }
    if(wx.getStorageSync('status') === '审核失败'){
      wx.showToast({
        title: '资料审核未通过！',
        icon: 'none'
      })
    }
    if(wx.getStorageSync('status') === '待审核'){
      wx.showToast({
        title: '资料审核中，请稍等一会哦！',
        icon: 'none'
      })
    }
  },
  close(e){
    this.setData({
      show: !this.data.show,
      id: e.currentTarget.dataset.id
    })
  },
  quxiao(){
    this.setData({
      show: false
    })
  },
  delete(){
    wx.request({
      url: 'https://yellowwei.cn:443/publish',
      method: 'DELETE',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: this.data.id
      },
      success: res => {
        this.onLoad()
        this.setData({
          show: false
        })
        wx.showToast({
          title: '删除成功',
          icon: 'none'
        })
      }
    })

  },
  deletestore(e){
    const arr = wx.getStorageSync('showlove')
    arr.splice(e.currentTarget.dataset.index,1)
    wx.setStorageSync('showlove', arr)
  },
  todetail(e){
    if(wx.getStorageSync('status') === '待审核'){
      wx.showModal({
        title: '资料正在加急审核中',
        content: '请耐心等待...'
      })
      return
    }
    wx.navigateTo({
      url: `/pages/detail/detail?number=${e.currentTarget.dataset.number}`,
    })
  },
  nottodetail(){
    if(wx.getStorageSync('status') === '待审核'){
      wx.showModal({
        title: '资料正在加急审核中',
        content: '请耐心等待...'
      })
      return
    }
    wx.showToast({
      title: '无法查看匿名用户的信息哦！',
      icon: 'none'
    })
  },
  addlove(e){
    if(wx.getStorageSync('status') === '待审核'){
      wx.showModal({
        title: '资料正在加急审核中',
        content: '请耐心等待...'
      })
      return
    }
    if(this.data.showlove[e.currentTarget.dataset.index] === 0){
      this.data.showlove[e.currentTarget.dataset.index] = 1
      wx.setStorageSync('showlove', this.data.showlove)
      this.setData({
        showlove: wx.getStorageSync('showlove')
      })
      wx.request({
        url: 'https://yellowwei.cn:443/publish',
        method: 'PUT',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          love: this.data.publish_message[e.currentTarget.dataset.index].love + 1,
          id: this.data.publish_message[e.currentTarget.dataset.index].id
        },
        success: res => {
          this.setData({
            page: parseInt(e.currentTarget.dataset.index / this.data.size) 
          })
          wx.request({
            url: 'https://yellowwei.cn:443/publish',
            method: 'GET',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              page: this.data.page * this.data.size,
              size: this.data.size
            },
            success: res => {
              for (let i = this.data.page * this.data.size; i < this.data.page * this.data.size + res.data.length; i++) {
                this.data.publish_message[i] = res.data[this.data.j++]
              }
              this.setData({
                publish_message: this.data.publish_message,
                j: 0
              })
            }
          })
        }
      })
    }
    else{
      this.data.showlove[e.currentTarget.dataset.index] = 0
      wx.setStorageSync('showlove', this.data.showlove)
      this.setData({
        showlove: wx.getStorageSync('showlove')
      })
      wx.request({
        url: 'https://yellowwei.cn:443/publish',
        method: 'PUT',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          love: this.data.publish_message[e.currentTarget.dataset.index].love - 1,
          id: this.data.publish_message[e.currentTarget.dataset.index].id
        },
        success: res => {
          this.setData({
            page: parseInt(e.currentTarget.dataset.index / this.data.size) 
          })
          wx.request({
            url: 'https://yellowwei.cn:443/publish',
            method: 'GET',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              page: this.data.page * this.data.size,
              size: this.data.size
            },
            success: res => {
              for (let i = this.data.page * this.data.size; i < this.data.page * this.data.size + res.data.length; i++) {
                this.data.publish_message[i] = res.data[this.data.j++]
              }
              this.setData({
                publish_message: this.data.publish_message,
                j: 0
              })
            }
          })
        }
      })
    }
  },
  todongtai(e){
    if(wx.getStorageSync('status') === '待审核'){
      wx.showModal({
        title: '资料正在加急审核中',
        content: '请耐心等待...'
      })
      return
    }
    wx.navigateTo({
      url: `/pages/comment/comment?id=${e.currentTarget.dataset.id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      page: 0,
      switch: 0
    })
    wx.request({
      url: 'https://yellowwei.cn:443/NTU',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        number: wx.getStorageSync('number')
      },
      success: res => {
        wx.setStorageSync('status', res.data.status)
      }
    })
    wx.request({
      url: 'https://yellowwei.cn:443/publish',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        page: this.data.page * this.data.size,
        size: this.data.size
      },
      success: res => {
        this.setData({
          publish_message: res.data
        })
        for (let i = 0; i < res.data.length; i++) {
          this.data.showlove[i] = 0
        }
        if(wx.getStorageSync('showlove')){
          this.setData({
            showlove: wx.getStorageSync('showlove')
          })
        }
        else{
          wx.setStorageSync('showlove', this.data.showlove)
        }
      }
    })
    if(wx.getStorageSync('number')){
      this.setData({
        flag: false
      })
    }
    const resone = wx.getMenuButtonBoundingClientRect()
    wx.getSystemInfo({
      success: restwo => {
        this.setData({
          menuheight: resone.height * 2 + 'rpx',
          menutop: resone.top * 2 + 6 + 'rpx',
          menuright: (restwo.windowWidth - resone.right) * 2 + 'rpx' ,
          picture: wx.getStorageSync('picture'),
          number: wx.getStorageSync('number')
        })
      }
    })
    setTimeout(() => {
      let query = wx.createSelectorQuery();
      query.selectAll('.content').boundingClientRect(rect=>{
        this.setData({
          contentheight: rect
        })
        }).exec();
      }, 500)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.requestSubscribeMessage({
      tmplIds: ['8fQmlqbb-4UJUaaVtfbXsGEpKLfARJEqML6kkEjQEno'],
      success: res => {
        console.log(res);
      }
    })
    if(wx.getStorageSync('status') === '审核失败'){
      wx.showModal({
        title: '您的信息审核未通过',
        content: '即将跳转到修改页面',
        complete: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/confirm/confirm',
            })
          }
        },
       showCancel: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.onLoad()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
      if(this.data.switch === 0){
        this.data.page++
        wx.request({
          url: 'https://yellowwei.cn:443/publish',
          method: 'GET',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            page: this.data.page * this.data.size,
            size: this.data.size
          },
          success: res => {
            if(res.data.length === 0){
              this.data.page--
              this.setData({
                switch: 1
              })
              wx.showToast({
                title: '没有更多了~',
                icon: 'none'
              })
            }
            this.setData({
              publish_message: [...this.data.publish_message, ...res.data]
            })
            for (let i = this.data.page * this.data.size; i < this.data.page * this.data.size + res.data.length; i++) {
              this.data.showlove[i] = 0
            }
            if(wx.getStorageSync('showlove')[this.data.page * this.data.size]){
              this.setData({
                showlove: wx.getStorageSync('showlove')
              })
            }
            else{
              wx.setStorageSync('showlove', this.data.showlove)
            }
          }
        })
        setTimeout(() => {
          let query = wx.createSelectorQuery();
          query.selectAll('.content').boundingClientRect(rect=>{
            this.setData({
              contentheight: rect
            })
            }).exec();
          }, 500)
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})