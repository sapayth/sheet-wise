"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdatemy_react_plugin"]("dashboard-js",{

/***/ "./src/js/components/Dashboard.js":
/*!****************************************!*\
  !*** ./src/js/components/Dashboard.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Settings)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navigation */ \"./src/js/components/Navigation.js\");\n\n\n\nfunction Settings() {\n  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Navigation__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    version: swiseDashboard.version\n  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"h2\", null, \"hello dashboard....\"));\n}\n\n//# sourceURL=webpack://my-react-plugin/./src/js/components/Dashboard.js?");

/***/ }),

/***/ "./src/js/dashboard.js":
/*!*****************************!*\
  !*** ./src/js/dashboard.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ \"./node_modules/react-dom/client.js\");\n/* harmony import */ var _components_Dashboard_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Dashboard.js */ \"./src/js/components/Dashboard.js\");\n\n\n\n\n// import '../css/settings.css';\n\nreact_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(document.getElementById('swise-dashboard')).render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Dashboard_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null)));\n\n//# sourceURL=webpack://my-react-plugin/./src/js/dashboard.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("0407fc62f6f6b9c54dd9")
/******/ })();
/******/ 
/******/ }
);