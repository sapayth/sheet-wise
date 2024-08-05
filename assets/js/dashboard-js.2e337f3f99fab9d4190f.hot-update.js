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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Settings)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navigation */ \"./src/js/components/Navigation.js\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ \"./node_modules/@wordpress/i18n/build-module/index.js\");\n/* harmony import */ var _DynamicComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DynamicComponent */ \"./src/js/components/DynamicComponent.js\");\n\n\n\n\n\nfunction Settings() {\n  const [activeComponent, setActiveComponent] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('ListTable');\n  // const [pageTitle, setPageTitle] = useState( __( 'Integrations', 'swise' ) );\n  // const [buttonText, setButtonText] = useState( __( 'Add New', 'swise' ) );\n  //\n  // if (activeComponent === 'NewIntegration') {\n  //     setPageTitle( __( 'Add New Integration', 'swise' ) );\n  //     setButtonText( __( 'Back', 'swise' ) );\n  // }\n\n  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Navigation__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    version: swiseDashboard.version\n  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", {\n    className: \"wrap\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"h1\", {\n    className: \"wp-heading-inline\"\n  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Integrations', 'swise')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"button\", {\n    onClick: () => setActiveComponent(activeComponent === 'ListTable' ? 'NewIntegration' : 'ListTable'),\n    className: \"page-title-action\"\n  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add New', 'swise')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DynamicComponent__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    is: activeComponent\n  })));\n}\n\n//# sourceURL=webpack://my-react-plugin/./src/js/components/Dashboard.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("0cd357ceb72675003687")
/******/ })();
/******/ 
/******/ }
);