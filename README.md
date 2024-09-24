# Task Management App

This project is a simple task management app built using **React Native**, **Recoil** for state management, and **Firebase Firestore** for database operations. This documentation will guide you through the Recoil state management setup and Firebase interactions.

## Table of Contents

- [Setup](#setup)
- [Recoil Atoms](#recoil-atoms)
- [Recoil Selectors](#recoil-selectors)
- [Firebase Interactions](#firebase-interactions)
- [Running the App](#running-the-app)
- [Testing with Playwright](#testing-with-playwright)

---

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>

2. Install dependencies:
   npm install

3. Configure Firebase:
Replace firebaseConfig in src/firebaseConfig.ts with your own Firebase project's configuration.

4. Start the app:
   npm start


   Recoil Atoms

Recoil atoms are used to store state globally across components. In this app, the main atom used is ListAtom, which holds the list of tasks.

ListAtom
File: src/recoil/atoms.ts

import { atom } from 'recoil';

export const ListAtom = atom({
  key: 'ListAtom', // unique ID
  default: [], // default value (initial state)
});

Purpose: This atom holds an array of task objects fetched from Firebase Firestore.
Task Structure:
{
  "key": "<task-id>",
  "text": "<task-content>",
  "completed": "<true/false>"
}

Recoil Selectors

Recoil selectors are used to compute derived state based on the state of atoms. In this app, we use selectors to filter tasks into completed and pending categories.

 // taskCompletedSelector
File: src/recoil/selectors.ts

import { selector } from 'recoil';
import { ListAtom } from './atoms';

export const taskCompletedSelector = selector({
  key: 'taskCompletedSelector',
  get: ({ get }) => {
    const tasks = get(ListAtom);
    return tasks.filter(task => task.completed);
  },
});

Purpose: Filters and returns only the tasks that are marked as completed.

// taskPendingSelector
import { selector } from 'recoil';
import { ListAtom } from './atoms';

export const taskPendingSelector = selector({
  key: 'taskPendingSelector',
  get: ({ get }) => {
    const tasks = get(ListAtom);
    return tasks.filter(task => !task.completed);
  },
});

Purpose: Filters and returns only the tasks that are not yet completed.

Firebase Interactions

This app uses Firebase Firestore to handle task persistence. Below are the Firebase operations performed in the app:

Adding a Task
Function: handlePlusButton
File: src/screens/Home.tsx

const handlePlusButton = async () => {
  if (task.trim()) {
    try {
      await addDoc(collection(firestore, "taskList"), {
        text: task,
        completed: false,
      });
      setTask(""); // Clear input after adding
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  }
};

Description: Adds a new task to the taskList collection in Firestore with the task text and completed status set to false.

// Fetching All Tasks
useEffect(() => {
  const subscriber = firestore()
    .collection("taskList")
    .onSnapshot((querySnapshot) => {
      const tasks = [];
      querySnapshot.forEach((documentSnapshot) => {
        tasks.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setList(tasks);
    });

  return () => subscriber();
}, []);

Description: Fetches all tasks from the taskList collection in real-time and updates the ListAtom Recoil state. This allows the app to display the list of tasks and automatically reflect changes in Firestore.

// Updating a Task (Marking as Complete/Incomplete)
Function: toggleSelection

const toggleSelection = async (key: any) => {
  const updatedTask = list.find((item) => item.key === key);
  await firestore()
    .collection("taskList")
    .doc(key)
    .update({
      completed: !updatedTask?.completed,
    })
    .then(() => {
      console.log("Task updated!");
    });
};

Description: Updates the completed status of a task by toggling it between true and false.

// Deleting a Task
Function: handleDelete

const handleDelete = async (key: any) => {
  await firestore()
    .collection("taskList")
    .doc(key)
    .delete()
    .then(() => {
      console.log("Task deleted!");
    });
};

Description: Deletes a task from Firestore by its document ID.
Running the App

Start Metro Bundler: npm start
Run on iOS: npm run ios
Run on Android: npm run android
Testing with Playwright

Automated Testing with Playwright
We use Playwright for end-to-end testing of the app. The following test cases are automated:

Adding Tasks
Deleting Tasks
Marking Tasks as Complete/Incomplete
Verifying Tasks Persist Across Sessions
Example Playwright Test

test('Verifying tasks persist across app sessions', async ({ browser }) => {
  const page = await browser.newPage();
  await page.goto('http://localhost:8081');

  // Add a task
  await page.fill('input[placeholder="Enter tasks...."]', 'Test Task');
  await page.click('text=+');

  // Reload the page to simulate app re-opening
  await page.reload();

  // Verify that the task is still present
  const taskItem = await page.locator('text=Test Task');
  await expect(taskItem).toBeVisible();
});

Running Playwright Tests
Install Playwright:
npm install --save-dev @playwright/test
Run Tests:
npx playwright test




