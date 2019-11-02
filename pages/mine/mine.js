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

var app = _index2.default.getApp();

var Mine = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Mine, _BaseComponent);

  function Mine() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Mine);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Mine.__proto__ || Object.getPrototypeOf(Mine)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "$compid__30", "$compid__31", "$compid__32", "$compid__33", "$compid__34", "$compid__35", "$compid__36", "$compid__37", "$compid__38", "$compid__39", "userInfo"], _this.config = {
      navigationBarTitleText: '我的'
    }, _this.customComponents = ["AtIcon", "AtButton"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Mine, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Mine.prototype.__proto__ || Object.getPrototypeOf(Mine.prototype), "_constructor", this).call(this, props);
      this.state = {
        userInfo: ''
      };
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {
      var _this2 = this;

      _index2.default.getStorage({
        key: 'userInfo',
        success: function success(res) {
          console.log(res);
          _this2.setState({
            userInfo: res.data
          });
        }
      });
    }
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "handleClickRecord",
    value: function handleClickRecord() {
      if (this.state.userInfo) {
        _index2.default.navigateTo({
          url: '../record/record'
        });
      } else {
        _index2.default.showModal({
          title: '提示',
          content: '请先去登录！',
          showCancel: false
        });
      }
    }
  }, {
    key: "handleClickCall",
    value: function handleClickCall() {
      _index2.default.makePhoneCall({
        phoneNumber: '18810157762'
      });
    }
  }, {
    key: "handleClickAboutUs",
    value: function handleClickAboutUs() {
      _index2.default.showModal({
        title: '信息提示',
        content: '此处省略了一些字',
        showCancel: false
      });
    }
  }, {
    key: "displayPolicy",
    value: function displayPolicy() {
      _index2.default.navigateTo({
        url: '../policy/policy'
      });
    }
  }, {
    key: "handleClickRoutes",
    value: function handleClickRoutes() {
      if (this.state.userInfo) {
        _index2.default.navigateTo({
          url: '../routes/routes'
        });
      } else {
        _index2.default.showModal({
          title: '提示',
          content: '请先去登录！',
          showCancel: false
        });
      }
    }
  }, {
    key: "login",
    value: function login() {
      _index2.default.navigateTo({
        url: '../login/login'
      });
    }
  }, {
    key: "outLogin",
    value: function outLogin() {
      var _this3 = this;

      _index2.default.showModal({
        title: '提示',
        content: '是否确定退出？',
        success: function success(res) {
          if (res.confirm) {
            _index2.default.setStorage({
              key: 'userInfo',
              data: ''
            });
            _this3.setState({
              userInfo: ''
            });
          }
        }
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
      var $compid__30 = (0, _index.genCompid)(__prefix + "$compid__30");
      var $compid__31 = (0, _index.genCompid)(__prefix + "$compid__31");
      var $compid__32 = (0, _index.genCompid)(__prefix + "$compid__32");
      var $compid__33 = (0, _index.genCompid)(__prefix + "$compid__33");
      var $compid__34 = (0, _index.genCompid)(__prefix + "$compid__34");
      var $compid__35 = (0, _index.genCompid)(__prefix + "$compid__35");
      var $compid__36 = (0, _index.genCompid)(__prefix + "$compid__36");
      var $compid__37 = (0, _index.genCompid)(__prefix + "$compid__37");
      var $compid__38 = (0, _index.genCompid)(__prefix + "$compid__38");
      var $compid__39 = (0, _index.genCompid)(__prefix + "$compid__39");
      var anonymousState__temp = (0, _index.internal_inline_style)({ borderTop: '2px solid #DDD' });
      !this.__state.userInfo && _index.propsManager.set({
        "className": "topBackIcon",
        "value": "chevron-right"
      }, $compid__30);
      _index.propsManager.set({
        "className": "listIconLeft",
        "value": "tags"
      }, $compid__31);
      _index.propsManager.set({
        "className": "listIconRight",
        "value": "chevron-right"
      }, $compid__32);
      _index.propsManager.set({
        "className": "listIconLeft",
        "value": "share"
      }, $compid__33);
      _index.propsManager.set({
        "className": "listIconRight",
        "value": "chevron-right"
      }, $compid__34);
      _index.propsManager.set({
        "className": "listIconLeft",
        "value": "phone"
      }, $compid__35);
      _index.propsManager.set({
        "className": "listIconRight",
        "value": "chevron-right"
      }, $compid__36);
      _index.propsManager.set({
        "className": "listIconLeft",
        "value": "user"
      }, $compid__37);
      _index.propsManager.set({
        "className": "listIconRight",
        "value": "chevron-right"
      }, $compid__38);
      this.__state.userInfo && _index.propsManager.set({
        "className": "outLogin",
        "onClick": this.outLogin.bind(this),
        "type": "primary"
      }, $compid__39);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        $compid__30: $compid__30,
        $compid__31: $compid__31,
        $compid__32: $compid__32,
        $compid__33: $compid__33,
        $compid__34: $compid__34,
        $compid__35: $compid__35,
        $compid__36: $compid__36,
        $compid__37: $compid__37,
        $compid__38: $compid__38,
        $compid__39: $compid__39
      });
      return this.__state;
    }
  }]);

  return Mine;
}(_index.Component), _class.$$events = ["login", "handleClickRecord", "handleClickRoutes", "handleClickCall", "handleClickAboutUs", "displayPolicy"], _class.$$componentPath = "pages/mine/mine", _temp2);
exports.default = Mine;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Mine, true));