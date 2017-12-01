'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _pikaday = require('pikaday');

var _pikaday2 = _interopRequireDefault(_pikaday);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactPikaday = (0, _createReactClass2.default)({
  displayName: 'ReactPikaday',


  propTypes: {
    value: _propTypes2.default.instanceOf(Date),
    onChange: _propTypes2.default.func,
    initialOptions: _propTypes2.default.object,

    valueLink: _propTypes2.default.shape({
      value: _propTypes2.default.instanceOf(Date),
      requestChange: _propTypes2.default.func.isRequired
    })
  },

  getDefaultProps: function getDefaultProps() {
    return {
      initialOptions: {}
    };
  },

  getValueLink: function getValueLink(props) {
    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange
    };
  },

  setDateIfChanged: function setDateIfChanged(newDate, prevDate) {
    var newTime = newDate ? newDate.getTime() : null;
    var prevTime = prevDate ? prevDate.getTime() : null;

    if (newTime !== prevTime) {
      if (newDate === null) {
        // Workaround for pikaday not clearing value when date set to falsey
        this.refs.pikaday.value = '';
      }
      this._picker.setDate(newDate, true); // 2nd param = don't call onSelect
    }
  },

  // user props to pass down to the underlying DOM node
  getDomProps: function getDomProps() {
    var restProps = {};
    for (var propKey in this.props) {
      if (this.props.hasOwnProperty(propKey) && !ReactPikaday.propTypes[propKey]) {
        restProps[propKey] = this.props[propKey];
      }
    }
    return restProps;
  },

  componentDidMount: function componentDidMount() {
    var el = this.refs.pikaday;

    this._picker = new _pikaday2.default(_extends({
      field: el,
      onSelect: this.getValueLink(this.props).requestChange
    }, this.props.initialOptions));

    this.setDateIfChanged(this.getValueLink(this.props).value);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var newDate = this.getValueLink(nextProps).value;
    var lastDate = this.getValueLink(this.props).value;

    this.setDateIfChanged(newDate, lastDate);
  },

  render: function render() {
    return _react2.default.createElement('input', _extends({ type: 'text', ref: 'pikaday' }, this.getDomProps()));
  }
});

exports.default = ReactPikaday;