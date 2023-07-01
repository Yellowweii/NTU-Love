// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menutop: 0,
    menuright: '',
    menuheight: 0,
    statusheight: 0,
    keyheight: 0,
    number: '',
    show: false,
    onedongtai: {},
    value: '',
    id: 0,
    commentlist: [],
    flag: false,
    placeholder: '说点什么吧...',
    commentid: 0,
    replylist: [],
    flagtwo: false,
    replylength: 0,
    publishtime: '',
    index: 0,
    nickname: '',
    page: 0,
    size: 10,
    switch: 0
    // flagthree: false
  },
  before(){
    wx.navigateBack()
  },
  close(e){
    this.setData({
      show: !this.data.show,
      id: e.currentTarget.dataset.id
    })
  },
  // closetwo(e){
  //   this.setData({
  //     showtwo: !this.data.showtwo,
  //     commentid: e.currentTarget.dataset.id
  //   })
  // },
  // quxiaotwo(){
  //   this.setData({
  //     showtwo: false
  //   })
  // },
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
        this.setData({
          show: false
        })
        wx.switchTab({
          url: '/pages/college-circle/college-circle',
          success: function (e) {  
            var page = getCurrentPages().pop();  
            if (page == undefined || page == null) return;  
            page.onLoad();  
          }  
        })
        setTimeout(function(){
          wx.showToast({
            title: '删除动态成功',
            icon: 'none'
          })
        },100)
      }
    })
    wx.request({
      url: 'https://yellowwei.cn:443/comment',
      method: 'DELETE',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        messageid: this.data.id
      },
      success: res => {
        console.log(res.data);
      }
    })
    wx.request({
      url: 'https://yellowwei.cn:443/reply',
      method: 'DELETE',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        messageid: this.data.id
      },
      success: res => {
        console.log(res.data);
      }
    })
  },
  todetail(e){
    wx.navigateTo({
      url: `/pages/detail/detail?number=${e.currentTarget.dataset.number}`,
    })
  },
  nottodetail(){
    wx.showToast({
      title: '无法查看匿名用户的信息哦！',
      icon: 'none'
    })
  },
  enlarge(e){
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: [...e.currentTarget.dataset.id]
    })
  },
  heightchange(e){
    this.setData({
      keyheight: e.detail.height * 2 + 10
    })
  },
  blur(){
    this.setData({
      keyheight: 0,
      placeholder: '说点什么吧...'
    })
  },
  input(e){
    this.setData({
      value: e.detail.value
    })
  },
  send(){
    if(this.data.value.trim() === ''){
      wx.showToast({
        title: '内容不能为空！',
        icon: 'none'
      })
      return
    }
    if(this.data.placeholder !== '说点什么吧...'){
      wx.request({
        url: 'https://yellowwei.cn:443/comment/three',
        method: 'GET',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          commentid: this.data.commentid
        },
        success: res => {
          if(res.data.replycontent === null){
              wx.request({
                url: 'https://yellowwei.cn:443/comment/two',
                method: 'PUT',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                  replynumber: wx.getStorageSync('number'),
                  replypicture: wx.getStorageSync('picture')[0],
                  replynickname: wx.getStorageSync('nickname'),
                  replysex: wx.getStorageSync('sex'),
                  replyschool: wx.getStorageSync('school'),
                  replygrade: wx.getStorageSync('grade'),
                  replycontent: this.data.value.trim(),
                  replypublishtime: new Date().getTime(),
                  id: this.data.commentid
                },
                success: res => {
                  console.log(res.data);
                  this.setData({
                    value: ''
                  })
                  wx.showToast({
                    title: '评论成功',
                    icon: 'none'
                  })
                  this.data.commentlist[this.data.index] = res.data
                  this.setData({
                    commentlist: this.data.commentlist
                  })
                  setTimeout(res => {
                    wx.request({
                      url: 'https://yellowwei.cn:443/publish/four',
                      method: 'PUT',
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      data: {
                        review: this.data.onedongtai.review + 1,
                        id: this.data.onedongtai.id
                      },
                      success: res => {
                        wx.request({
                          url: 'https://yellowwei.cn:443/publish/six',
                          method: 'GET',
                          header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                          },
                          data: {
                            id: this.data.id
                          },
                          success: res => {
                            console.log(res.data);
                            this.setData({
                              onedongtai: res.data
                            })
                          }
                        })
                        console.log(res.data);
                      }
                    })
                  },1000)
                }
              })
          }
          else{
            wx.request({
              url: 'https://yellowwei.cn:443/reply',
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                messageid: this.data.id,
                commentid: this.data.commentid,
                number: wx.getStorageSync('number'),
                picture: wx.getStorageSync('picture')[0],
                nickname: wx.getStorageSync('nickname'),
                sex: wx.getStorageSync('sex'),
                school: wx.getStorageSync('school'),
                grade: wx.getStorageSync('grade'),
                content: this.data.value.trim(),
                publishtime: new Date().getTime()
              },
              success: res=> {
                setTimeout(res => {
                  wx.request({
                    url: 'https://yellowwei.cn:443/publish/four',
                    method: 'PUT',
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                      review: this.data.onedongtai.review + 1,
                      id: this.data.onedongtai.id
                    },
                    success: res => {
                      wx.request({
                        url: 'https://yellowwei.cn:443/publish/six',
                        method: 'GET',
                        header: {
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: {
                          id: this.data.id
                        },
                        success: res => {
                          console.log(res.data);
                          this.setData({
                            onedongtai: res.data
                          })
                        }
                      })
                      console.log(res.data);
                    }
                  })
                },1000)
                this.data.commentlist[this.data.index].replylength = 0
                this.setData({
                  value: '',
                  flagtwo: true,
                  commentlist: this.data.commentlist,
                  // flagthree: true
                })
                wx.showToast({
                  title: '回复成功',
                  icon: 'none'
                })
                wx.request({
                  url: 'https://yellowwei.cn:443/reply',
                  method: 'GET',
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  data: {
                    commentid: this.data.commentid
                  },
                  success: res => {
                    this.data.replylist[this.data.commentid] = res.data
                    this.setData({
                      replylist: this.data.replylist,
                      replylength: res.data.length
                    })
                    console.log(res.data);
                  }
                })
                setTimeout(res => {
                  wx.request({
                    url: 'https://yellowwei.cn:443/comment/three',
                    method: 'PUT',
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                      replylength: this.data.replylength,
                      id: this.data.commentid
                    },
                    success: res => {
                      console.log(res.data);
                      console.log(this.data.commentid);
                      console.log(this.data.replylength);
                    }
                  })
                },1000)
              }
            })
          }
        }
      })
    }
    else{
      wx.request({
        url: 'https://yellowwei.cn:443/comment',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          messageid: this.data.id,
          number: wx.getStorageSync('number'),
          picture: wx.getStorageSync('picture')[0],
          nickname: wx.getStorageSync('nickname'),
          sex: wx.getStorageSync('sex'),
          school: wx.getStorageSync('school'),
          grade: wx.getStorageSync('grade'),
          content: this.data.value.trim(),
          publishtime: new Date().getTime()
        },
        success: res => {
          console.log(res);
          if(this.data.commentlist.length === 0){
            this.setData({
              nickname: this.data.onedongtai.anonymity === '匿名' ? '匿名用户' : wx.getStorageSync('nickname')
            })
            wx.request({
              url: 'https://yellowwei.cn:443/publish/three',
              method: 'PUT',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                commentname: this.data.nickname,
                commentsex: wx.getStorageSync('sex'),
                commentcontent: this.data.value.trim(),
                id: this.data.id
              },
              success: res => {
                console.log(res);
              }
            })
          }
          this.setData({
            value: ''
          })
          wx.showToast({
            title: '评论成功',
            icon: 'none'
          })
          this.data.commentlist.unshift(res.data)
          this.setData({
            commentlist: this.data.commentlist
          })
        }
      })
        setTimeout(res => {
          wx.request({
            url: 'https://yellowwei.cn:443/publish/four',
            method: 'PUT',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              review: this.data.onedongtai.review + 1,
              id: this.data.onedongtai.id
            },
            success: res => {
              wx.request({
                url: 'https://yellowwei.cn:443/publish/six',
                method: 'GET',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                  id: this.data.id
                },
                success: res => {
                  console.log(res.data);
                  this.setData({
                    onedongtai: res.data
                  })
                }
              })
              console.log(res.data);
            }
          })
        },1000)
    }
  },
  huifu(e){
    this.setData({
      flag: true,
      placeholder: '回复' + e.currentTarget.dataset.nickname + ':',
      commentid: e.currentTarget.dataset.id,
      index: e.currentTarget.dataset.index,
      nickname: e.currentTarget.dataset.nickname
    })
  },
  // huifutwo(e){
  //   this.setData({
  //     flag: true,
  //     placeholder: '回复' + e.currentTarget.dataset.nickname + ':',
  //     commentid: e.currentTarget.dataset.id,
  //   })
  // },
  zhankai(e){
    console.log(e);
    this.data.commentlist[e.currentTarget.dataset.index].replylength = 0
    this.setData({
      flagtwo: true,
      commentlist: this.data.commentlist
    })
    wx.request({
      url: 'https://yellowwei.cn:443/reply',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        commentid: e.currentTarget.dataset.id
      },
      success: res => {
        this.data.replylist[e.currentTarget.dataset.id] = res.data
        this.setData({
          replylist: this.data.replylist
        })
        console.log(this.data.replylist);
      }
    })
  },
  shanchu(e){
    console.log(e);
    wx.showModal({
      content: '确定要删除这条评论吗？',
      complete: (res) => {
        if (res.confirm) {
            wx.request({
              url: 'https://yellowwei.cn:443/comment/two',
              method: 'DELETE',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                id: e.currentTarget.dataset.id
              },
              success: res => {
                console.log(res.data);
                wx.showToast({
                  title: '删除成功',
                  icon: 'none'
                })
                this.data.commentlist.splice(e.currentTarget.dataset.index,1)
                this.setData({
                  commentlist: this.data.commentlist
                })
                wx.request({
                  url: 'https://yellowwei.cn:443/comment/two',
                  method: 'GET',
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  data: {
                    messageid: this.data.id
                  },
                  success: res => {
                    console.log(res.data);
                    if(res.data === ''){
                        wx.request({
                          url: 'https://yellowwei.cn:443/publish/five',
                          method: 'PUT',
                          header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                          },
                          data: {
                            id: this.data.id
                          },
                          success: res => {
                            console.log(res.data);
                          }
                        })
                    }
                    else{
                      wx.request({
                        url: 'https://yellowwei.cn:443/publish/three',
                        method: 'PUT',
                        header: {
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: {
                          commentname: res.data.nickname,
                          commentsex: res.data.sex,
                          commentcontent: res.data.content,
                          id: this.data.id
                        },
                        success: res => {
                          console.log(res.data);
                        }
                      })
                    }
                  }
                })
              }
            })
            if(e.currentTarget.dataset.replylength !== 0){
              wx.request({
                url: 'https://yellowwei.cn:443/reply/two',
                method: 'DELETE',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                  commentid: e.currentTarget.dataset.id
                },
                success: res => {
                  console.log(res.data);
                }
              })
              setTimeout(res => {
                wx.request({
                  url: 'https://yellowwei.cn:443/publish/four',
                  method: 'PUT',
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  data: {
                    review: this.data.onedongtai.review - 2 - this.data.replylength,
                    id: this.data.onedongtai.id
                  },
                  success: res => {
                    wx.request({
                      url: 'https://yellowwei.cn:443/publish/six',
                      method: 'GET',
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      data: {
                        id: this.data.id
                      },
                      success: res => {
                        console.log(res.data);
                        this.setData({
                          onedongtai: res.data
                        })
                      }
                    })
                    console.log(res.data);
                  }
                })
              },1000)
            }
            else{
              if(e.currentTarget.dataset.replycontent === null){
                console.log("还没人回复");
                setTimeout(res => {
                  wx.request({
                    url: 'https://yellowwei.cn:443/publish/four',
                    method: 'PUT',
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                      review: this.data.onedongtai.review - 1,
                      id: this.data.onedongtai.id
                    },
                    success: res => {
                      wx.request({
                        url: 'https://yellowwei.cn:443/publish/six',
                        method: 'GET',
                        header: {
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: {
                          id: this.data.id
                        },
                        success: res => {
                          console.log(res.data);
                          this.setData({
                            onedongtai: res.data
                          })
                        }
                      })
                      console.log(res.data);
                    }
                  })
                },1000)
              }
              else{
                setTimeout(res => {
                  wx.request({
                    url: 'https://yellowwei.cn:443/publish/four',
                    method: 'PUT',
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                      review: this.data.onedongtai.review - 2,
                      id: this.data.onedongtai.id
                    },
                    success: res => {
                      wx.request({
                        url: 'https://yellowwei.cn:443/publish/six',
                        method: 'GET',
                        header: {
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        data: {
                          id: this.data.id
                        },
                        success: res => {
                          console.log(res.data);
                          this.setData({
                            onedongtai: res.data
                          })
                        }
                      })
                      console.log(res.data);
                    }
                  })
                },1000)
              }
            }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id
    })
    wx.request({
      url: 'https://yellowwei.cn:443/publish/six',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: options.id
      },
      success: res => {
        console.log(res.data);
        this.setData({
          onedongtai: res.data
        })
      }
    })
    wx.request({
      url: 'https://yellowwei.cn:443/comment',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        messageid: this.data.id,
        page: this.data.page * this.data.size,
        size: this.data.size
      },
      success: res => {
        this.setData({
          commentlist: res.data
        })
        console.log(this.data.commentlist);
      }
    })
    const resone = wx.getMenuButtonBoundingClientRect()
    wx.getSystemInfo({
      success: restwo => {
        this.setData({
          menuheight: resone.height * 2 ,
          menutop: resone.top * 2 + 6,
          menuright: (restwo.windowWidth - resone.right) * 2 + 'rpx',
          statusheight: restwo.statusBarHeight * 2 ,
          number: wx.getStorageSync('number')
        })
      }
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
    if(this.data.switch === 0){
      ++this.data.page
      wx.request({
        url: 'https://yellowwei.cn:443/comment',
        method: 'GET',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          messageid: this.data.id,
          page: this.data.page * this.data.size,
          size: this.data.size
        },
        success: res => {
          console.log(res.data);
          if(res.data.length === 0){
            this.data.page--
            this.setData({
              switch: 1
            })
            wx.showToast({
              title: '没有更多了~',
              icon: 'none'
            })
            return
          }
            this.setData({
              commentlist: [...this.data.commentlist, ...res.data]
            })
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})