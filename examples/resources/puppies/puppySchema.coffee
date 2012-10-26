mustBe = require('rules').mustBe
now = require('rules').now

module.exports = {
  name : mustBe().populated().string( { maxLength: 50 }),
  #dateOfBirth : mustBe().date({ before: now() }); # TODO: Support this
  #neutered: mustBe().boolean(),
  cell: mustBe().string();
}
