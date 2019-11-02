'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('./npm/@tarojs/taro-weapp/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

var _App = function (_BaseComponent) {
  _inherits(_App, _BaseComponent);

  function _App() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _App.__proto__ || Object.getPrototypeOf(_App)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      pages: ['pages/index/index', 'pages/mine/mine', 'pages/detail/detail', 'pages/login/login', 'pages/policy/policy', 'pages/record/record', 'pages/routes/routes', 'pages/rate/rate', 'pages/comment/comment'],
      window: {
        backgroundTextStyle: 'dark',
        navigationBarBackgroundColor: '#0097FF',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'white'
      },
      tabBar: {
        color: "#000000",
        selectedColor: "#1C9ADC",
        backgroundColor: '#ffffff',
        borderStyle: 'black',
        list: [{
          text: "景点",
          pagePath: "pages/index/index",
          iconPath: "images/index.png",
          selectedIconPath: "images/index-active.png"
        }, {
          text: "我的",
          pagePath: "pages/mine/mine",
          iconPath: "images/mine.png",
          selectedIconPath: "images/mine-active.png"
        }]
      },
      plugins: {
        routePlan: {
          version: '1.0.1',
          provider: 'wx50b5593e81dd937a'
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _index2.default.cloud.init({
        env: "zjf-iqbee"
      });
      var value = _index2.default.getStorageSync('open_id');
      if (!value) {
        _index2.default.cloud.callFunction({
          name: 'getopenid',
          success: function success(res) {
            console.log('获取opneid成功', res.result.openid);
            _index2.default.setStorage({
              key: 'open_id',
              data: res.result.openid
            });
          },
          fail: function fail(res) {
            console.log("获取openid失败");
          }
        });
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
      this.state.userInfo = {};
      // this.state.url='http://localhost:7000'
      this.state.url = 'http://39.106.149.14:8003';
      // this.state.url='http://192.168.43.113:7000'
      this.state.picUrl = 'cloud://zjf-iqbee.7a6a-zjf-iqbee-1300515597/';
    }
  }, {
    key: 'componentDidShow',
    value: function componentDidShow() {}
  }, {
    key: 'componentDidHide',
    value: function componentDidHide() {}
  }, {
    key: 'componentDidCatchError',
    value: function componentDidCatchError() {}

    // 在 App 类中的 render() 函数没有实际作用
    // 请勿修改此函数

  }, {
    key: '_createData',
    value: function _createData() {}
  }]);

  return _App;
}(_index.Component);

exports.default = _App;

App(require('./npm/@tarojs/taro-weapp/index.js').default.createApp(_App));
_index2.default.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});