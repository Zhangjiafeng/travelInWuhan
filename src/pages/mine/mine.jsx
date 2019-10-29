import Taro, { Component } from '@tarojs/taro'
import {Image, Text, View} from '@tarojs/components'
import {AtRate, AtIcon, AtButton} from "taro-ui";
import './mine.scss'
const app = Taro.getApp();
export default class Mine extends Component {

  constructor(props){
    super(props)
    this.state=({
      userInfo:''
    })
  }
  config = {
    navigationBarTitleText: '我的',
  }

  componentWillMount () {
  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  componentDidShow () {
    Taro.getStorage({
      key:'userInfo',
      success:(res)=>{
        console.log(res)
        this.setState({
          userInfo:res.data
        })
      }
    })

  }

  componentDidHide () { }

  handleClickRecord(){
    if(this.state.userInfo){
      Taro.navigateTo({
        url:'../record/record'
      })
    }else{
      Taro.showModal({
        title:'提示',
        content:'请先去登录！',
        showCancel:false,
      })
    }
  }

  handleClickCall(){
    Taro.makePhoneCall({
      phoneNumber:'18810157762'
    })
  }

  handleClickAboutUs(){
    Taro.showModal({
      title:'信息提示',
      content:'此处省略了一些字',
      showCancel: false
    })
  }

  displayPolicy(){
    Taro.navigateTo({
      url:'../policy/policy'
    })
  }

  handleClickRoutes(){
    if(this.state.userInfo) {
      Taro.navigateTo({
        url: '../routes/routes'
      })
    }else{
      Taro.showModal({
        title:'提示',
        content:'请先去登录！',
        showCancel:false
      })
    }
  }
  login(){
    Taro.navigateTo({
      url:'../login/login'
    })
  }

  outLogin(){
    Taro.showModal({
      title:'提示',
      content:'是否确定退出？',
      success:res=>{
        if(res.confirm){
          Taro.setStorage({
            key:'userInfo',
            data:''
          })
          this.setState({
            userInfo:''
          })
        }else{

        }
      }
    })

  }
  render () {
    return (
      <View className='mine'>
        {
          this.state.userInfo?<View className='topBack'>
            <Image className='topBackHead' src={this.state.userInfo.avatarUrl}/>
            <View className='topBackText'><Text>{this.state.userInfo.nickName}</Text></View>
            <View className={'topBackPos'}>{this.state.userInfo.province} {this.state.userInfo.city}</View>
          </View>:<View onClick={this.login.bind(this)} className='topBack'>
            <Text className='loginOrReg'>登录/注册</Text>
            <Text className='loginIntro'>登录后可体验更多服务</Text>
            <AtIcon className='topBackIcon' value='chevron-right'></AtIcon>
          </View>
        }
        <View className='divideLine'></View>
        <View style={{borderTop:'2px solid #DDD'}} onClick={this.handleClickRecord.bind(this)} className='listItem'>
          <AtIcon className='listIconLeft' value='tags'/>
          <Text className='listText'>打卡记录</Text>
          <AtIcon className='listIconRight' value='chevron-right'/>
        </View>
        <View onClick={this.handleClickRoutes.bind(this)} className='listItem'>
          <AtIcon className='listIconLeft' value='share'/>
          <Text className='listText'>路线推荐</Text>
          <AtIcon className='listIconRight' value='chevron-right'/>
        </View>
        <View onClick={this.handleClickCall.bind(this)} className='listItem'>
          <AtIcon className='listIconLeft' value='phone'/>
          <Text className='listText'>联系客服</Text>
          <AtIcon className='listIconRight' value='chevron-right'/>
        </View>
        <View onClick={this.handleClickAboutUs.bind(this)} className='listItem'>
          <AtIcon className='listIconLeft' value='user'/>
          <Text className='listText'>关于我们</Text>
          <AtIcon className='listIconRight' value='chevron-right'/>
        </View>
        {this.state.userInfo?<AtButton className='outLogin' onClick={this.outLogin.bind(this)} type='primary'>退出登录</AtButton>:null}
        <View className='policy' onClick={this.displayPolicy.bind(this)}>隐私政策</View>
        <View className='edition'>1.0.4</View>
      </View>
    )
  }
}
