// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menutop: '',
    menuright: '',
    menuheight: '',
    picture: [],
    nickname: '',
    height: '',
    birthday: '',
    hometown: ''
  },
  before(){
    wx.switchTab({
      url: '/pages/me/me',
    })
  },
  modify(){
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: res => {
        this.data.picture[0] = res.tempFiles[0].tempFilePath
        this.setData({
          picture: this.data.picture
        })
        wx.uploadFile({
          filePath:  res.tempFiles[0].tempFilePath,
          name: 'file',
          header: {
            "content-type": "multipart/form-data"
          },
          url: 'https://yellowwei.cn:443/upload',
          success: res => {
            console.log(res.data);
            this.data.picture[0] = res.data
          }
        })
      }
    })
  },
  inputone(e){
      this.setData({
        nickname: e.detail.value
      })
  },
  inputtwo(e){
    this.setData({
      height: e.detail.value
    })
},
inputthree(e){
  this.setData({
    birthday: e.detail.value
  })
},
inputfour(e){
  this.setData({
    hometown: e.detail.value
  })
},
uploadimg(){
    wx.chooseMedia({
      count: 6 - this.data.picture.length,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: res => {
        // console.log(res);
          // this.setData({
          //   imglist: [...this.data.imglist , ...res.tempFiles]
          // })
          for (let i = 0; i < res.tempFiles.length; i++) {
            wx.uploadFile({
              filePath: res.tempFiles[i].tempFilePath,
              name: 'file',
              url: 'https://yellowwei.cn:443/upload',
              header: {
                "content-type": "multipart/form-data"
              },
              success: res => {
                console.log(res.data);
                this.data.picture.push(res.data)
                this.setData({
                  picture: this.data.picture
                })
              },
            })
           }
      }
    })
},
enlarge(e){
  wx.previewImage({
    urls: [this.data.picture[e.target.dataset.id]],
  })
},
close(e){
  this.data.picture.splice(e.target.dataset.id, 1)
  this.setData({
    picture: this.data.picture
  })
},
save(){
    wx.setStorageSync('picture', this.data.picture)
    wx.request({
      url: 'https://yellowwei.cn:443/NTU',
      method: 'PUT',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        number: wx.getStorageSync('number'),
        name: wx.getStorageSync('name'),
        picture: wx.getStorageSync('picture'),
        nickname: this.data.nickname,
        height: this.data.height,
        birthday: this.data.height,
        hometown: this.data.hometown,
      },
      success: res => {
        console.log(res.data);
        wx.setStorageSync('nickname', this.data.nickname)
        wx.setStorageSync('height', this.data.height)
        wx.setStorageSync('birthday', this.data.birthday)
        wx.setStorageSync('hometown', this.data.hometown)
        wx.switchTab({
          url: '/pages/me/me',
        })
        setTimeout(function(){
          wx.showToast({
            title: '修改成功！',
            icon: 'none'
          })
        },100)
      }
    })
    wx.request({
      url: 'https://yellowwei.cn:443/publish/two',
      method: 'PUT',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        nickname: this.data.nickname,
        touxiang: wx.getStorageSync('picture')[0],
        number: wx.getStorageSync('number')
      },
      success: res => {
        console.log(res.data);
      }
    })
    wx.request({
      url: 'https://yellowwei.cn:443/comment',
      method: 'PUT',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        nickname: this.data.nickname,
        picture: wx.getStorageSync('picture')[0],
        number: wx.getStorageSync('number')
      },
      success: res => {
        console.log(res.data);
      }
    })
    wx.request({
      url: 'https://yellowwei.cn:443/reply',
      method: 'PUT',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        nickname: this.data.nickname,
        picture: wx.getStorageSync('picture')[0],
        number: wx.getStorageSync('number')
      },
      success: res => {
        console.log(res.data);
      }
    })
    wx.request({
      url: 'https://yellowwei.cn:443/comment/four',
      method: 'PUT',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        replynickname: this.data.nickname,
        replypicture: wx.getStorageSync('picture')[0],
        replynumber: wx.getStorageSync('number')
      },
      success: res => {
        console.log(res.data);
      }
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const resone = wx.getMenuButtonBoundingClientRect()
    wx.getSystemInfo({
      success: restwo => {
        this.setData({
          menuheight: resone.height * 2 + 'rpx',
          menutop: resone.top * 2 + 6 + 'rpx',
          menuright: (restwo.windowWidth - resone.right) * 2 + 'rpx' ,
          picture: wx.getStorageSync('picture')
        })
      }
    })
    this.setData({
      picture: wx.getStorageSync('picture'),
      nickname: wx.getStorageSync('nickname'),
      height: wx.getStorageSync('height'),
      birthday: wx.getStorageSync('birthday'),
      hometown: wx.getStorageSync('hometown')
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})