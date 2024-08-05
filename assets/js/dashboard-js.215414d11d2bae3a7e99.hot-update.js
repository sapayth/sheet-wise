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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\n\n// Component 2: Header with Button\nconst Header = ({\n  onAddIntegration\n}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", {\n  style: {\n    display: 'flex',\n    justifyContent: 'space-between',\n    alignItems: 'center'\n  }\n}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"h2\", null, \"Integrations\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"button\", {\n  onClick: onAddIntegration\n}, \"Add New Integration\"));\n\n// Component 3: Dynamic Content\nconst DynamicContent = ({\n  relations\n}) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", null, relations.length === 0 ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", null, \"Whoops, you haven't created a relation yet. Want to give it a go?\") : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"table\", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"thead\", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"tr\", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"th\", null, \"Title\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"th\", null, \"Data Source\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"th\", null, \"Worksheet\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"th\", null, \"Spreadsheet\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"th\", null, \"ID\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"th\", null, \"Relations\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"th\", null, \"Status\"))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"tbody\", null, relations.map((relation, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"tr\", {\n  key: index\n}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", null, relation.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", null, relation.dataSource), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", null, relation.worksheet), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", null, relation.spreadsheet), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", null, relation.id), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", null, relation.relations), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", null, relation.status))))));\n\n// Main Component\nconst IntegrationPage = () => {\n  const [relations, setRelations] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const handleAddIntegration = () => {\n    // Add a new relation dynamically (for example purposes, we're adding a static relation)\n    const newRelation = {\n      title: 'New Integration',\n      dataSource: 'Worksheet',\n      worksheet: 'Worksheet',\n      spreadsheet: 'Spreadsheet',\n      id: 'Column Title',\n      relations: 'Relations',\n      status: 'Active'\n    };\n    setRelations([...relations, newRelation]);\n  };\n  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Header, {\n    onAddIntegration: handleAddIntegration\n  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(DynamicContent, {\n    relations: relations\n  }));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IntegrationPage);\n\n//# sourceURL=webpack://my-react-plugin/./src/js/components/Dashboard.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7ec329b726c4d7fad5fd")
/******/ })();
/******/ 
/******/ }
);