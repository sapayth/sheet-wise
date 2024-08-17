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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ NewIntegration)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ \"./node_modules/@wordpress/api-fetch/build-module/index.js\");\n/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/url */ \"./node_modules/@wordpress/url/build-module/add-query-args.js\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ \"./node_modules/@wordpress/i18n/build-module/index.js\");\n\n\n\n\n\nfunction NewIntegration() {\n  const dataSource = [{\n    id: 'wp-new-user',\n    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wordpress New User', 'sheet-wise'),\n    options: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('User ID', 'sheet-wise'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('User Name', 'sheet-wise'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('User First Name', 'sheet-wise'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('User Last Name', 'sheet-wise')]\n  }, {\n    id: 'wp-user-profile-update',\n    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wordpress User Profile Update', 'sheet-wise')\n  }, {\n    id: 'wp-delete-user',\n    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wordpress Delete User', 'sheet-wise')\n  }, {\n    id: 'wp-user-login',\n    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wordpress User Login', 'sheet-wise')\n  }, {\n    id: 'wp-user-logout',\n    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wordpress User Logout', 'sheet-wise')\n  }, {\n    id: 'wp-new-post',\n    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wordpress New Post', 'sheet-wise')\n  }, {\n    id: 'wp-edit-post',\n    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wordpress Edit Post', 'sheet-wise')\n  }, {\n    id: 'wp-delete-post',\n    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wordpress Delete Post', 'sheet-wise')\n  }, {\n    id: 'wp-page',\n    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wordpress Page', 'sheet-wise')\n  }, {\n    id: 'wp-comment',\n    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wordpress Comment', 'sheet-wise')\n  }, {\n    id: 'wp-edit-comment',\n    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Wordpress Edit Comment', 'sheet-wise')\n  }];\n  const [sheets, setSheets] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [rows, setRows] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [currentSheet, setCurrentSheet] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('select');\n  const [currentSource, setCurrentSource] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('select');\n  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);\n  const [rowLoading, setRowLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);\n  const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const fetchSheets = async () => {\n      let path = '/wp-json/swise/v1/sheets';\n      (0,_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n        path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_3__.addQueryArgs)(path),\n        method: 'GET',\n        headers: {\n          'X-WP-Nonce': swiseDashboard.nonce\n        }\n      }).then(response => {\n        if (response.success) {\n          setSheets(response.files);\n        }\n      }).catch(error => {\n        console.log(error);\n      }).finally(() => {});\n    };\n    fetchSheets();\n  }, []);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const fetchRows = async () => {\n      setRowLoading(true);\n      let path = '/wp-json/swise/v1/sheets/' + currentSheet + '/rows';\n      (0,_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n        path: (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_3__.addQueryArgs)(path),\n        method: 'GET',\n        headers: {\n          'X-WP-Nonce': swiseDashboard.nonce\n        }\n      }).then(response => {\n        if (response.success) {\n          console.log(response.rows);\n          setRows(response.rows);\n        }\n      }).catch(error => {\n        console.log(error);\n      }).finally(() => {\n        setRowLoading(false);\n      });\n    };\n    if (currentSheet !== 'select') {\n      fetchRows();\n    }\n  }, [currentSheet]);\n  const contentRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n  const targetRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);\n  const [targetHeight, setTargetHeight] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const handleResize = () => {\n      const contentHeight = contentRef.current.offsetHeight + 300;\n      const viewportHeight = window.innerHeight;\n      setTargetHeight(viewportHeight - contentHeight);\n      console.log(contentHeight, viewportHeight, viewportHeight - contentHeight);\n    };\n    handleResize();\n    window.addEventListener('resize', handleResize);\n    return () => {\n      window.removeEventListener('resize', handleResize);\n    };\n  }, []);\n  function RowLoading() {\n    if (rowLoading) {\n      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", {\n        ref: targetRef,\n        style: {\n          height: `${targetHeight}px`\n        },\n        className: \"swise-flex swise-items-center swise-justify-center\"\n      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"span\", {\n        className: \"swise-loading swise-loading-dots swise-loading-lg\"\n      }));\n    }\n    return null;\n  }\n  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"div\", {\n    ref: contentRef\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"table\", {\n    className: \"swise-shadow-md sm:swise-rounded-lg swise-w-full swise-mt-12 swise-text-sm swise-text-left swise-text-gray-500\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"tbody\", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"tr\", {\n    className: \"odd:swise-bg-white even:swise-bg-gray-50 swise-border-b\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", {\n    className: \"swise-px-6 swise-py-4 swise-font-medium swise-text-gray-900\"\n  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Integration Title', 'sheet-wise')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", {\n    className: \"swise-px-6 swise-py-4\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"input\", {\n    className: \"swise-font-medium swise-text-gray-900 swise-w-full swise-max-w-full !swise-border-gray-300\",\n    type: \"text\"\n  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"tr\", {\n    className: \"odd:swise-bg-white even:swise-bg-gray-50 swise-border-b\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", {\n    className: \"swise-px-6 swise-py-4 swise-font-medium swise-text-gray-900 swise-whitespace-nowrap\"\n  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Data Source', 'sheet-wise')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", {\n    className: \"swise-px-6 swise-py-4\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"select\", {\n    name: \"DataSourceID\",\n    id: \"DataSourceID\",\n    className: \"swise-bg-gray-50 swise-border !swise-border-gray-300 swise-text-gray-900 swise-text-sm swise-rounded-lg focus:swise-ring-blue-500 focus:swise-border-blue-500 swise-block swise-p-2.5 swise-w-full !swise-max-w-full\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"\"\n  }, \"select ...\"), dataSource.map(source => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    key: source.id,\n    value: source.id\n  }, source.name))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"tr\", {\n    className: \"odd:swise-bg-white even:swise-bg-gray-50 swise-border-b\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", {\n    className: \"swise-px-6 swise-py-4 swise-font-medium swise-text-gray-900 swise-whitespace-nowrap\"\n  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Spreadsheet & Worksheet', 'sheet-wise')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", {\n    className: \"swise-px-6 swise-py-4\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"select\", {\n    id: \"spreadsheet\",\n    value: currentSheet,\n    onChange: e => setCurrentSheet(e.target.value),\n    className: \"swise-bg-gray-50 swise-border !swise-border-gray-300 swise-text-gray-900 swise-text-sm swise-rounded-lg focus:swise-ring-blue-500 focus:swise-border-blue-500 swise-block swise-p-2.5 swise-w-full !swise-max-w-full\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"select\"\n  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select...', 'sheet-wise')), sheets.map(sheet => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    key: sheet.id,\n    value: sheet.id\n  }, sheet.name))))))), rows.length > 0 && !rowLoading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"table\", {\n    className: \"swise-w-full swise-mt-12 swise-text-sm swise-text-left swise-text-gray-500\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"thead\", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"tr\", {\n    className: \"swise-bg-gray-50\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"th\", {\n    className: \"swise-px-6 swise-py-4 swise-font-medium swise-text-gray-900\"\n  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Spreadsheet Column Title', 'sheet-wise')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"th\", {\n    className: \"swise-px-6 swise-py-4 swise-font-medium swise-text-gray-900\"\n  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Event Code', 'sheet-wise')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"th\", {\n    className: \"swise-px-6 swise-py-4 swise-font-medium swise-text-gray-900\"\n  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Data Source', 'sheet-wise')))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"tbody\", null, rows.map((row, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"tr\", {\n    key: index,\n    className: \"odd:swise-bg-white even:swise-bg-gray-50\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", {\n    className: \"swise-px-6 swise-py-4 swise-text-gray-900\"\n  }, row), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", {\n    className: \"swise-px-6 swise-py-4 swise-text-gray-900\"\n  }, \"event code\"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"td\", {\n    className: \"swise-px-6 swise-py-4 swise-text-gray-900\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"select\", {\n    id: \"dataSource\",\n    value: currentSource,\n    onChange: e => setCurrentSource(e.target.value),\n    className: \"swise-bg-gray-50 swise-border !swise-border-gray-300 swise-text-gray-900 swise-text-sm swise-rounded-lg focus:swise-ring-blue-500 focus:swise-border-blue-500 swise-block swise-p-2.5 swise-w-full !swise-max-w-full\"\n  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(\"option\", {\n    value: \"select\"\n  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select...', 'sheet-wise')))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(RowLoading, null));\n}\n\n//# sourceURL=webpack://my-react-plugin/./src/js/components/NewIntegration.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("fba7aec6742f4cb68768")
/******/ })();
/******/ 
/******/ }
);