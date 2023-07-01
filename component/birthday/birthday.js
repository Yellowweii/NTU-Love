// component/birthday/birthday.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    styleIsolation: 'apply-shared'
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      flag: false,
      year: '2002',
      year1: '',
      month: '11',
      month1:'',
      day: '04',
      day1: '',
      keyheight: 0
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    focusone(e){
        this.setData({
          year: '',
          keyheight: e.detail.height
        })
        this.triggerEvent('height',{value: this.data.keyheight})
    },
    focustwo(e){
      this.setData({
        month: '',
        keyheight: e.detail.height
      })
      this.triggerEvent('height',{value: this.data.keyheight})
  },
  focusthree(e){
    this.setData({
      day: '',
      keyheight: e.detail.height
    })
    this.triggerEvent('height',{value: this.data.keyheight})
  },
    inputone(e){
        this.setData({
          year1: e.detail.value
        })
        this.triggerEvent('year',{value: this.data.year1})
        if(e.detail.value.length === 4){
          this.setData({
            flag: true
          })
        }
    },
    inputtwo(e){
        this.setData({
          month1: e.detail.value
        })
        this.triggerEvent('month',{value: this.data.month1})
    },
    inputthree(e){
      this.setData({
        day1: e.detail.value
      })
      this.triggerEvent('day',{value: this.data.day1})
  },
    blurone(){
      this.setData({
        year:'2002'
      })
      this.triggerEvent('height',{value: 0})
    },
    blurtwo(){
      this.setData({
        month:'11'
      })
      this.triggerEvent('height',{value: 0})
    },
    blurthree(){
      this.setData({
        day:'04'
      })
      this.triggerEvent('height',{value: 0})
    },
  }
})
