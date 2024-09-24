// tests/task.test.js
const { test, expect } = require('@playwright/test');

test.describe('Task Management', () => {
  var taskText = 'Testing 2';
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8081'); 
  });

  test('Adding a task', async ({ page }) => {
    await page.fill('input[placeholder="Enter tasks...."]', taskText);
    await page.click('text=+');

    await page.waitForTimeout(1000);

    // Verify that the task is displayed in the list
    const taskItem = await page.locator('text=' + taskText);
    await expect(taskItem).toBeVisible();
  });

  test('Deleting a task', async ({ page }) => {
    const taskItem = await page.locator(`text=${taskText}`);
    await page.click('text=x');
    await page.waitForTimeout(1000); // Adjust as needed

    // Verify that the task is no longer visible
    await expect(taskItem).not.toBeVisible();
  });
  test('updating status of a task to completed', async ({ page }) => {
    taskText = 'Testing status';
    await page.fill('input[placeholder="Enter tasks...."]', taskText);
    await page.click('text=+');
    await page.waitForTimeout(1000); // Adjust as needed

    await page.getByTestId('toggle_test').click();
    await page.waitForTimeout(1000); // Adjust as needed

    const taskItem = await page.locator(`text=${taskText}`);
    // console.log(taskItem);
  
});

test('Verifying tasks persist across app sessions', async ({ page }) => {
    taskText = 'Testing persistance';
    // Add a task
    await page.fill('input[placeholder="Enter tasks...."]', taskText);
    await page.click('text=+');
    await page.waitForTimeout(1000); // Adjust as needed
  
    // Reload the page to simulate re-opening the app
    await page.reload();
  
    // Verify that the task is still present
    const taskItem = await page.locator('text=' + taskText);
    await expect(taskItem).toBeVisible();
  });

});
