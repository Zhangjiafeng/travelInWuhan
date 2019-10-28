import Taro, {Component, hideLoading} from '@tarojs/taro'
import {Image, Text, View} from '@tarojs/components'
import {AtButton} from "taro-ui";
import './record.scss'
let bg=require('../../images/border.png')
let titleBg=require('../../images/title.png')
let lock=require('../../images/lock.png')
let app=getApp();
let load=0;

const db=Taro.cloud.database()
const _=db.command
export default class Record extends Component {
  config = {
    navigationBarTitleText: '解锁成就',
  }

  constructor(props){
    super(props);
    this.state={
      data:[]
    }
  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () {
    load=0;
    Taro.getStorage({
      key:'userInfo',
      success:(res)=>{
        console.log(res)
        this.setState({
          userInfo:res.data
        })
      }
    })
    let that=this;
    Taro.getStorage({
      key:'open_id',
      success(res){
        let data={
          openId:res.data
        };
        Taro.showToast({
          icon:'loading',
          title:'请稍后'
        })
        db.collection('users_scenes').where({openId:res.data}).get({
          success(res){
            let arr=[];
            let record=res.data;
            for(let i=0;i<res.data.length;i++){
              arr.push(res.data[i].scenesId)
            }
            console.log(arr)
            db.collection('scenes').get({
              success(res){
                let scenes=res.data;
                let data=[];
                scenes.forEach(item=>{
                  let obj={
                    id:item._id,
                    name:item.name,
                    picPhoto:item.picPhoto,
                    unLock:0
                  }
                  data.push(obj)
                })
                for(let i=0;i<data.length;i++){
                  for(let j=0;j<record.length;j++){
                    if(data[i].id==record[j].scenesId){
                      data[i].unLock=1;
                      data[i].isAbleToRate=record[j].isAbleToRate
                    }
                  }
                }
                that.setState({
                  data
                })
                Taro.hideToast();
                load=1;
              }
            })
          }
        })
      }
    })
  }

  touchToRate(item){
    if(item.unLock===0){
      Taro.showModal({
        title:'提示',
        content:'该景点还没有解锁！',
        showCancel:false
      })
    }else if(item.unLock===1){
      Taro.navigateTo({
        url:'../rate/rate?id='+item.id+'&pic='+item.picPhoto+'&name='+item.name
      })
    }
  }

  componentDidHide () { }
  render () {
    return (
      <View>
        {
          load==1?<View className='record'>
            <View className='topBack'>
              <Image className='topBackHead' src={this.state.userInfo.avatarUrl}/>
              <View className='topBackText'><Text>{this.state.userInfo.nickName}</Text></View>
              <View className='topBackPos'>{this.state.userInfo.province} {this.state.userInfo.city}</View>
            </View>
            <View className='confirm'></View>
            <View className='contentTitle'>
              <Image className='titlePic' src={titleBg}></Image>
              <View className='titleTextView'><Text className='titleText'>解锁成就</Text></View>
            </View>
            <View className='content'>
              <View className='nullItem'></View>
              {
                data.map(item => {
                  return (
                    <View className='item'>
                      <Image className='itemBg' src={bg}></Image>
                      <Image className='itemPic' src={app.state.picUrl + item.picPhoto}></Image>
                      {
                        !item.unLock ?
                          <View className='unLock'><Image className='lock' src={lock}></Image></View> : null
                      }
                      {
                        item.isAbleToRate ?
                          <View className='commentItem' onClick={this.touchToRate.bind(this, item)}><View
                            className='commentView'><Text className='commentText'>去评价</Text></View></View> : null
                      }
                    </View>
                  )
                })
              }
            </View>
          </View>:null
        }
      </View>
    )
  }
}
