var mustBe = require('rules').mustBe;

module.exports = {
    id: mustBe().numeric().populated()
};