
# Learner Data Analysis Program by Gabriel Al-Rifai

## Introduction

This JavaScript program is designed to analyze learner data and transform it into a structured format. The program calculates the weighted average of learners, deducts penalties for late submissions, and handles potential errors gracefully.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Functions](#functions)
- [Input Data](#input-data)
- [Output Format](#output-format)
- [Example](#example)


## Requirements

To run this program, ensure you have Node.js installed on your machine.

## Installation
npm install
Clone the repository to your local machine:

git clone https://github.com/GabrielAl-Rifai/SBA-308.git

## Usage
Run the program
node analyze-learner-data.js

## Functions
calculateWeightedAverage(submissions, assignments)
Calculates the weighted average of a learner's submissions.

deductLateSubmissionPenalty(submission, assignment)
Deducts a penalty for late submissions.

getLearnerData(course, assignmentGroup, submissions)
Processes learner submissions and returns the final result array.

## Input Data
The program requires the following input data:

courseInfo: Object containing course information.
assignmentGroup: Object containing assignment group details.
learnerSubmissions: Array of learner submission data.

## Output Format
The program outputs an array of objects, each containing learner information in the following format:
{
  id: learner_id,
  avg: weighted_average,
  assignment_id_1: assignment_score_1,
  assignment_id_2: assignment_score_2,
  // ...
}




```bash





