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

var app = getApp();
var datas = {};
var noMore = "/images/noMore.png";
var load = 0;
var userDb = _index2.default.cloud.database().collection("users_scenes");

var Comment = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Comment, _BaseComponent);

  function Comment() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Comment);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Comment.__proto__ || Object.getPrototypeOf(Comment)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["loopArray3", "load", "noMore", "data"], _this.config = {
      navigationBarTitleText: '评价'
    }, _this.customComponents = ["AtRate"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Comment, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Comment.prototype.__proto__ || Object.getPrototypeOf(Comment.prototype), "_constructor", this).call(this, props);
      this.state = {
        data: []
      };
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      load = 0;
      datas = this.$router.params;
      console.log(datas.id);
      var that = this;
      userDb.where({
        scenesId: datas.id
      }).get({
        success: function success(res) {
          // console.log(res)
          var temp = [];
          res.data.map(function (item) {
            if (item.comment != '') {
              temp.push(item);
            }
          });
          that.setState({
            data: temp
          });
          load = 1;
        }
      });
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
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
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
    key: "_createData",
    value: function _createData() {
      var _this2 = this;

      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      var loopArray3 = this.__state.data.length != 0 ? this.__state.data.map(function (item, _anonIdx3) {
        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp2 = _this2.__state.data.length != 0 ? (0, _index.internal_inline_style)({ clear: "both" }) : null;
        var $loopState__temp4 = _this2.__state.data.length != 0 ? (0, _index.internal_inline_style)({ clear: "both" }) : null;
        var $compid__27 = (0, _index.genCompid)(__prefix + "BaAfVMwhmB" + _anonIdx3);
        load == 1 && _this2.__state.data.length != 0 && _index.propsManager.set({
          "className": "infoRate",
          "size": "12",
          "value": item.$original.score
        }, $compid__27);
        return {
          $loopState__temp2: $loopState__temp2,
          $loopState__temp4: $loopState__temp4,
          $compid__27: $compid__27,
          $original: item.$original
        };
      }) : [];
      Object.assign(this.__state, {
        loopArray3: loopArray3,
        load: load,
        noMore: noMore
      });
      return this.__state;
    }
  }]);

  return Comment;
}(_index.Component), _class.$$events = [], _class.$$componentPath = "pages/comment/comment", _temp2);
exports.default = Comment;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Comment, true));