'use strict';

var _asyncToGenerator = require('@babel/runtime-corejs3/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime-corejs3/regenerator');
var _JSON$stringify = require('@babel/runtime-corejs3/core-js-stable/json/stringify');
var _extends = require('@babel/runtime-corejs3/helpers/extends');
var _globalThis = require('@babel/runtime-corejs3/core-js/global-this');
var cryptoJs = require('crypto-js');

var uploadServiceURL = "http://localhost:7001";
var docServiceURL = "http://localhost:7002";
var buildServiceURL = "http://localhost:7003";
var config$1 = {
  uploadFileObject: uploadServiceURL + "/upload-object",
  uploadFileText: uploadServiceURL + "/upload-content",
  codeProjectURL: function codeProjectURL(user, name) {
    return docServiceURL + "/code-project/" + user + "/" + name;
  },
  codeProjectBuildURL: function codeProjectBuildURL(user, name) {
    return buildServiceURL + "/build/" + user + "/" + name;
  }
};

var config = process.env.NODE_ENV === "production" ? config$1 : config$1;

function getXUser() {
  if (!_globalThis.localStorage) {
    return '';
  }
  return localStorage.getItem('x-user') || '';
}
var analyzeResponse = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(resp) {
    var status;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          status = resp.status;
          if (!(status >= 200 && status < 300)) {
            _context.next = 13;
            break;
          }
          _context.prev = 2;
          _context.next = 5;
          return resp.json();
        case 5:
          return _context.abrupt("return", _context.sent);
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", {
            message: _context.t0.toString(),
            success: false,
            httpCode: status
          });
        case 11:
          _context.next = 22;
          break;
        case 13:
          if (!(status >= 300 && status < 400)) {
            _context.next = 17;
            break;
          }
          return _context.abrupt("return", {
            success: false,
            message: 'Error: Redirection occured.',
            httpCode: status
          });
        case 17:
          if (!(status >= 400 && status < 500)) {
            _context.next = 21;
            break;
          }
          return _context.abrupt("return", {
            success: false,
            message: "Error: Client side error occured.",
            httpCode: status
          });
        case 21:
          return _context.abrupt("return", {
            success: false,
            message: "Server side error occured.",
            httpCode: status
          });
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 8]]);
  }));
  return function analyzeResponse(_x) {
    return _ref.apply(this, arguments);
  };
}();
var fetchStandrd = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(url, init) {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!init) {
            init = {};
          }
          if (!init.headers) {
            init.headers = {};
          }
          init.headers = _extends({}, init.headers, {
            'x-user': getXUser()
          });
          _context2.t0 = analyzeResponse;
          _context2.next = 6;
          return fetch(url, init);
        case 6:
          _context2.t1 = _context2.sent;
          _context2.next = 9;
          return (0, _context2.t0)(_context2.t1);
        case 9:
          return _context2.abrupt("return", _context2.sent);
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function fetchStandrd(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var CodeProjectService = /*#__PURE__*/function () {
  function CodeProjectService() {
    this.build = new BuildService();
  }
  var _proto = CodeProjectService.prototype;
  _proto.put = /*#__PURE__*/function () {
    var _put = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(user, name, values) {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetchStandrd(config.codeProjectURL(user, name), {
              method: 'PUT',
              headers: {
                'content-type': 'application/json'
              },
              body: _JSON$stringify(values)
            });
          case 2:
            return _context.abrupt("return", _context.sent);
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function put(_x, _x2, _x3) {
      return _put.apply(this, arguments);
    }
    return put;
  }();
  _proto.get = /*#__PURE__*/function () {
    var _get = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(user, name) {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetchStandrd(config.codeProjectURL(user, name), {
              method: 'GET',
              headers: {
                'content-type': 'application/json'
              }
            });
          case 2:
            return _context2.abrupt("return", _context2.sent);
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function get(_x4, _x5) {
      return _get.apply(this, arguments);
    }
    return get;
  }();
  return CodeProjectService;
}();
var BuildService = /*#__PURE__*/function () {
  function BuildService() {}
  var _proto2 = BuildService.prototype;
  _proto2.put = /*#__PURE__*/function () {
    var _put2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(user, name) {
      var resp;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return fetchStandrd(config.codeProjectBuildURL(user, name), {
              method: 'PUT'
            });
          case 2:
            resp = _context3.sent;
            return _context3.abrupt("return", resp);
          case 4:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    function put(_x6, _x7) {
      return _put2.apply(this, arguments);
    }
    return put;
  }();
  return BuildService;
}();

var FileService = /*#__PURE__*/function () {
  function FileService() {}
  var _proto = FileService.prototype;
  _proto.post1 = /*#__PURE__*/function () {
    var _post = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(bucket, ext, content) {
      var hash, finalFileName, res;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            hash = cryptoJs.MD5(content);
            finalFileName = ext ? bucket + "/" + hash + "." + ext : bucket + "/" + hash;
            _context.next = 4;
            return fetchStandrd(config.uploadFileText, {
              headers: {
                'content-type': 'application/json'
              },
              method: 'POST',
              body: _JSON$stringify({
                content: content,
                file: finalFileName
              })
            });
          case 4:
            res = _context.sent;
            return _context.abrupt("return", res);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function post1(_x, _x2, _x3) {
      return _post.apply(this, arguments);
    }
    return post1;
  }();
  _proto.get = /*#__PURE__*/function () {
    var _get = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(url) {
      var resp, text;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            resp = null;
            _context2.prev = 1;
            _context2.next = 4;
            return fetch(url);
          case 4:
            resp = _context2.sent;
            _context2.next = 7;
            return resp.text();
          case 7:
            text = _context2.sent;
            return _context2.abrupt("return", {
              data: text,
              success: true,
              httpCode: resp.status
            });
          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", {
              message: _context2.t0.toString(),
              success: false,
              httpCode: resp ? resp.status : 400
            });
          case 14:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[1, 11]]);
    }));
    function get(_x4) {
      return _get.apply(this, arguments);
    }
    return get;
  }();
  return FileService;
}();

var fileRemote = new FileService();
var codeProjectRemote = new CodeProjectService();

exports.codeProjectRemote = codeProjectRemote;
exports.fileRemote = fileRemote;