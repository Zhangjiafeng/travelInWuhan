import Taro, {Component, uploadFile} from '@tarojs/taro'
import {Image, Text, View} from '@tarojs/components'
import {AtRate} from "taro-ui";
import './comment.scss'
let app=getApp();
let datas={};
let noMore=require('../../images/noMore.png')
let load=0;
const userDb=Taro.cloud.database().collection("users_scenes");
export default class Comment extends Component {
  config = {
    navigationBarTitleText: '评价',
  }

  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }

  componentWillMount () {
    load=0;
    datas=this.$router.params;
    console.log(datas.id)
    let that=this;
    userDb.where({
      scenesId:datas.id
    }).get({
      success(res){
        // console.log(res)
        let temp=[];
        res.data.map(item=>{
          if(item.comment!='')
            temp.push(item)
        })
        that.setState({
          data:temp
        })
        load=1;
      }
    })
    // Taro.request({
    //   url:app.state.url+'/getComments',
    //   data:{
    //     id:datas.id
    //   },
    //   success(res){
    //     // console.log(res.data)
    //     let temp=[];
    //     res.data.map(item=>{
    //       if(item.comment!='')
    //         temp.push(item)
    //     })
    //     that.setState({
    //       data:temp
    //     })
    //     load=1;
    //   }
    // })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {

  }

  componentDidHide () { }


  render(){
    return (
      <View>
        {
          load==1?<View className='comment'>
            {
              this.state.data.length != 0 ? <View>{
                this.state.data.map((item) => {
                  return (
                    <View className='commentItem'>
                      <View className='userInfo'>
                        <Image className='photo' src={item.avatarUrl}/>
                        <View className='info'>
                          <Text className='infoText'>{item.nickName}</Text>
                          <AtRate className='infoRate' size='12' value={item.score}/>
                        </View>
                      </View>
                      <View style={{clear: "both"}}></View>
                      <View className='commentText'>{item.comment}</View>
                      <View className='commentPics'>
                        {
                          item.photos.map(picItem => {
                            return (
                              <View className='photosView'>
                                <Image mode='aspectFill' className='photos' src={picItem}/>
                              </View>
                            )
                          })
                        }
                      </View>
                      <View style={{clear: "both"}}></View>
                      <View className='bottom'>打卡日期：{item.date}</View>
                    </View>
                  )

                })
              }</View> : <View>
                <Image className='noCommentPic' src={noMore}></Image>
                <View className='noComment'>暂时没有评论</View>
              </View>
            }

          </View>:null
        }
      </View>
    )
  }
}
