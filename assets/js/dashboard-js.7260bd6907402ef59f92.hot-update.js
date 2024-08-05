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

/***/ "./src/js/components/NewIntegration.js":
/*!*********************************************!*\
  !*** ./src/js/components/NewIntegration.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NewIntegration)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ \"./node_modules/@wordpress/i18n/build-module/index.js\");\n\n\n\nfunction NewIntegration() {\n  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", {\n    className: \"swise-shadow-md sm:swise-rounded-lg\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"table\", {\n    className: \"swise-w-full swise-mt-12 swise-text-sm swise-text-left swise-text-gray-500\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"tbody\", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"tr\", {\n    className: \"odd:swise-bg-white even:swise-bg-gray-50 swise-border-b\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", {\n    className: \"swise-px-6 swise-py-4 swise-font-medium swise-text-gray-900\"\n  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Integration Title', 'sheet-wise')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", {\n    className: \"swise-px-6 swise-py-4\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"input\", {\n    className: \"swise-font-medium swise-text-gray-900 swise-w-full swise-max-w-full !swise-border-gray-300\",\n    type: \"text\"\n  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"tr\", {\n    className: \"odd:swise-bg-white even:swise-bg-gray-50 swise-border-b\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", {\n    className: \"swise-px-6 swise-py-4 swise-font-medium swise-text-gray-900 swise-whitespace-nowrap\"\n  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Data Source', 'sheet-wise')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", {\n    className: \" swise-px-6 swise-py-4\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"select\", {\n    id: \"countries\",\n    className: \"swise-bg-gray-50 swise-border !swise-border-gray-300 swise-text-gray-900 swise-text-sm swise-rounded-lg focus:swise-ring-blue-500 focus:swise-border-blue-500 swise-block swise-p-2.5 swise-w-full !swise-max-w-full\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    selected: true\n  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select...', 'sheet-wise')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"US\"\n  }, \"United States\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"CA\"\n  }, \"Canada\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"FR\"\n  }, \"France\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"DE\"\n  }, \"Germany\")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"select\", {\n    name: \"DataSourceID\",\n    id: \"DataSourceID\",\n    className: \"swise-bg-gray-50 swise-border !swise-border-gray-300 swise-text-gray-900 swise-text-sm swise-rounded-lg focus:swise-ring-blue-500 focus:swise-border-blue-500 swise-block swise-p-2.5 swise-w-full !swise-max-w-full\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"\"\n  }, \"select ...\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"wordpress_newUser\"\n  }, \"Wordpress New User\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"wordpress_UserProfileUpdate\"\n  }, \"Wordpress User Profile Update\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"wordpress_deleteUser\"\n  }, \"Wordpress Delete User\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"wordpress_userLogin\"\n  }, \"Wordpress User Login\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"wordpress_userLogout\"\n  }, \"Wordpress User Logout\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"wordpress_newPost\"\n  }, \"Wordpress New Post\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"wordpress_editPost\"\n  }, \"Wordpress Edit Post\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"wordpress_deletePost\"\n  }, \"Wordpress Delete Post\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"wordpress_page\"\n  }, \"Wordpress Page\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"wordpress_comment\"\n  }, \"Wordpress Comment\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"wordpress_edit_comment\"\n  }, \"Wordpress Edit Comment\")))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"tr\", {\n    className: \"odd:swise-bg-white even:swise-bg-gray-50 swise-border-b\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", {\n    className: \"swise-px-6 swise-py-4 swise-font-medium swise-text-gray-900 swise-whitespace-nowrap\"\n  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Spreadsheet & Worksheet', 'sheet-wise')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", {\n    className: \"swise-px-6 swise-py-4\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"select\", {\n    id: \"countries\",\n    className: \"swise-bg-gray-50 swise-border !swise-border-gray-300 swise-text-gray-900 swise-text-sm swise-rounded-lg focus:swise-ring-blue-500 focus:swise-border-blue-500 swise-block swise-p-2.5 swise-w-full !swise-max-w-full\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    selected: true\n  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select...', 'sheet-wise')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"US\"\n  }, \"United States\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"CA\"\n  }, \"Canada\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"FR\"\n  }, \"France\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"DE\"\n  }, \"Germany\")))))));\n}\n\n//# sourceURL=webpack://my-react-plugin/./src/js/components/NewIntegration.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("ae0f9313bc5cfdc7f3d5")
/******/ })();
/******/ 
/******/ }
);