/**
 * Tests for the Classify.js classifier library.
 */
var Classifier = require('../classify.js');


// Tests the increment or create utility.
exports['test incrementOrCreate'] = function(beforeExit, assert){
    var testObj = new Object();

    Classifier.incrementOrCreate(testObj, "hello");
    Classifier.incrementOrCreate(testObj, "hello");
    Classifier.incrementOrCreate(testObj, "goodbye");

    assert.equal(2, testObj["hello"]);
    assert.equal(1, testObj["goodbye"]);
    assert.isUndefined(testObj["nothing"])
};

// Test no training inputs
exports['test rank#noTrainingExamples'] = function(beforeExit, assert){
  var classifier = new Classifier();
	var group = classifier.rank("Something that should be GROUP-B");

	console.log(JSON.stringify(group));

    assert.equal(0, group.length);
};

// Test rank with training inputs
exports['test rank#withTraining'] = function(beforeExit, assert){
  var classifier = new Classifier();

	classifier.train("GROUP-A", "Some input that belongs in GROUP-A");
	classifier.train("GROUP-A", "Some more input that belongs in GROUP-A");
  classifier.train("GROUP-A", "Another GROUP-A");
	classifier.train("GROUP-B", "Some other input that belongs in GROUP-B");
  classifier.train("GROUP-B", "Some other input that belongs in GROUP-B");

	var rankedGroups = classifier.rank("Some other input that belongs in GROUP-B");

    assert.equal(2, rankedGroups.length);
    assert.equal("GROUP-B", rankedGroups[0].group);
    assert.equal("GROUP-A", rankedGroups[1].group);
};

// Test no training inputs
exports['test classify#noTrainingExamples'] = function(beforeExit, assert){
  var classifier = new Classifier();

	var group = classifier.classify("Something that should be GROUP-B");

    assert.equal("No Matches", group);
};

// Test classify with training inputs
exports['test classify#withTraining'] = function(beforeExit, assert){
  var classifier = new Classifier();

  classifier.train("GROUP-A", "Some input that belongs in GROUP-A");
  classifier.train("GROUP-A", "Some more input that belongs in GROUP-A");
  classifier.train("GROUP-A", "Another GROUP-A");
  classifier.train("GROUP-B", "Some other input that belongs in GROUP-B");
  classifier.train("GROUP-B", "Some other input that belongs in GROUP-B");

	var group = classifier.classify("Something that should be GROUP-B");

    assert.equal("GROUP-B", group);
};
