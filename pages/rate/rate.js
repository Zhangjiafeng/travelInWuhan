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
var userDb = _index2.default.cloud.database().collection("users_scenes");

var Rate = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Rate, _BaseComponent);

  function Rate() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Rate);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Rate.__proto__ || Object.getPrototypeOf(Rate)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "$compid__22", "$compid__23", "$compid__24", "$compid__25", "$compid__26", "app", "Data", "textValue", "starValue", "photoFiles", "info", "open"], _this.config = {
      navigationBarTitleText: '发表评价'
    }, _this.customComponents = ["AtButton", "AtRate", "AtTextarea", "AtImagePicker"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Rate, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Rate.prototype.__proto__ || Object.getPrototypeOf(Rate.prototype), "_constructor", this).call(this, props);
      this.state = {
        Data: {},
        textValue: '', // 评论的文本内容
        starValue: 5, // 整体评分的默认星数
        photoFiles: [], // 上传的照片文件,
        info: {},
        open: false
      };
      this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      datas = this.$router.params;
      // console.log(datas)
      this.setState({
        info: datas
      });
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
    key: "handleTextChange",
    value: function handleTextChange(event) {
      this.setState({
        textValue: event.target.value
      });
    }
  }, {
    key: "handleStarChange",
    value: function handleStarChange(value) {
      this.setState({
        starValue: value
      });
    }
  }, {
    key: "onPhotoChange",
    value: function onPhotoChange(files) {
      this.setState({
        photoFiles: files
      });
    }
  }, {
    key: "uploadFiles",
    value: function uploadFiles(i, sum, ratePhotos) {
      var that = this;
      if (i === sum) {
        if (that.state.textValue == '') {
          _index2.default.hideLoading();
          _index2.default.showModal({
            title: '提示',
            content: '评论文字不能为空',
            showCancel: false
          });
        } else {
          _index2.default.getStorage({
            key: 'open_id',
            success: function success(res) {
              var Data = {};
              Data.openId = res.data;
              Data.id = datas.id;
              Data.score = that.state.starValue;
              Data.comment = that.state.textValue;
              Data.photos = ratePhotos;
              userDb.where({
                openId: Data.openId,
                scenesId: Data.id
              }).get({
                success: function success(res) {
                  userDb.doc(res.data[0]._id).update({
                    data: {
                      score: Data.score,
                      comment: Data.comment,
                      photos: Data.photos,
                      isAbleToRate: 0
                    },
                    success: function success(res) {

                      _index2.default.hideLoading();
                      _index2.default.showModal({
                        title: '提示',
                        content: '评价成功！',
                        showCancel: false,
                        success: function success() {
                          _index2.default.navigateBack({
                            url: '../record/record'
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      } else {
        var filePath = that.state.photoFiles[i].url;
        var pos = filePath.lastIndexOf('.');
        var ext = filePath.substr(pos, filePath.length);

        _index2.default.cloud.uploadFile({
          cloudPath: 'upload/' + Date.parse(new Date()) + ext,
          filePath: that.state.photoFiles[i].url,
          success: function success(res) {
            var data = res.fileID;
            ratePhotos.push(data);
            that.uploadFiles(i + 1, sum, ratePhotos);
          },
          fail: function fail(res) {}
        });
      }
    }
  }, {
    key: "submit",
    value: function submit() {
      _index2.default.showLoading({
        title: '请稍候',
        icon: 'loading'
      });
      this.uploadFiles(0, this.state.photoFiles.length, []);
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      var $compid__22 = (0, _index.genCompid)(__prefix + "$compid__22");
      var $compid__23 = (0, _index.genCompid)(__prefix + "$compid__23");
      var $compid__24 = (0, _index.genCompid)(__prefix + "$compid__24");
      var $compid__25 = (0, _index.genCompid)(__prefix + "$compid__25");
      var $compid__26 = (0, _index.genCompid)(__prefix + "$compid__26");
      var anonymousState__temp = (0, _index.internal_inline_style)({ clear: 'both' });
      var anonymousState__temp2 = 9 - this.__state.photoFiles.length;
      _index.propsManager.set({
        "className": "headBtn",
        "type": "primary",
        "onClick": this.submit.bind(this)
      }, $compid__22);
      _index.propsManager.set({
        "className": "starRate",
        "value": this.__state.starValue,
        "onChange": this.handleStarChange.bind(this),
        "size": 18,
        "margin": 20
      }, $compid__23);
      _index.propsManager.set({
        "value": this.__state.textValue,
        "onChange": this.handleTextChange.bind(this),
        "maxLength": 200,
        "height": 160,
        "placeholder": '说说你的旅游体验吧...'
      }, $compid__24);
      this.__state.photoFiles.length === 9 && _index.propsManager.set({
        "length": 3,
        "files": this.__state.photoFiles,
        "onChange": this.onPhotoChange.bind(this),
        "showAddBtn": false
      }, $compid__25);
      !(this.__state.photoFiles.length === 9) && _index.propsManager.set({
        "count": anonymousState__temp2,
        "length": 3,
        "files": this.__state.photoFiles,
        "onChange": this.onPhotoChange.bind(this)
      }, $compid__26);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        $compid__22: $compid__22,
        $compid__23: $compid__23,
        $compid__24: $compid__24,
        $compid__25: $compid__25,
        $compid__26: $compid__26,
        app: app
      });
      return this.__state;
    }
  }]);

  return Rate;
}(_index.Component), _class.$$events = [], _class.$$componentPath = "pages/rate/rate", _temp2);
exports.default = Rate;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Rate, true));