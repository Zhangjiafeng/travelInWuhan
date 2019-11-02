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

var bg = "/images/border.png";
var titleBg = "/images/title.png";
var lock = "/images/lock.png";
var app = getApp();
var load = 0;

var db = _index2.default.cloud.database();
var _ = db.command;

var Record = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Record, _BaseComponent);

  function Record() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Record);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Record.__proto__ || Object.getPrototypeOf(Record)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["load", "titleBg", "data", "bg", "app", "lock", "userInfo"], _this.config = {
      navigationBarTitleText: '解锁成就'
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Record, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Record.prototype.__proto__ || Object.getPrototypeOf(Record.prototype), "_constructor", this).call(this, props);
      this.state = {
        data: []
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

      load = 0;
      _index2.default.getStorage({
        key: 'userInfo',
        success: function success(res) {
          console.log(res);
          _this2.setState({
            userInfo: res.data
          });
        }
      });
      var that = this;
      _index2.default.getStorage({
        key: 'open_id',
        success: function success(res) {
          var data = {
            openId: res.data
          };
          _index2.default.showToast({
            icon: 'loading',
            title: '请稍后'
          });
          db.collection('users_scenes').where({ openId: res.data }).get({
            success: function success(res) {
              var arr = [];
              var record = res.data;
              for (var i = 0; i < res.data.length; i++) {
                arr.push(res.data[i].scenesId);
              }
              console.log(arr);
              db.collection('scenes').get({
                success: function success(res) {
                  var scenes = res.data;
                  var data = [];
                  scenes.forEach(function (item) {
                    var obj = {
                      id: item._id,
                      name: item.name,
                      picPhoto: item.picPhoto,
                      unLock: 0
                    };
                    data.push(obj);
                  });
                  for (var _i = 0; _i < data.length; _i++) {
                    for (var j = 0; j < record.length; j++) {
                      if (data[_i].id == record[j].scenesId) {
                        data[_i].unLock = 1;
                        data[_i].isAbleToRate = record[j].isAbleToRate;
                      }
                    }
                  }
                  that.setState({
                    data: data
                  });
                  _index2.default.hideToast();
                  load = 1;
                }
              });
            }
          });
        }
      });
    }
  }, {
    key: "touchToRate",
    value: function touchToRate(item) {
      if (item.unLock === 0) {
        _index2.default.showModal({
          title: '提示',
          content: '该景点还没有解锁！',
          showCancel: false
        });
      } else if (item.unLock === 1) {
        _index2.default.navigateTo({
          url: '../rate/rate?id=' + item.id + '&pic=' + item.picPhoto + '&name=' + item.name
        });
      }
    }
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      Object.assign(this.__state, {
        load: load,
        titleBg: titleBg,
        bg: bg,
        app: app,
        lock: lock
      });
      return this.__state;
    }
  }]);

  return Record;
}(_index.Component), _class.$$events = ["touchToRate"], _class.$$componentPath = "pages/record/record", _temp2);
exports.default = Record;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Record, true));