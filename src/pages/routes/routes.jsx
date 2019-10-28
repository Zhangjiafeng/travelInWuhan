import Taro, { Component } from '@tarojs/taro'
import {AtModal, AtModalHeader, AtModalContent, AtModalAction, AtRadio,AtInputNumber} from "taro-ui";
import './routes.scss'
import {Button, View} from "@tarojs/components";
import index from "babel-plugin-transform-jsx-stylesheet/src";
let key = '3BPBZ-RJDLO-TD6WR-SGQ7O-2IF7V-2QBVI';
const app=getApp();
const db=Taro.cloud.database().collection("scenes")
let sum=0;
export default class Routes extends Component {
  config = {
    navigationBarTitleText: '路线推荐',
  }
  constructor(props){
    super(props)
    this.state={
      isShowModal:false,
      season:'春季',
      day:1,
      markers:[],
      polyline:{},
      data:[],
      points:[],
      leftPoints:[],
    }
  }
  componentWillMount () {}

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
  componentDidMount () {
    let that = this;
    Taro.showToast({
      icon: 'loading',
      title: '请稍后'
    })
    db.get({
      success(res2) {
        Taro.getLocation({
          type: 'wgs84',
          success(res1) {
            const latitude = res1.latitude;
            const longitude = res1.longitude;

            // let str = 'https://apis.map.qq.com/ws/distance/v1/?mode=driving&from=' + latitude + ',' + longitude + '&to=';
            // for (let i = 0; i < res2.data.length; i++) {
            //   if (i != res2.data.length - 1)
            //     str += res2.data[i].position + ';';
            //   else
            //     str += res2.data[i].position
            // }
            // str += '&key=' + key

            for(let i=0;i<res2.data.length;i++){
              res2.data[i].latitude=res2.data[i].position.split(',')[0];
              res2.data[i].longitude=res2.data[i].position.split(',')[1];
              res2.data[i].distance=that.GetDistance(latitude,longitude,res2.data[i].latitude,res2.data[i].longitude);
            }
            let data = res2.data;
            let flag = 0;
            data.forEach(item => {
              item.name = res2.data[flag].name
              flag++;
            })
            data.sort((a, b) => {
              return a.distance - b.distance
            })
            that.setState({
              data
            })
            let markers = [];
            let i = 0;
            let points = [];
            points.push({latitude:latitude,longitude:longitude})
            points.push({latitude: data[0].latitude, longitude: data[0].longitude});
            that.setState({
              points
            })
            let leftPoints = [];
            data.forEach(item => {
              if (i != 0) {
                leftPoints.push({latitude: data[i].latitude, longitude: data[i].longitude})
              }
              let obj = {
                id: i,
                latitude: item.latitude,
                longitude: item.longitude,
                label: {
                  content: item.name,
                  color: '#fff',  //文本颜色
                  borderRadius: 25,  //边框圆角
                  fontSize: 14,
                  borderColor: '#3B8DFD',  //边框颜色
                  bgColor: '#3B8DFD',  //背景色
                  paddingLeft: 20,  //文本边缘留白
                  textAlign: 'center',  //文本对齐方式。有效值: left, right, center
                  anchorX: 0,
                  anchorY: -40,
                }
              }
              i++;
              markers.push(obj)
            })
            that.setState({
              markers,
              leftPoints,
              isShowModal: true
            })
            Taro.hideToast()

          }
        })
      }
    })
  }


  searchRoute(){
    this.setState({
      isShowModal:false
    })
    let views=2*this.state.day;
    if(views>this.state.data.length){
      views=this.state.data.length
    }
    // console.log(this.state.leftPoints)
    let leftPoints=this.state.leftPoints;
    let points=this.state.points;
    console.log('aaa',leftPoints)
    for(let i=1;i<views;i++){
      for(let j=0;j<leftPoints.length;j++){
        leftPoints[j].distance=this.GetDistance(points[i].latitude,points[i].longitude,leftPoints[j].latitude,leftPoints[j].longitude);
      }
      leftPoints.sort((a,b)=>{
        return a.distance-b.distance;
      })
      points.push(leftPoints[0])
      leftPoints.shift();
      console.log(leftPoints)
    }
    console.log(points)
    let polyline=[{
      points:points,
      color:'#3B8DFD',width:5,arrowLine:true
    }]
    this.setState({
      polyline
    })
//    this.getPath(2,views,this.state.leftPoints,this.state.points)

  }
  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  clickMarker(e){
    console.log(e)
  }

  handleClickBtn(){
    Taro.navigateTo({url:'../routesDetail/routesDetail'})
  }

  handleChangeSeason(season){
    this.setState({
      season
    })
  }
  handleChangeDay(day){
    this.setState({
      day
    })
  }



  render () {
    return (
      <View className='routes'>
        {this.state.markers.length!=0?<Map longitude="114.4"
             latitude="30.5"
             scale="12"
             bindcontroltap="controltap"
             markers={this.state.markers}
             onMarkerTap={this.clickMarker.bind(this)}
             show-location={true}
             polyline={this.state.polyline}
             show-compass={true}
             show-scale={true}
             enable-3D={true}
             include-points={true}
             style="width: 100%; height: 100%;"></Map>:null}
        <AtModal customStyle={{width:'90%'}} isOpened={this.state.isShowModal} closeOnClickOverlay={false}>
          <AtModalHeader>请选择季节和时间</AtModalHeader>
          <AtModalContent>
            天数：<AtInputNumber
              customStyle={{marginBottom:20}}
              min={1}
              max={4}
              step={1}
              value={this.state.day}
              onChange={this.handleChangeDay.bind(this)}
            />
            <View className='divideLine'></View>
            季节：<AtRadio
              options={[
                { label: '春季', value: '春季' },
                { label: '夏季', value: '夏季' },
                { label: '秋季', value: '秋季' },
                { label: '冬季', value: '冬季'}
              ]}
              value={this.state.season}
              onClick={this.handleChangeSeason.bind(this)}
            />
          </AtModalContent>
          <AtModalAction> <Button onClick={this.searchRoute.bind(this)}>确定</Button> </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
