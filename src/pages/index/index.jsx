import Taro, { Component } from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image, Text} from '@tarojs/components'
import {AtRate, AtIcon, AtSearchBar, AtButton} from "taro-ui";
import './index.scss'
import React from "react";
let key = '3BPBZ-RJDLO-TD6WR-SGQ7O-2IF7V-2QBVI';
let plugin = requirePlugin('routePlan');
let referer = 'TravelInWuhan';   //调用插件的app的名称
const app=getApp();
let id=[]
let distance=[];
let allData=[]

const db=Taro.cloud.database().collection("scenes")

const pic='cloud://zjf-iqbee.7a6a-zjf-iqbee-1300515597/viewPhotos/donghu.jpg'
export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    'enablePullDownRefresh':true,
    onReachBottomDistance:0
  }
  onPullDownRefresh(){
    let that=this;
    db.get({
      success(res){
        for(let i=0;i<res.data.length;i++){
          res.data[i].tags=res.data[i].tags.split(',');
          id.push(res.data[i]._id)
        }
        allData=res.data;
        that.setState({
          data:res.data,
          value:''
        })
        Taro.stopPullDownRefresh()//停止刷新
      }
    })
  }

  constructor(props){
    super(props);
    this.state={
      data:[],
      value:''
    }
  }

  getData(){
    db.where({_id:"5da9de887c213e556140a9a2"}).get({
      success(res){
        console.log(res)
      }
    })
  }

  componentDidMount () {
    let that=this;
    Taro.showToast({
      icon:'loading',
      title:'请稍等...'
    })
    db.get({
      success(res){
        for(let i=0;i<res.data.length;i++){
          res.data[i].tags=res.data[i].tags.split(',');
          id.push(res.data[i]._id)
        }
        allData=res.data
        console.log(allData)
        that.setState({
          data:allData
        })
        console.log(that.state.data)
        Taro.hideToast();
        console.log('aaa')
      }
    })
  }

  componentWillUnmount () {

  }

  componentDidShow () {

  }

  componentDidHide () { }

  handleClickList(index){
    let that=this;
    Taro.navigateTo({
      url:'../detail/detail?id='+that.state.data[index]._id,
    })
  }

  onChangeValue(value){
    this.setState({
      value
    })
  }

  onClear(){
    this.setState({
      data:allData,
      value:''
    })
  }

  onActionClick(){
    // console.log(this.state.value)
    if(this.state.value==''){
      this.setState({
        data:allData,
      })
    }else{
      let dt=[];
      console.log(this.state.value)
      for(let i=0;i<allData.length;i++){
        if(allData[i].name.indexOf(this.state.value)!=-1){
          dt.push(allData[i])
        }
      }
      console.log(dt)
      this.setState({
        data:dt
      })
    }
  }
  render () {
    return (
      <View className='index'>
        <AtSearchBar
          className='searchBar'
          value={this.state.value}
          onChange={this.onChangeValue.bind(this)}
          onActionClick={this.onActionClick.bind(this)}
          onClear={this.onClear.bind(this)}
        />
        {
          this.state.data.length!=0?this.state.data.map((item,index)=>{
            return(
              <View className='listItem' onClick={this.handleClickList.bind(this,index)}>
                <View className='listLeft'>
                  <Image className='listImage' src={app.state.picUrl+item.picPhoto}></Image>
                </View>
                <View className='listRight'>
                  <View className='address'>{item.name}</View>
                  <View className='dist'>{item.simpleAddress}</View>
                  <AtRate className='rate' size='10' value={item.score} />
                  <View className='levelItem'>{item.level}景区</View>
                  <View className='clear'></View>
                  {
                    item.tags.map(item0=>{
                      return(
                        <Text className='tagsItem'>{item0}</Text>
                      )
                    })
                  }
                  <View className='clear'></View>
                  {
                    item.info?<View><AtIcon className='tagIcon' value='clock' size='13' color='#000'></AtIcon>
                      <View className='flagItem'>{item.info}</View></View>:<View><AtIcon className='tagIcon' value='tag' size='13' color='#000'></AtIcon>
                      <View className='flagItem'>{item.flag}</View></View>
                  }

                </View>
              </View>)
          }):null
        }
      </View>
    )
  }
}
