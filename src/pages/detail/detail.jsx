import Taro, { Component } from '@tarojs/taro'
import {View, Swiper, SwiperItem, Image, Text} from '@tarojs/components'
import {AtButton, AtInput, AtRate,AtIcon} from "taro-ui";
import './detail.scss'
import {showToast} from "@tarojs/taro-quickapp/src/api/interactive";

let key = '3BPBZ-RJDLO-TD6WR-SGQ7O-2IF7V-2QBVI';
let plugin = requirePlugin('routePlan');
let referer = 'TravelInWuhan';
let car=require('../../images/car.png')
const app=getApp();
let datas;
let load=0;
const db=Taro.cloud.database().collection("scenes")
const userDb=Taro.cloud.database().collection("users_scenes");
export default class Detail extends Component {

  config = {
    navigationBarTitleText: '详情'
  }
  constructor(props){
    super(props)
    this.state={
      Data:{},
      value:'展开全部',
      detail:''
    }
  }
  componentWillMount () {
    load=0;
    let that=this;
    datas=this.$router.params;
    Taro.showToast({
      icon:'loading',
      duration:10000,
      title:'请稍等'
    })
    db.where({_id:datas.id}).get({
      success(res){
        console.log(res)
        let Data=res.data[0];
        Data.tags=Data.tags.split(',')
        that.setState({
          Data,
          detail:Data.detail.substring(0,85)+'...'
        })
        load=1;
        Taro.hideToast();
        console.log(Data.pics)
      }
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  handleClickGoHere(){
    var that=this;
    Taro.showToast({
      icon:'loading',
      title:'请稍等',
      duration:10000,
    })
    let endPoint = JSON.stringify({  //终点
      'name': that.state.Data.name,
      'latitude': that.state.Data.position.split(',')[0],
      'longitude': that.state.Data.position.split(',')[1],
    });
    Taro.hideToast();
    Taro.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  }

  GetDistance( lat1,  lng1,  lat2,  lng2) {
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
  }
//   }
// // 调用 return的距离单位为km
//   GetDistance(10.0,113.0,12.0,114.0)

  makePhoneCall(){
    Taro.makePhoneCall({
      phoneNumber:'18810157762'
    })
  }
  signIn(){
    let lat,lng;
    lat=this.state.Data.position.split(',')[0];
    lng=this.state.Data.position.split(',')[1];
    let that=this;
    Taro.getStorage({
      key:'userInfo',
      success(res){
        if(res.data!=''){
          let userInfo=res.data;
          Taro.showToast({
            icon:'loading',
            title:'正在校验位置',
            duration:6000,
          })
          Taro.getLocation({
            type: 'wgs84',
            success(res){
              const latitude=res.latitude;
              const longitude=res.longitude;
              const minValue=1.5;
              let val1=Math.abs(lat-latitude)
              let val2=Math.abs(lng-longitude);
              let distance=that.GetDistance(lat,lng,latitude,longitude)
              if(distance<minValue){
                Taro.getStorage({
                  key:'open_id',
                  success(res){
                    let record={};
                    record.openId=res.data;
                    record.scenesId=datas.id;
                    record.nickName=userInfo.nickName;
                    record.avatarUrl=userInfo.avatarUrl;
                    record.isAbleToRate=1;
                    record.score=-1;
                    record.comment='';
                    record.pics=[]
                    let date=new Date();
                    record.date=date.getFullYear().toString()+'-'+(date.getMonth()+1).toString()+'-'+date.getDate().toString();
                    userDb.where({openId:record.openId,scenesId:record.scenesId}).get({
                      success(res){
                        if(res.data.length==0){
                          userDb.add({
                            data:record,
                            success(res){
                              Taro.hideToast();
                              Taro.showModal({
                                title:'提示',
                                content:'打卡成功'
                              })
                            }
                          })
                        }else{
                          Taro.hideToast();
                          Taro.showModal({
                            title:'提示',
                            content:'已经打卡过了'
                          })
                        }
                      }
                    })
                  }
                })
              }else {
                Taro.hideToast()
                Taro.showModal({
                  icon: 'error',
                  title: '打卡失败',
                  content: '您现在的位置并不在对应的景点，无法完成打卡！'
                })
              }

            },
            fail(res){
              console.log(res)
              Taro.hideToast();
              Taro.showModal({
                title:'提示',
                content:res.errMsg
              })
            }
          })
        }else{
          Taro.showModal({
            title:'提示',
            content:'请先登录！',
            showCancel:false,
          })
        }
      },
      fail(err){
        Taro.showModal({
          title:'提示',
          content:'请先登录',
          showCancel:false
        })
      }
    })
  }

  handleDetailChange(){
    let Data=this.state.Data
    if(this.state.value=='展开全部'){
      this.setState({
        detail:Data.detail,
        value:'收起'
      })
    }else{
      this.setState({
        detail:Data.detail.substring(0,87)+'...',
        value:'展开全部'
      })
    }
  }

  displayComment(){
    // console.log('查看评论')
    Taro.navigateTo({
      url:'../comment/comment?id='+this.state.Data._id
    })
  }

  render () {
    return (
      <View>
        {
          load==1?<View className='index'>
            <Swiper
              className='swiper'
              indicatorColor='#999'
              indicatorActiveColor='#333'
              circular
              indicatorDots
              autoplay
            >
              <SwiperItem>
                <View className='swiperItem'><Image className='topBarPic'
                                                    src={app.state.picUrl + this.state.Data.pics[0]}/></View>
              </SwiperItem>
              <SwiperItem>
                <View className='swiperItem'><Image className='topBarPic'
                                                    src={app.state.picUrl + this.state.Data.pics[1]}/></View>
              </SwiperItem>
              <SwiperItem>
                <View className='swiperItem'><Image className='topBarPic'
                                                    src={app.state.picUrl + this.state.Data.pics[2]}/></View>
              </SwiperItem>
            </Swiper>
            <View className='goHereDiv' onClick={this.handleClickGoHere.bind(this)}>
              <AtButton type='primary' className='goHere'>
                <Image className='goHereImg' src={car}/>
                <Text className='goHereText'>去这里</Text>
              </AtButton>
            </View>
            <View className='simpleIntro'>
              <View className='name'>{this.state.Data.name}</View>
              <View className='dist'>
                <Text className='distText'>{this.state.Data.address}</Text>
              </View>
              <View className='otherInfo'>
                <AtRate className='rate' size='10' value={this.state.Data.score}/>
                <Text className='levelItem'>{this.state.Data.level}景区</Text>
                {
                  Data.tags.map((item) => {
                    return (
                      <View className='tagsItem'>{item}</View>
                    )
                  })
                }
              </View>
            </View>
            <View className='detailInfo'>
              <View className='infoTitle'>景区概况</View>
              <View className='infoText'>
                <Text>{this.state.detail}</Text>
              </View>
              <View onClick={this.handleDetailChange.bind(this)} className='detailControl'>{this.state.value}</View>
              <View className='phoneItem' onClick={this.makePhoneCall.bind(this)}>
                <Text className='phoneText'>电话:18810157762</Text>
                <AtIcon className='phoneIcon' value='chevron-right' size='20' color='black'/>
              </View>

              <View className='timeItem'>
                <View className='timeTitle'>营业时间</View>
                <View className='timeContent'>{this.state.Data.time}</View>
              </View>

              <View className='phoneItem' onClick={this.displayComment.bind(this)}>
                <Text className='phoneText'>查看评论</Text>
                <AtIcon className='phoneIcon' value='chevron-right' size='20' color='black'/>
              </View>


            </View>
            <AtButton className='btn' type='primary' onClick={this.signIn.bind(this)}>打卡</AtButton>
          </View>:null
        }
      </View>
    )
  }
}
