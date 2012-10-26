changeProcessor = require('changeprocessor')

module.exports = changeProcessor ->
  @.onChange "neutered", (done) ->
    # TODO: Support this
     if (@original == true) 
      throw new Error("You can't un-neuter a dog, what is wrong with you");
    done();

  @.onChange "name", (done) ->
    sendRequestForNewCollar(@.updated); # NOTE - Need updated
    done(); 

  @.onChange "cell", (done) ->
    requestCellMadeReadyForPuppies(@.updated); 
    done(); 

  @.onChange "dateOfBirth", (done) ->
    if (moment().subtract("weeks", 10) > @.updated) 
      # TODO: Triggers change to cell, so need changes to be able to trigger further changes
      seperateFromOppositeSex();

    done();
    

