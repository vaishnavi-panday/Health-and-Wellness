// Elements
const welcomeSection = document.getElementById('welcome');
const loginSection = document.getElementById('loginSection');
const trackerPage = document.getElementById('trackerPage');
const startBtn = document.getElementById('startBtn');
const loginForm = document.getElementById('loginForm');
const userDetailsForm = document.getElementById('userDetailsForm');

const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.tracker-section');
const congratulation = document.getElementById('congratulation');

const waterInput = document.getElementById('waterInput');
const addWaterBtn = document.getElementById('addWaterBtn');
const waterTotalDisplay = document.getElementById('waterTotal');

const sleepHoursInput = document.getElementById('sleepHours');
const saveSleepBtn = document.getElementById('saveSleepBtn');
const sleepRecordDisplay = document.getElementById('sleepRecord');

const moodSelect = document.getElementById('moodSelect');
const saveMoodBtn = document.getElementById('saveMoodBtn');
const moodRecordDisplay = document.getElementById('moodRecord');

const dayPlanInput = document.getElementById('dayPlanInput');
const savePlanBtn = document.getElementById('savePlanBtn');
const displayPlan = document.getElementById('displayPlan');

const exerciseForm = document.getElementById('exerciseForm');
const exerciseInput = document.getElementById('exerciseInput');
const exerciseList = document.getElementById('exerciseList');

// User data storage
let userData = {
  waterTotal: 0,
  sleepHours: '',
  mood: '',
  dayPlan: '',
  height: '',
  weight: ''
};

let exercises = [];

// Thresholds and suggestions
const thresholds = {
  waterMin: 1500, // minimum daily water intake in ml
  sleepMin: 6,    // minimum hours of sleep recommended
};

const suggestions = {
  waterLow: "You should drink more water to stay hydrated. Aim for at least 1.5 liters per day.",
  sleepLow: "Try to get at least 6 hours of quality sleep to maintain good health.",
  moodSad: "If you're feeling down often, consider talking to someone and engaging in activities you enjoy.",
};

// Start button click: move to login
startBtn.addEventListener('click', () => {
  welcomeSection.classList.add('hidden');
  loginSection.classList.remove('hidden');
});

// Login form submit (mock)
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  // Basic mock login validation (accept any non-empty)
  const username = loginForm.username.value.trim();
  const password = loginForm.password.value.trim();
  if (username && password) {
    loginSection.classList.add('hidden');
    trackerPage.classList.remove('hidden');
    // Show first section by default
    navButtons[0].click();
  } else {
    alert('Please enter valid login credentials.');
  }
});

// Save user physical details
userDetailsForm.addEventListener('submit', e => {
  e.preventDefault();
  userData.height = userDetailsForm.height.value;
  userData.weight = userDetailsForm.weight.value;
  alert(`Details saved: Height ${userData.height} cm, Weight ${userData.weight} kg`);
  userDetailsForm.reset();
});

// Navigation switch logic
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class on all buttons
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Hide all sections
    sections.forEach(section => section.style.display = 'none');

    // Show selected section
    const target = btn.getAttribute('data-section');
    document.getElementById(target).style.display = 'block';

    // Hide congratulations message on tab switch
    congratulation.classList.add('hidden');
  });
});

// Water intake
addWaterBtn.addEventListener('click', () => {
  const val = Number(waterInput.value);
  if (val > 0) {
    userData.waterTotal += val;
    waterTotalDisplay.textContent = userData.waterTotal;
    waterInput.value = '';

    if (userData.waterTotal < thresholds.waterMin) {
      alert(suggestions.waterLow);
    }
  } else {
    alert('Please enter a positive number for water intake.');
  }
});

// Sleep tracker
saveSleepBtn.addEventListener('click', () => {
  const val = parseFloat(sleepHoursInput.value);
  if (!isNaN(val) && val >= 0 && val <= 24) {
    userData.sleepHours = val;
    sleepRecordDisplay.textContent = `${val} hours`;
    sleepHoursInput.value = '';

    if (val < thresholds.sleepMin) {
      alert(suggestions.sleepLow);
    }
  } else {
    alert('Please enter a valid number between 0 and 24.');
  }
});

// Mood tracker
saveMoodBtn.addEventListener('click', () => {
  const val = moodSelect.value;
  if (val) {
    userData.mood = val;
    moodRecordDisplay.textContent = val;
    moodSelect.value = '';

    if (val === "Sad") {
      alert(suggestions.moodSad);
    }
  } else {
    alert('Please select your mood.');
  }
});

// Day plan
savePlanBtn.addEventListener('click', () => {
  const val = dayPlanInput.value.trim();
  if (val) {
    userData.dayPlan = val;
    displayPlan.textContent = val;
    dayPlanInput.value = '';
    checkAllCompleted();
  } else {
    alert('Please enter your day plan.');
  }
});

// Exercise planner
function updateExerciseList() {
  exerciseList.innerHTML = '';
  exercises.forEach((ex, idx) => {
    const li = document.createElement('li');
    li.style.marginBottom = '8px';

    const label = document.createElement('label');
    label.style.cursor = 'pointer';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = ex.completed;
    checkbox.style.marginRight = '10px';
    checkbox.addEventListener('change', () => {
      exercises[idx].completed = checkbox.checked;
      checkAllCompleted();
    });

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(ex.name));
    li.appendChild(label);
    exerciseList.appendChild(li);
  });
}

exerciseForm.addEventListener('submit', e => {
  e.preventDefault();
  let val = exerciseInput.value.trim();
  if (val) {
    exercises.push({ name: val, completed: false });
    updateExerciseList();
    exerciseInput.value = '';
    congratulation.classList.add('hidden');
  }
});

// Check if all exercises and day plan are completed and show appreciation
function checkAllCompleted() {
  const allExercisesDone = exercises.length > 0 && exercises.every(ex => ex.completed);
  const dayPlanDone = userData.dayPlan.trim().length > 0;

  if (allExercisesDone && dayPlanDone) {
    congratulation.classList.remove('hidden');
  } else {
    congratulation.classList.add('hidden');
  }
}
