"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../npm/react/index.js");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var key = '3BPBZ-RJDLO-TD6WR-SGQ7O-2IF7V-2QBVI';
var plugin = requirePlugin('routePlan');
var referer = 'TravelInWuhan'; //调用插件的app的名称
var app = getApp();
var id = [];
var distance = [];
var allData = [];

var db = _index2.default.cloud.database().collection("scenes");

var pic = 'cloud://zjf-iqbee.7a6a-zjf-iqbee-1300515597/viewPhotos/donghu.jpg';

var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["loopArray0", "$compid__3", "app", "data", "value"], _this.config = {
      navigationBarTitleText: '首页',
      'enablePullDownRefresh': true,
      onReachBottomDistance: 0
    }, _this.customComponents = ["AtSearchBar", "AtRate", "AtIcon"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "onPullDownRefresh",
    value: function onPullDownRefresh() {
      var that = this;
      db.get({
        success: function success(res) {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].tags = res.data[i].tags.split(',');
            id.push(res.data[i]._id);
          }
          allData = res.data;
          that.setState({
            data: res.data,
            value: ''
          });
          _index2.default.stopPullDownRefresh(); //停止刷新
        }
      });
    }
  }, {
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);
      this.state = {
        data: [],
        value: ''
      };
      this.$$refs = [];
    }
  }, {
    key: "getData",
    value: function getData() {
      db.where({ _id: "5da9de887c213e556140a9a2" }).get({
        success: function success(res) {
          console.log(res);
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var that = this;
      _index2.default.showToast({
        icon: 'loading',
        title: '请稍等...'
      });
      db.get({
        success: function success(res) {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].tags = res.data[i].tags.split(',');
            id.push(res.data[i]._id);
          }
          allData = res.data;
          console.log(allData);
          that.setState({
            data: allData
          });
          console.log(that.state.data);
          _index2.default.hideToast();
          console.log('aaa');
        }
      });
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
    key: "handleClickList",
    value: function handleClickList(index) {
      var that = this;
      _index2.default.navigateTo({
        url: '../detail/detail?id=' + that.state.data[index]._id
      });
    }
  }, {
    key: "onChangeValue",
    value: function onChangeValue(value) {
      this.setState({
        value: value
      });
    }
  }, {
    key: "onClear",
    value: function onClear() {
      this.setState({
        data: allData,
        value: ''
      });
    }
  }, {
    key: "onActionClick",
    value: function onActionClick() {
      // console.log(this.state.value)
      if (this.state.value == '') {
        this.setState({
          data: allData
        });
      } else {
        var dt = [];
        console.log(this.state.value);
        for (var i = 0; i < allData.length; i++) {
          if (allData[i].name.indexOf(this.state.value) != -1) {
            dt.push(allData[i]);
          }
        }
        console.log(dt);
        this.setState({
          data: dt
        });
      }
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      var $compid__3 = (0, _index.genCompid)(__prefix + "$compid__3");
      var loopArray0 = this.__state.data.length != 0 ? this.__state.data.map(function (item, index) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $compid__0 = (0, _index.genCompid)(__prefix + "NdpEdXVjDk" + index);
        _index.propsManager.set({
          "className": "rate",
          "size": "10",
          "value": item.$original.score
        }, $compid__0);
        var $compid__1 = (0, _index.genCompid)(__prefix + "dkvunIbjfB" + index);
        item.$original.info && _index.propsManager.set({
          "className": "tagIcon",
          "value": "clock",
          "size": "13",
          "color": "#000"
        }, $compid__1);
        var $compid__2 = (0, _index.genCompid)(__prefix + "imEpsqjqSl" + index);
        !item.$original.info && _index.propsManager.set({
          "className": "tagIcon",
          "value": "tag",
          "size": "13",
          "color": "#000"
        }, $compid__2);
        return {
          $compid__0: $compid__0,
          $compid__1: $compid__1,
          $compid__2: $compid__2,
          $original: item.$original
        };
      }) : [];
      _index.propsManager.set({
        "className": "searchBar",
        "value": this.__state.value,
        "onChange": this.onChangeValue.bind(this),
        "onActionClick": this.onActionClick.bind(this),
        "onClear": this.onClear.bind(this)
      }, $compid__3);
      Object.assign(this.__state, {
        loopArray0: loopArray0,
        $compid__3: $compid__3,
        app: app
      });
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.$$events = ["handleClickList"], _class.$$componentPath = "pages/index/index", _temp2);
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));