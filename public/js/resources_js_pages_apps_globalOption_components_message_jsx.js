"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_pages_apps_globalOption_components_message_jsx"],{

/***/ "./resources/js/pages/apps/globalOption/components/message.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/pages/apps/globalOption/components/message.jsx ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ message)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/Tab.js");
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-hook-form */ "./node_modules/react-hook-form/dist/index.esm.js");
/* harmony import */ var jodit_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jodit-react */ "./node_modules/jodit-react/build/jodit-react.js");
/* harmony import */ var jodit_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jodit_react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







function message(props) {
  var globalOpt = props.globalOpt,
      register = props.register,
      control = props.control;
  var editor = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var config = {
    readonly: false,
    toolbarSticky: false,
    toolbarButtonSize: "small",
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["default"].Pane, {
    eventKey: "message",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "form-group row mb-2",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "col-sm-4 mt-2",
        children: "Refer To Friend:"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col-sm-8",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_1__.Controller, {
          render: function render(_ref) {
            var field = _ref.field;
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)((jodit_react__WEBPACK_IMPORTED_MODULE_2___default()), _objectSpread(_objectSpread({}, field), {}, {
              ref: editor,
              value: globalOpt.system_message_1,
              config: config
            }));
          },
          control: control,
          name: "system_message_1",
          defaultValue: globalOpt.system_message_1
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "form-group row mb-2",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "col-sm-4 mt-2",
        children: "Password changed:"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col-sm-8",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_1__.Controller, {
          render: function render(_ref2) {
            var field = _ref2.field;
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)((jodit_react__WEBPACK_IMPORTED_MODULE_2___default()), _objectSpread(_objectSpread({}, field), {}, {
              ref: editor,
              value: globalOpt.system_message_2,
              config: config
            }));
          },
          control: control,
          name: "system_message_2",
          defaultValue: globalOpt.system_message_2
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "form-group row mb-2",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "col-sm-4 mt-2",
        children: "Profile updated:"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col-sm-8",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_1__.Controller, {
          render: function render(_ref3) {
            var field = _ref3.field;
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)((jodit_react__WEBPACK_IMPORTED_MODULE_2___default()), _objectSpread(_objectSpread({}, field), {}, {
              ref: editor,
              value: globalOpt.system_message_3,
              config: config
            }));
          },
          control: control,
          name: "system_message_3",
          defaultValue: globalOpt.system_message_3
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "form-group row mb-2",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "col-sm-4 mt-2",
        children: "Forgot password:"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col-sm-8",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_1__.Controller, {
          render: function render(_ref4) {
            var field = _ref4.field;
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)((jodit_react__WEBPACK_IMPORTED_MODULE_2___default()), _objectSpread(_objectSpread({}, field), {}, {
              ref: editor,
              value: globalOpt.system_message_4,
              config: config
            }));
          },
          control: control,
          name: "system_message_4",
          defaultValue: globalOpt.system_message_4
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "form-group row mb-2",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "col-sm-4 mt-2",
        children: "Registration completed:"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col-sm-8",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_1__.Controller, {
          render: function render(_ref5) {
            var field = _ref5.field;
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)((jodit_react__WEBPACK_IMPORTED_MODULE_2___default()), _objectSpread(_objectSpread({}, field), {}, {
              ref: editor,
              value: globalOpt.system_message_5,
              config: config
            }));
          },
          control: control,
          name: "system_message_5",
          defaultValue: globalOpt.system_message_5
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "form-group row mb-2",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "col-sm-4 mt-2",
        children: "Checkout Terms:"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "col-sm-8",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(react_hook_form__WEBPACK_IMPORTED_MODULE_1__.Controller, {
          render: function render(_ref6) {
            var field = _ref6.field;
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)((jodit_react__WEBPACK_IMPORTED_MODULE_2___default()), _objectSpread(_objectSpread({}, field), {}, {
              ref: editor,
              value: globalOpt.system_message_6,
              config: config
            }));
          },
          control: control,
          name: "system_message_6",
          defaultValue: globalOpt.system_message_6
        })
      })]
    })]
  });
}

/***/ })

}]);