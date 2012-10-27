var changeProcessor = require('changeprocessor');

module.exports = changeProcessor(function() {
  
  this.onChange("neutered", function(done) {
    if (this.original === true) {
      throw new Error("You can't un-neuter a dog, what is wrong with you");
    }
    done();
  });
  
  this.onChange("name", function(done) {
    sendRequestForNewCollar(this.updated);
    done();
  });
  
  this.onChange("cell", function(done) {
    requestCellMadeReadyForPuppies(this.updated);
    done();
  });

  this.onChange("dateOfBirth", function(done) {
    if (moment().subtract("weeks", 10) > this.updated) {
      seperateFromOppositeSex();
    }
    done();
  });
});