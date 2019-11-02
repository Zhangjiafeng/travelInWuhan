"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var key = '3BPBZ-RJDLO-TD6WR-SGQ7O-2IF7V-2QBVI';
var app = getApp();
var db = _index2.default.cloud.database().collection("scenes");
var sum = 0;

var Routes = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Routes, _BaseComponent);

  function Routes() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Routes);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Routes.__proto__ || Object.getPrototypeOf(Routes)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "$compid__19", "$compid__20", "$compid__21", "isShowModal", "season", "day", "markers", "polyline", "data", "points", "leftPoints"], _this.config = {
      navigationBarTitleText: '路线推荐'
    }, _this.customComponents = ["AtModal", "AtModalHeader", "AtModalContent", "AtInputNumber", "AtRadio", "AtModalAction"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Routes, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Routes.prototype.__proto__ || Object.getPrototypeOf(Routes.prototype), "_constructor", this).call(this, props);
      this.state = {
        isShowModal: false,
        season: '春季',
        day: 1,
        markers: [],
        polyline: {},
        data: [],
        points: [],
        leftPoints: []
      };
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "GetDistance",
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
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var that = this;
      _index2.default.showToast({
        icon: 'loading',
        title: '请稍后'
      });
      db.get({
        success: function success(res2) {
          _index2.default.getLocation({
            type: 'wgs84',
            success: function success(res1) {
              var latitude = res1.latitude;
              var longitude = res1.longitude;

              // let str = 'https://apis.map.qq.com/ws/distance/v1/?mode=driving&from=' + latitude + ',' + longitude + '&to=';
              // for (let i = 0; i < res2.data.length; i++) {
              //   if (i != res2.data.length - 1)
              //     str += res2.data[i].position + ';';
              //   else
              //     str += res2.data[i].position
              // }
              // str += '&key=' + key

              for (var _i = 0; _i < res2.data.length; _i++) {
                res2.data[_i].latitude = res2.data[_i].position.split(',')[0];
                res2.data[_i].longitude = res2.data[_i].position.split(',')[1];
                res2.data[_i].distance = that.GetDistance(latitude, longitude, res2.data[_i].latitude, res2.data[_i].longitude);
              }
              var data = res2.data;
              var flag = 0;
              data.forEach(function (item) {
                item.name = res2.data[flag].name;
                flag++;
              });
              data.sort(function (a, b) {
                return a.distance - b.distance;
              });
              that.setState({
                data: data
              });
              var markers = [];
              var i = 0;
              var points = [];
              points.push({ latitude: latitude, longitude: longitude });
              points.push({ latitude: data[0].latitude, longitude: data[0].longitude });
              that.setState({
                points: points
              });
              var leftPoints = [];
              data.forEach(function (item) {
                if (i != 0) {
                  leftPoints.push({ latitude: data[i].latitude, longitude: data[i].longitude });
                }
                var obj = {
                  id: i,
                  latitude: item.latitude,
                  longitude: item.longitude,
                  label: {
                    content: item.name,
                    color: '#fff', //文本颜色
                    borderRadius: 25, //边框圆角
                    fontSize: 14,
                    borderColor: '#3B8DFD', //边框颜色
                    bgColor: '#3B8DFD', //背景色
                    paddingLeft: 20, //文本边缘留白
                    textAlign: 'center', //文本对齐方式。有效值: left, right, center
                    anchorX: 0,
                    anchorY: -40
                  }
                };
                i++;
                markers.push(obj);
              });
              that.setState({
                markers: markers,
                leftPoints: leftPoints,
                isShowModal: true
              });
              _index2.default.hideToast();
            }
          });
        }
      });
    }
  }, {
    key: "searchRoute",
    value: function searchRoute() {
      this.setState({
        isShowModal: false
      });
      var views = 2 * this.state.day;
      if (views > this.state.data.length) {
        views = this.state.data.length;
      }
      // console.log(this.state.leftPoints)
      var leftPoints = this.state.leftPoints;
      var points = this.state.points;
      console.log('aaa', leftPoints);
      for (var i = 1; i < views; i++) {
        for (var j = 0; j < leftPoints.length; j++) {
          leftPoints[j].distance = this.GetDistance(points[i].latitude, points[i].longitude, leftPoints[j].latitude, leftPoints[j].longitude);
        }
        leftPoints.sort(function (a, b) {
          return a.distance - b.distance;
        });
        points.push(leftPoints[0]);
        leftPoints.shift();
        console.log(leftPoints);
      }
      console.log(points);
      var polyline = [{
        points: points,
        color: '#3B8DFD', width: 5, arrowLine: true
      }];
      this.setState({
        polyline: polyline
      });
      //    this.getPath(2,views,this.state.leftPoints,this.state.points)
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "clickMarker",
    value: function clickMarker(e) {
      console.log(e);
    }
  }, {
    key: "handleClickBtn",
    value: function handleClickBtn() {
      _index2.default.navigateTo({ url: '../routesDetail/routesDetail' });
    }
  }, {
    key: "handleChangeSeason",
    value: function handleChangeSeason(season) {
      this.setState({
        season: season
      });
    }
  }, {
    key: "handleChangeDay",
    value: function handleChangeDay(day) {
      this.setState({
        day: day
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      var $compid__19 = (0, _index.genCompid)(__prefix + "$compid__19");
      var $compid__20 = (0, _index.genCompid)(__prefix + "$compid__20");
      var $compid__21 = (0, _index.genCompid)(__prefix + "$compid__21");
      var anonymousState__temp = { width: '90%' };
      var anonymousState__temp2 = { marginBottom: 20 };
      var anonymousState__temp3 = [{ label: '春季', value: '春季' }, { label: '夏季', value: '夏季' }, { label: '秋季', value: '秋季' }, { label: '冬季', value: '冬季' }];
      _index.propsManager.set({
        "customStyle": anonymousState__temp,
        "isOpened": this.__state.isShowModal,
        "closeOnClickOverlay": false
      }, $compid__19);
      _index.propsManager.set({
        "customStyle": anonymousState__temp2,
        "min": 1,
        "max": 4,
        "step": 1,
        "value": this.__state.day,
        "onChange": this.handleChangeDay.bind(this)
      }, $compid__20);
      _index.propsManager.set({
        "options": anonymousState__temp3,
        "value": this.__state.season,
        "onClick": this.handleChangeSeason.bind(this)
      }, $compid__21);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        anonymousState__temp3: anonymousState__temp3,
        $compid__19: $compid__19,
        $compid__20: $compid__20,
        $compid__21: $compid__21
      });
      return this.__state;
    }
  }]);

  return Routes;
}(_index.Component), _class.$$events = ["clickMarker", "searchRoute"], _class.$$componentPath = "pages/routes/routes", _temp2);
exports.default = Routes;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Routes, true));