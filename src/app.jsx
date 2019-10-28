import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'
import 'taro-ui/dist/style/index.scss'
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/mine/mine',
      'pages/detail/detail',
      'pages/login/login',
      'pages/policy/policy',
      'pages/record/record',
      'pages/routes/routes',
      'pages/rate/rate',
      'pages/comment/comment'
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#0097FF',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    tabBar:{
      color: "#000000",
      selectedColor:"#1C9ADC",
      backgroundColor:'#ffffff',
      borderStyle:'black',
      list: [
        {
          text: "景点",
          pagePath: "pages/index/index",
          iconPath: "images/index.png",
          selectedIconPath: "images/index-active.png"
        },
        {
          text: "我的",
          pagePath: "pages/mine/mine",
          iconPath: "images/mine.png",
          selectedIconPath: "images/mine-active.png"
        }
      ]
    },
    plugins:{
      routePlan:{
        version:'1.0.1',
        provider:'wx50b5593e81dd937a'
      },
      chooseLocation: {
        "version": "1.0.0",
        "provider": "wx76a9a06e5b4e693e"
      }
    },
    permission: {
      "scope.userLocation": {
        "desc": "你的位置信息将用于路线规划"
      }
    }
  }


  componentDidMount () {
    Taro.cloud.init({
      env:"zjf-iqbee"
    })
    let value=Taro.getStorageSync('open_id');
    if(!value){
      Taro.cloud.callFunction({
        name:'getopenid',
        success(res){
          console.log('获取opneid成功',res.result.openid)
          Taro.setStorage({
            key:'open_id',
            data:res.result.openid
          })
        },
        fail(res){
          console.log("获取openid失败")
        }
      })
      // Taro.login({
      //   success: res => {
      //     Taro.request({
      //       url:'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+res.code+'&grant_type=authorization_code',
      //       success:function(res){
      //         Taro.setStorage({
      //           key:'open_id',
      //           data:res.data.openid
      //         })
      //       }
      //     })
      //   }
      // })
    }
    this.state.userInfo={}
    // this.state.url='http://localhost:7000'
    this.state.url='http://39.106.149.14:8003'
    // this.state.url='http://192.168.43.113:7000'
    this.state.picUrl='cloud://zjf-iqbee.7a6a-zjf-iqbee-1300515597/'

  }



  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
