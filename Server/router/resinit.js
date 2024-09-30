const { Subject } = require("../model/Subject");

async function initializeResults() {
  // Fetch all subjects from the database
  const subjects = await Subject.find({});

  // Initialize results with all subjects
  const results = subjects.map((subject) => ({
    subject: subject._id,
    firstSemester: {
      test1: null,
      test2: null,
      classActivity: null,
      midExam: null,
      finalExam: null,
    },
    secondSemester: {
      test1: null,
      test2: null,
      classActivity: null,
      midExam: null,
      finalExam: null,
    },
  }));

  return results;
}

module.exports = initializeResults;
