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

  addData(){
    console.log('ass')
    db.add({
      data: {
        "_id":"5daf0f7ee7179a022450229b",
        "name": "武汉大学",
        "pics": [
          "/images/detailPhotos/wuhandaxue1.jpeg",
          "/images/detailPhotos/wuhandaxue2.jpeg",
          "/images/detailPhotos/wuhandaxue3.jpg"
        ],
        "picPhoto": "/images/viewsPhotos/wuhandaxue.jpeg",
        "score": 5,
        "time": "24小时全天",
        "level": "校园",
        "tags": "百年名校,绿化很好,985高校,免费",
        "address": "湖北省-武汉市-武昌区-珞珈山路16号",
        "simpleAddress": "武昌区-珞珈山路16号",
        "detail": "武汉大学（Wuhan University），简称\u2018武大\u2019，是由中华人民共和国教育部直属的全国重点大学，是国家首批\u2018双一流\u2019建设高校，985工程、211工程重点建设高校；入选2011计划、111计划、珠峰计划、卓越医生教育培养计划、卓越法律人才教育培养计划、卓越工程师教育培养计划、新工科研究与实践项目、国家级大学生创新创业训练计划、国家大学生创新性实验计划、国家建设高水平大学公派研究生项目、全国深化创新创业教育改革示范高校、中国政府奖学金来华留学生接收院校、首批一流网络安全学院建设示范项目高校、首批学位授权自主审核单位。武汉大学溯源于1893年湖广总督张之洞在武昌创办的自强学堂，历经传承演变，1928年定名国立武汉大学，1949年更为现名。2000年，武汉大学与武汉水利电力大学、武汉测绘科技大学、湖北医科大学合并组建新的武汉大学。据2019年6月学校官网显示，学校占地面积5195亩，建筑面积266万平方米，设有34个学院（系），开设123个本科专业，拥有5个国家重点一级学科、17个国家重点二级学科、6个国家重点（培育）学科、46个一级学科具有博士学位授予权、57个一级学科具有硕士学位授予权、42个博士后流动站、设有三所三级甲等附属医院，有专任教师3700余人，有普通本科生29405人，硕士研究生19699人，博士研究生7163人，另有外国留学生2453人。武汉大学位列2020QS世界大学排名第257位。",
        "position": "30.535444,114.363428",
        "flag": "985高等学府"
      },
      success(res){
        console.log('添加成功')
      }
    })
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
                    item.info?<View><AtIcon className='tagIcon' value='clock' size='15' color='#000'></AtIcon>
                      <View className='flagItem'>{item.info}</View></View>:<View><AtIcon className='tagIcon' value='tag' size='15' color='#000'></AtIcon>
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
