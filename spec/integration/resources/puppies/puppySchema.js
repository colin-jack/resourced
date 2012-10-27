var mustBe = require('rules').mustBe;
var now = require('rules').now;

module.exports = {
    name: mustBe().populated().string({
      maxLength: 50
    }),
    cell: mustBe().string()
};