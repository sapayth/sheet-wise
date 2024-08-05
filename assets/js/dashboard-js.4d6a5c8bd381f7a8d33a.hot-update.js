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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Settings)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ \"./node_modules/react-dom/client.js\");\n/* harmony import */ var _routes_root_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../routes/root.jsx */ \"./src/js/routes/root.jsx\");\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '../routes/contact'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/dist/index.js\");\n/* harmony import */ var _Navigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Navigation */ \"./src/js/components/Navigation.js\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ \"./node_modules/@wordpress/i18n/build-module/index.js\");\n/* harmony import */ var _DynamicComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DynamicComponent */ \"./src/js/components/DynamicComponent.js\");\n\n\n\n\n\n\nconst router = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.createBrowserRouter)([{\n  path: \"/\",\n  element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_routes_root_jsx__WEBPACK_IMPORTED_MODULE_2__[\"default\"], null)\n}, {\n  path: \"contacts/:contactId\",\n  element: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '../routes/contact'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), null)\n}]);\n\n\n\nfunction Settings() {\n  const [activeComponent, setActiveComponent] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('ListTable');\n  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Navigation__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    version: swiseDashboard.version\n  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.RouterProvider, {\n    router: router\n  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", {\n    className: \"wrap\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"h1\", {\n    className: \"wp-heading-inline\"\n  }, activeComponent === 'ListTable' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Integrations', 'swise') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Add New', 'swise')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"button\", {\n    onClick: () => setActiveComponent(activeComponent === 'ListTable' ? 'NewIntegration' : 'ListTable'),\n    className: \"page-title-action\"\n  }, activeComponent === 'ListTable' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Add New', 'swise') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Back', 'swise')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DynamicComponent__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    is: activeComponent\n  })));\n}\n\n//# sourceURL=webpack://my-react-plugin/./src/js/components/Dashboard.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("d09160a06f6817289480")
/******/ })();
/******/ 
/******/ }
);