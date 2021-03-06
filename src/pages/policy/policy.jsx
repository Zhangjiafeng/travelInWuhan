import { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import './policy.scss'
export default class Policy extends Component {
  config = {
    navigationBarTitleText: '隐私政策',
  }

  componentWillMount () {

  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  render () {
    return (
      <View className='policy'>
        <View className='title'>隐私权政策</View>
        <View className='smallTitle'>提示条款:</View>
        <View className='content'>
          您的信任对我们非常重要，我们深知个人信息对您的重要性，我们将按照法律规范要求，采取相应的安全措施，尽力保护您的个人信息安全可控。鉴此，我们制定相关政策并提醒您：
        </View>
        <View className='smallTitle'>本政策将帮助您了解以下内容：</View>
        <View className='smallTitle'>我们会出于本政策所述的目的，收集和使用您的个人信息。</View>
        <View className='ulTitle'>1.为您展示和推送相关的服务。</View>
        <View className='content'>1) 您向我们提供的信息有您的微信账号基本信息以及您的位置信息。</View>
        <View className='content'>2) 为了便于为您推荐行车路线，我们需要获取您的所在位置；此外，为了将您与其他用户进行区分，我们需要获取唯一可以确定您身份的openid以及您的用户基本信息。</View>
        <View className='ulTitle'>2.为您提供安全保障</View>
        <View className='content'>为了提高您使用该产品的安全性，确保操作环境的安全与识别账号的一场状态，更好的保护您或其他用户或公众的人身财产安全免遭侵害，更好地预防钓鱼网站、诈骗、网络漏洞、计算机病毒、网络攻击、网络侵入等安全风险，更准确地识别违反法律法规，我们可能使用或整合您的信息来综合判断您的账户以及交易风险。</View>
        <View className='ulTitle'>3.其他用途</View>
        <View className='content'>我们可能对收集的信息进行去标识化的研究、统计分析和预测，用于改善产品所提供的相关服务。例如用于使用匿名数据进行机器学习或者模型化算法训练。</View>
      </View>
    )
  }
}
