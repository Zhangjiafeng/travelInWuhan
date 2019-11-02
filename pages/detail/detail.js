'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require('../../npm/@tarojs/taro-weapp/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var key = '3BPBZ-RJDLO-TD6WR-SGQ7O-2IF7V-2QBVI';
var plugin = requirePlugin('routePlan');
var referer = 'TravelInWuhan';
var car = "/images/car.png";
var app = getApp();
var datas = void 0;
var load = 0;
var db = _index2.default.cloud.database().collection("scenes");
var userDb = _index2.default.cloud.database().collection("users_scenes");

var Detail = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Detail, _BaseComponent);

  function Detail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Detail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Detail.__proto__ || Object.getPrototypeOf(Detail)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["Data", "$compid__14", "$compid__15", "$compid__16", "$compid__17", "$compid__18", "load", "app", "car", "value", "detail"], _this.config = {
      navigationBarTitleText: '详情'
    }, _this.customComponents = ["AtButton", "AtRate", "AtIcon"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Detail, [{
    key: '_constructor',
    value: function _constructor(props) {
      _get(Detail.prototype.__proto__ || Object.getPrototypeOf(Detail.prototype), '_constructor', this).call(this, props);
      this.state = {
        Data: {},
        value: '展开全部',
        detail: ''
      };
      this.$$refs = [];
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      load = 0;
      var that = this;
      datas = this.$router.params;
      _index2.default.showToast({
        icon: 'loading',
        duration: 10000,
        title: '请稍等'
      });
      db.where({ _id: datas.id }).get({
        success: function success(res) {
          console.log(res);
          var Data = res.data[0];
          Data.tags = Data.tags.split(',');
          that.setState({
            Data: Data,
            detail: Data.detail.substring(0, 85) + '...'
          });
          load = 1;
          _index2.default.hideToast();
          console.log(Data.pics);
        }
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'componentDidShow',
    value: function componentDidShow() {}
  }, {
    key: 'componentDidHide',
    value: function componentDidHide() {}
  }, {
    key: 'handleClickGoHere',
    value: function handleClickGoHere() {
      var that = this;
      _index2.default.showToast({
        icon: 'loading',
        title: '请稍等',
        duration: 10000
      });
      var endPoint = JSON.stringify({ //终点
        'name': that.state.Data.name,
        'latitude': that.state.Data.position.split(',')[0],
        'longitude': that.state.Data.position.split(',')[1]
      });
      _index2.default.hideToast();
      _index2.default.navigateTo({
        url: "plugin://routePlan/index?key=3BPBZ-RJDLO-TD6WR-SGQ7O-2IF7V-2QBVI&referer=TravelInWuhan&endPoint=" + endPoint
      });
    }
  }, {
    key: 'GetDistance',
    value: function GetDistance(lat1, lng1, lat2, lng2) {
      var radLat1 = lat1 * Math.PI / 180.0;
      var radLat2 = lat2 * Math.PI / 180.0;
      var a = radLat1 - radLat2;
      var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
      s = s * 6378.137; // EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000;
      return s;
    }
    //   }
    // // 调用 return的距离单位为km
    //   GetDistance(10.0,113.0,12.0,114.0)

  }, {
    key: 'makePhoneCall',
    value: function makePhoneCall() {
      _index2.default.makePhoneCall({
        phoneNumber: '18810157762'
      });
    }
  }, {
    key: 'signIn',
    value: function signIn() {
      var lat = void 0,
          lng = void 0;
      lat = this.state.Data.position.split(',')[0];
      lng = this.state.Data.position.split(',')[1];
      var that = this;
      _index2.default.getStorage({
        key: 'userInfo',
        success: function success(res) {
          if (res.data != '') {
            var userInfo = res.data;
            _index2.default.showToast({
              icon: 'loading',
              title: '正在校验位置',
              duration: 6000
            });
            _index2.default.getLocation({
              type: 'wgs84',
              success: function success(res) {
                var latitude = res.latitude;
                var longitude = res.longitude;
                var minValue = 1.5;
                var val1 = Math.abs(lat - latitude);
                var val2 = Math.abs(lng - longitude);
                var distance = that.GetDistance(lat, lng, latitude, longitude);
                if (distance < minValue) {
                  _index2.default.getStorage({
                    key: 'open_id',
                    success: function success(res) {
                      var record = {};
                      record.openId = res.data;
                      record.scenesId = datas.id;
                      record.nickName = userInfo.nickName;
                      record.avatarUrl = userInfo.avatarUrl;
                      record.isAbleToRate = 1;
                      record.score = -1;
                      record.comment = '';
                      record.pics = [];
                      var date = new Date();
                      record.date = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString();
                      userDb.where({ openId: record.openId, scenesId: record.scenesId }).get({
                        success: function success(res) {
                          if (res.data.length == 0) {
                            userDb.add({
                              data: record,
                              success: function success(res) {
                                _index2.default.hideToast();
                                _index2.default.showModal({
                                  title: '提示',
                                  content: '打卡成功'
                                });
                              }
                            });
                          } else {
                            _index2.default.hideToast();
                            _index2.default.showModal({
                              title: '提示',
                              content: '已经打卡过了'
                            });
                          }
                        }
                      });
                    }
                  });
                } else {
                  _index2.default.hideToast();
                  _index2.default.showModal({
                    icon: 'error',
                    title: '打卡失败',
                    content: '您现在的位置并不在对应的景点，无法完成打卡！'
                  });
                }
              },
              fail: function fail(res) {
                console.log(res);
                _index2.default.hideToast();
                _index2.default.showModal({
                  title: '提示',
                  content: res.errMsg
                });
              }
            });
          } else {
            _index2.default.showModal({
              title: '提示',
              content: '请先登录！',
              showCancel: false
            });
          }
        },
        fail: function fail(err) {
          _index2.default.showModal({
            title: '提示',
            content: '请先登录',
            showCancel: false
          });
        }
      });
    }
  }, {
    key: 'handleDetailChange',
    value: function handleDetailChange() {
      var Data = this.state.Data;
      if (this.state.value == '展开全部') {
        this.setState({
          detail: Data.detail,
          value: '收起'
        });
      } else {
        this.setState({
          detail: Data.detail.substring(0, 87) + '...',
          value: '展开全部'
        });
      }
    }
  }, {
    key: 'displayComment',
    value: function displayComment() {
      // console.log('查看评论')
      _index2.default.navigateTo({
        url: '../comment/comment?id=' + this.state.Data._id
      });
    }
  }, {
    key: '_createData',
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      var $compid__14 = (0, _index.genCompid)(__prefix + "$compid__14");
      var $compid__15 = (0, _index.genCompid)(__prefix + "$compid__15");
      var $compid__16 = (0, _index.genCompid)(__prefix + "$compid__16");
      var $compid__17 = (0, _index.genCompid)(__prefix + "$compid__17");
      var $compid__18 = (0, _index.genCompid)(__prefix + "$compid__18");
      load == 1 && _index.propsManager.set({
        "type": "primary",
        "className": "goHere"
      }, $compid__14);
      load == 1 && _index.propsManager.set({
        "className": "rate",
        "size": "10",
        "value": this.__state.Data.score
      }, $compid__15);
      load == 1 && _index.propsManager.set({
        "className": "phoneIcon",
        "value": "chevron-right",
        "size": "20",
        "color": "black"
      }, $compid__16);
      load == 1 && _index.propsManager.set({
        "className": "phoneIcon",
        "value": "chevron-right",
        "size": "20",
        "color": "black"
      }, $compid__17);
      load == 1 && _index.propsManager.set({
        "className": "btn",
        "type": "primary",
        "onClick": this.signIn.bind(this)
      }, $compid__18);
      Object.assign(this.__state, {
        $compid__14: $compid__14,
        $compid__15: $compid__15,
        $compid__16: $compid__16,
        $compid__17: $compid__17,
        $compid__18: $compid__18,
        load: load,
        app: app,
        car: car
      });
      return this.__state;
    }
  }]);

  return Detail;
}(_index.Component), _class.$$events = ["handleClickGoHere", "handleDetailChange", "makePhoneCall", "displayComment"], _class.$$componentPath = "pages/detail/detail", _temp2);
exports.default = Detail;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Detail, true));