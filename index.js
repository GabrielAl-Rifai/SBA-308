

// The provided course information.
const courseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const assignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const learnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, assignmentGroup, submissions) {
  // here, we would process this data to achieve the desired result.
  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];

  return result;
}


// The calculateWeightedAverage function iterates over each submission, checks if the assignment is valid and not overdue, then calculates the total score and total points
// The weighted average is then calculated as totalScore / totalPoints if totalPoints is not zero, otherwise, it returns 0 to avoid division by zero.

function calculateWeightedAverage(submissions, assignments) {
  let totalScore = 0;
  let totalPoints = 0;

  for (const submission of submissions) {
    const assignment = assignments.find(a => a.id === submission.assignment_id);

    if (assignment && new Date(submission.submission.submitted_at) <= new Date(assignment.due_at)) {
      totalScore += submission.submission.score;
      totalPoints += assignment.points_possible;
    }
  }

  return totalPoints !== 0 ? totalScore / totalPoints : 0;
}

  // The deductLateSubmissionPenalty function deducts 10% from the score based on the due date and submission date
  function deductLateSubmissionPenalty(submission, assignment) {
    const latePenalty = 0.1;
    const dueDate = new Date(assignment.due_at);
    const submissionDate = new Date(submission.submitted_at);
  
    return submissionDate > dueDate ? submission.submission.score * (1 - latePenalty) : submission.submission.score;
  }

// The getLearnerData function iterates through the submissions, checks if the learner already exists in the result array, and creates a new entry they're not
// It then finds the corresponding learner and assignment, calculates the score, and updates the learner's data
// It throws an error if an error condition is met i.e, AssignmentGroup does not belong to its course
 
function getLearnerData(course, assignmentGroup, submissions) {
  const result = [];

  for (const submission of submissions) {
    const learnerIndex = result.findIndex(learner => learner.id === submission.learner_id);

    if (learnerIndex === -1) {
      // If learner not found, create a new entry
      const newLearner = {
        id: submission.learner_id,
        avg: 0,
      };

      newLearner[submission.assignment_id] = 0; // Initialize assignment score

      result.push(newLearner);
    }

    const learner = result.find(learner => learner.id === submission.learner_id);
    const assignment = assignmentGroup.assignments.find(a => a.id === submission.assignment_id);

    if (assignment && course.id === assignmentGroup.course_id) {
      const assignmentScore = deductLateSubmissionPenalty(submission, assignment) / assignment.points_possible;
      learner.avg = calculateWeightedAverage(submissions.filter(s => s.learner_id === submission.learner_id), assignmentGroup.assignments);
      learner[submission.assignment_id] = assignmentScore;
    } else {
      throw new Error("Invalid input: AssignmentGroup does not belong to its course.");
    }
  }

  return result;
}



// The function returns the final result array.
const result = getLearnerData(courseInfo, assignmentGroup, learnerSubmissions);

console.log(result);
