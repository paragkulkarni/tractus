"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _dbconnect = _interopRequireDefault(require("./db/dbconnect.js"));
var _cors = _interopRequireDefault(require("cors"));
var json = _bodyParser["default"].json,
  urlencoded = _bodyParser["default"].urlencoded;
var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: '*'
}));
app.use(json());
app.use(urlencoded({
  extended: false
}));
app.get('/list', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var client, q;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _dbconnect["default"].connect();
        case 2:
          client = _context.sent;
          _context.next = 5;
          return client.query('select * from contract_data');
        case 5:
          q = _context.sent;
          res.json(q.rows);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.post('/post', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, title, contract_agg, whose_created, status, client, query;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, contract_agg = _req$body.contract_agg, whose_created = _req$body.whose_created, status = _req$body.status;
          console.log(req.body);
          _context2.prev = 2;
          _context2.next = 5;
          return _dbconnect["default"].connect();
        case 5:
          client = _context2.sent;
          _context2.next = 8;
          return client.query("insert into public.contract_data(title,contract_agg,whose_created,status) values ('".concat(title, "','").concat(contract_agg, "','").concat(whose_created, "','").concat(status, "')"));
        case 8:
          query = _context2.sent;
          console.log(query);
          res.json({
            success: query.rowCount,
            message: "Record is inserted successfully"
          });
          _context2.next = 16;
          break;
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](2);
          res.send(_context2.t0);
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 13]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.listen('3000', function () {
  console.log("Server is started");
});
//# sourceMappingURL=server.js.map