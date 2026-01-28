import type { Project } from "./projects";

export const javascriptProjects: Project[] = [
  // Tier 1 - TaskFlow: Critical Bug Fix
  {
    id: "js-project-taskflow-bug",
    title: "Critical Bug at TaskFlow",
    companyTier: 1,
    companyName: "TaskFlow",
    companyDescription: "A 5-person startup building a task management app for freelancers and small teams.",
    trackSlug: "javascript",
    requiredLessons: ["arrays-basics", "objects-basics"],
    difficulty: "beginner",
    scenario:
      "You just joined TaskFlow as their newest developer. The team is small but moves fast. Your first week on the job, and there's already a critical bug: the task filtering system is broken. Users can't filter their completed tasks, and it's causing support tickets to pile up. The tech lead pinged you on Slack...",
    tasks: [
      {
        id: "taskflow-task-1",
        title: "Fix the Task Filter",
        description:
          "The `getCompletedTasks` function is supposed to return only tasks that have `completed: true`, but it's returning all tasks regardless of their status.",
        context:
          'Sarah (Tech Lead): "Hey! Welcome to the team! Sorry to throw you into the deep end, but can you look at the task filter function? It\'s returning all tasks instead of just completed ones. Users are complaining. The function is `getCompletedTasks` — should be a quick fix!"',
        requirements: [
          "Filter the tasks array to only return tasks where `completed` is `true`",
          "Do not modify the original tasks array",
          "Return an empty array if no tasks are completed",
        ],
        starterCode: `// Bug: This function returns ALL tasks instead of completed ones
function getCompletedTasks(tasks) {
  // TODO: Fix this to return only completed tasks
  return tasks;
}

// Test data
const tasks = [
  { id: 1, title: "Design landing page", completed: true },
  { id: 2, title: "Set up database", completed: false },
  { id: 3, title: "Write API docs", completed: true },
  { id: 4, title: "Fix login bug", completed: false },
  { id: 5, title: "Deploy to staging", completed: true },
];

const completed = getCompletedTasks(tasks);
console.log(completed.length);
completed.forEach(t => console.log(t.title));`,
        solution: `function getCompletedTasks(tasks) {
  return tasks.filter(task => task.completed);
}

const tasks = [
  { id: 1, title: "Design landing page", completed: true },
  { id: 2, title: "Set up database", completed: false },
  { id: 3, title: "Write API docs", completed: true },
  { id: 4, title: "Fix login bug", completed: false },
  { id: 5, title: "Deploy to staging", completed: true },
];

const completed = getCompletedTasks(tasks);
console.log(completed.length);
completed.forEach(t => console.log(t.title));`,
        tests: [
          {
            name: "Returns only completed tasks",
            test: `output.includes("3")`,
            expected: "Should return 3 completed tasks",
          },
          {
            name: 'Includes "Design landing page"',
            test: `output.includes("Design landing page")`,
            expected: "Should include Design landing page",
          },
          {
            name: 'Includes "Write API docs"',
            test: `output.includes("Write API docs")`,
            expected: "Should include Write API docs",
          },
          {
            name: 'Does NOT include "Set up database"',
            test: `!output.includes("Set up database")`,
            expected: "Should not include incomplete tasks",
          },
        ],
        hints: [
          "Use the Array.filter() method to create a new array with only matching elements",
          "The filter callback should check the `completed` property of each task",
          "Try: tasks.filter(task => task.completed)",
        ],
      },
      {
        id: "taskflow-task-2",
        title: "Add Task Priority Sorting",
        description:
          "Now that filtering works, Sarah wants you to add a function that sorts tasks by priority. High priority tasks should appear first.",
        context:
          'Sarah (Tech Lead): "Nice fix! Quick follow-up — can you also add a sort function? We need tasks sorted by priority: high > medium > low. The PM is demoing to investors tomorrow."',
        requirements: [
          "Sort tasks so that 'high' priority comes first, then 'medium', then 'low'",
          "Tasks with the same priority should maintain their original order",
          "Return a new sorted array without modifying the original",
        ],
        starterCode: `function sortByPriority(tasks) {
  // TODO: Sort tasks by priority (high > medium > low)
  return tasks;
}

const tasks = [
  { id: 1, title: "Fix crash bug", priority: "high" },
  { id: 2, title: "Update readme", priority: "low" },
  { id: 3, title: "Add dark mode", priority: "medium" },
  { id: 4, title: "Security patch", priority: "high" },
  { id: 5, title: "Refactor CSS", priority: "low" },
];

const sorted = sortByPriority(tasks);
sorted.forEach(t => console.log(t.priority + ": " + t.title));`,
        solution: `function sortByPriority(tasks) {
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  return [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
}

const tasks = [
  { id: 1, title: "Fix crash bug", priority: "high" },
  { id: 2, title: "Update readme", priority: "low" },
  { id: 3, title: "Add dark mode", priority: "medium" },
  { id: 4, title: "Security patch", priority: "high" },
  { id: 5, title: "Refactor CSS", priority: "low" },
];

const sorted = sortByPriority(tasks);
sorted.forEach(t => console.log(t.priority + ": " + t.title));`,
        tests: [
          {
            name: "High priority tasks come first",
            test: `output.indexOf("high:") < output.indexOf("medium:")`,
            expected: "High priority should be before medium",
          },
          {
            name: "Medium priority before low",
            test: `output.indexOf("medium:") < output.indexOf("low:")`,
            expected: "Medium priority should be before low",
          },
          {
            name: "First task is high priority",
            test: `output.trim().startsWith("high:")`,
            expected: "First task should be high priority",
          },
        ],
        hints: [
          "Create an object mapping priority names to numeric values: { high: 0, medium: 1, low: 2 }",
          "Use Array.sort() with a comparison function",
          "Use the spread operator [...tasks] to avoid mutating the original array",
        ],
      },
    ],
  },
  // Tier 1 - FitTrack: New Feature
  {
    id: "js-project-fittrack-feature",
    title: "Workout Stats at FitTrack",
    companyTier: 1,
    companyName: "FitTrack",
    companyDescription: "A health and fitness tracking app focused on personalized workout routines.",
    trackSlug: "javascript",
    requiredLessons: ["functions", "array-methods"],
    difficulty: "beginner",
    scenario:
      "You're a developer at FitTrack, a small fitness startup. The team needs to build a workout statistics feature for the upcoming app update. Users want to see their workout summaries — total duration, average calories burned, and their most frequent workout type.",
    tasks: [
      {
        id: "fittrack-task-1",
        title: "Calculate Workout Statistics",
        description:
          "Build a function that takes an array of workout objects and returns a summary with total duration, average calories, and the most common workout type.",
        context:
          'Mike (Co-founder): "Hey! We need to ship the stats feature by Friday. Can you write the function that calculates workout summaries? Here\'s the data format we use. Keep it simple — we can always iterate later."',
        requirements: [
          "Calculate total duration of all workouts in minutes",
          "Calculate average calories burned (rounded to nearest integer)",
          "Find the most frequently performed workout type",
          "Return an object with totalMinutes, avgCalories, and favoriteType",
        ],
        starterCode: `function getWorkoutStats(workouts) {
  // TODO: Calculate and return workout statistics
  return {
    totalMinutes: 0,
    avgCalories: 0,
    favoriteType: "",
  };
}

const workouts = [
  { type: "running", duration: 30, calories: 300 },
  { type: "cycling", duration: 45, calories: 400 },
  { type: "running", duration: 25, calories: 250 },
  { type: "yoga", duration: 60, calories: 200 },
  { type: "running", duration: 35, calories: 350 },
  { type: "cycling", duration: 40, calories: 380 },
];

const stats = getWorkoutStats(workouts);
console.log("Total Minutes: " + stats.totalMinutes);
console.log("Avg Calories: " + stats.avgCalories);
console.log("Favorite: " + stats.favoriteType);`,
        solution: `function getWorkoutStats(workouts) {
  const totalMinutes = workouts.reduce((sum, w) => sum + w.duration, 0);
  const avgCalories = Math.round(
    workouts.reduce((sum, w) => sum + w.calories, 0) / workouts.length
  );

  // Count workout types
  const typeCounts = {};
  workouts.forEach(w => {
    typeCounts[w.type] = (typeCounts[w.type] || 0) + 1;
  });

  // Find most frequent type
  let favoriteType = "";
  let maxCount = 0;
  for (const type in typeCounts) {
    if (typeCounts[type] > maxCount) {
      maxCount = typeCounts[type];
      favoriteType = type;
    }
  }

  return { totalMinutes, avgCalories, favoriteType };
}

const workouts = [
  { type: "running", duration: 30, calories: 300 },
  { type: "cycling", duration: 45, calories: 400 },
  { type: "running", duration: 25, calories: 250 },
  { type: "yoga", duration: 60, calories: 200 },
  { type: "running", duration: 35, calories: 350 },
  { type: "cycling", duration: 40, calories: 380 },
];

const stats = getWorkoutStats(workouts);
console.log("Total Minutes: " + stats.totalMinutes);
console.log("Avg Calories: " + stats.avgCalories);
console.log("Favorite: " + stats.favoriteType);`,
        tests: [
          {
            name: "Total minutes is 235",
            test: `output.includes("Total Minutes: 235")`,
            expected: "Total should be 30+45+25+60+35+40 = 235",
          },
          {
            name: "Average calories is 313",
            test: `output.includes("Avg Calories: 313")`,
            expected: "Average should be (300+400+250+200+350+380)/6 = 313",
          },
          {
            name: "Favorite type is running",
            test: `output.includes("Favorite: running")`,
            expected: "Running appears 3 times (most frequent)",
          },
        ],
        hints: [
          "Use Array.reduce() to sum up durations and calories",
          "For average calories, divide the total by workouts.length and use Math.round()",
          "To find the most frequent type, create a count object and track which type has the highest count",
        ],
      },
      {
        id: "fittrack-task-2",
        title: "Workout Streak Calculator",
        description:
          "Users want to see their workout streak — how many consecutive days they've worked out. Build a function to calculate this from an array of workout dates.",
        context:
          'Mike (Co-founder): "Stats feature looks great! One more thing — users are asking for a streak counter. Can you calculate the current streak from their workout dates? Dates are in YYYY-MM-DD format."',
        requirements: [
          "Calculate the current consecutive day streak ending today (or the most recent date)",
          "Dates are provided as strings in YYYY-MM-DD format",
          "A streak breaks if there's a gap of more than 1 day between workouts",
          "Return the streak count as a number",
        ],
        starterCode: `function calculateStreak(dates) {
  // TODO: Calculate consecutive day workout streak
  return 0;
}

// Test: Streak of 3 (Jan 26, 27, 28)
const dates1 = ["2025-01-20", "2025-01-25", "2025-01-26", "2025-01-27", "2025-01-28"];
console.log("Streak 1: " + calculateStreak(dates1));

// Test: Streak of 1 (gap between Jan 25 and Jan 28)
const dates2 = ["2025-01-20", "2025-01-25", "2025-01-28"];
console.log("Streak 2: " + calculateStreak(dates2));

// Test: Streak of 5 (all consecutive)
const dates3 = ["2025-01-24", "2025-01-25", "2025-01-26", "2025-01-27", "2025-01-28"];
console.log("Streak 3: " + calculateStreak(dates3));`,
        solution: `function calculateStreak(dates) {
  if (dates.length === 0) return 0;

  // Sort dates descending
  const sorted = [...dates].sort((a, b) => new Date(b) - new Date(a));
  let streak = 1;

  for (let i = 0; i < sorted.length - 1; i++) {
    const current = new Date(sorted[i]);
    const previous = new Date(sorted[i + 1]);
    const diffDays = (current - previous) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

const dates1 = ["2025-01-20", "2025-01-25", "2025-01-26", "2025-01-27", "2025-01-28"];
console.log("Streak 1: " + calculateStreak(dates1));

const dates2 = ["2025-01-20", "2025-01-25", "2025-01-28"];
console.log("Streak 2: " + calculateStreak(dates2));

const dates3 = ["2025-01-24", "2025-01-25", "2025-01-26", "2025-01-27", "2025-01-28"];
console.log("Streak 3: " + calculateStreak(dates3));`,
        tests: [
          {
            name: "Streak 1 is 3 days",
            test: `output.includes("Streak 1: 3")`,
            expected: "Jan 26-28 is a 3-day streak",
          },
          {
            name: "Streak 2 is 1 day",
            test: `output.includes("Streak 2: 1")`,
            expected: "Only Jan 28, no consecutive days before",
          },
          {
            name: "Streak 3 is 5 days",
            test: `output.includes("Streak 3: 5")`,
            expected: "All 5 days are consecutive",
          },
        ],
        hints: [
          "Sort dates in descending order (most recent first)",
          "Compare each date with the previous one to check if they're exactly 1 day apart",
          "Use Date objects and calculate the difference in milliseconds, then convert to days",
        ],
      },
    ],
  },
];
