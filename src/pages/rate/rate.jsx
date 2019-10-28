import Taro, {Component, uploadFile} from '@tarojs/taro'
import {Image, Text, View} from '@tarojs/components'
import { AtTextarea, AtRate, AtImagePicker, AtButton,AtToast} from 'taro-ui'
import './rate.scss'
let app=getApp();
let datas={};
const userDb=Taro.cloud.database().collection("users_scenes");
export default class Rate extends Component {
  config = {
    navigationBarTitleText: '发表评价',
  }

  constructor(props){
    super(props)
    this.state={
      Data:{},
      textValue:'',  // 评论的文本内容
      starValue:5,  // 整体评分的默认星数
      photoFiles:[] , // 上传的照片文件,
      info:{},
      open:false
    }
  }

  componentWillMount () {
    datas=this.$router.params;
    // console.log(datas)
    this.setState({
      info:datas
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () {

  }

  componentDidHide () { }

  handleTextChange (event) {
    this.setState({
      textValue: event.target.value
    })
  }

  handleStarChange (value) {
    this.setState({
      starValue: value
    })
  }

  onPhotoChange (files) {
    this.setState({
      photoFiles: files
    })
  }

  uploadFiles(i,sum,ratePhotos){
    let that=this;
    if(i===sum){
      if(that.state.textValue==''){
        Taro.hideLoading()
        Taro.showModal({
          title:'提示',
          content:'评论文字不能为空',
          showCancel:false
        })
      }else {
        Taro.getStorage({
          key: 'open_id',
          success(res) {
            let Data = {};
            Data.openId = res.data;
            Data.id = datas.id;
            Data.score = that.state.starValue;
            Data.comment = that.state.textValue;
            Data.photos = ratePhotos;
            userDb.where({
              openId:Data.openId,
              scenesId:Data.id
            }).get({
              success(res){
                userDb.doc(res.data[0]._id).update({
                  data:{
                    score:Data.score,
                    comment:Data.comment,
                    photos:Data.photos,
                    isAbleToRate:0
                  },
                  success(res){

                    Taro.hideLoading()
                    Taro.showModal({
                      title:'提示',
                      content:'评价成功！',
                      showCancel:false,
                      success(){
                        Taro.navigateBack({
                          url:'../record/record'
                        })
                      }
                    })
                  }
                })
              },
            })
           }
        })
      }
    }else{
      const filePath=that.state.photoFiles[i].url;
      let pos=filePath.lastIndexOf('.');
      let ext=filePath.substr(pos,filePath.length)

      Taro.cloud.uploadFile({
        cloudPath:'upload/'+Date.parse(new Date())+ext,
        filePath:that.state.photoFiles[i].url,
        success:res=>{
          const data=res.fileID;
          ratePhotos.push(data)
          that.uploadFiles(i+1,sum,ratePhotos)
        },
        fail: res=>{

        }
      })
    }

  }

  submit(){
    Taro.showLoading({
      title:'请稍候',
      icon:'loading'
    })
    this.uploadFiles(0,this.state.photoFiles.length,[]);
  }


  render () {
    return (

      <View className='rate'>
        <View className='head'>
          <Image className='headPic' src={app.state.picUrl+this.state.info.pic}></Image>
          <Text className='headText'>{this.state.info.name}</Text>
          <AtButton className='headBtn' type='primary' onClick={this.submit.bind(this)}>发表</AtButton>
        </View>
        <View style={{clear:'both'}}></View>
        <View className='sceneryInfo'>
          {/*这里可以选择添加所评论风景的信息*/}
        </View>
        <View className='star'>
          <Text className='starText'>整体评分</Text>
          <AtRate
            className='starRate'
            value={this.state.starValue}
            onChange={this.handleStarChange.bind(this)}
            size={18}
            margin={20}
          />
        </View>
        <View className='comment'>
          <AtTextarea
            value={this.state.textValue}
            onChange={this.handleTextChange.bind(this)}
            maxLength={200}
            height={160}
            placeholder={'说说你的旅游体验吧...'}
          />
        </View>
        <View className='addPicText'>添加图片</View>
        <View className='photo'>
          {
            this.state.photoFiles.length === 9
              ? <AtImagePicker
                  length={3}
                  files={this.state.photoFiles}
                  onChange={this.onPhotoChange.bind(this)}
                  showAddBtn={false}
                />
              : <AtImagePicker
                  count={9-this.state.photoFiles.length}
                  length={3}
                  files={this.state.photoFiles}
                  onChange={this.onPhotoChange.bind(this)}
                />
          }
        </View>

      </View>
    )
  }
}
