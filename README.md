# HighScoreApp

A high score app, written as a take home test for a Staff Engineer position at the leading
Pentest as a Service (PtaaS) provider.

This project was bootstrapped with [Create React Home](https://github.com/facebook/create-react-app).

## Notes

For ease of reference and review, I have deliberately situated test classes in the same
folder as units under test.

## Answers to questions asked within the requirements document

### Section: Additional Requirements

6. Write 2-3 tests, and note why you chose to cover these particular areas of code.

There are at least 3 ways to determine what to test:

1. Based on business requirements. For example, e2e test for happy path (e2e smoke test) e.g.

```gherkin
Scenario: Display of top score in leaderboard
  
  Given a user who has a top score is on the home page
  When the user submits the score
  Then the submitted data is displayed in the leaderboard
```

2. Based on functional requirements (user experience, responsive design etc). For example,
   test error-messages, progress indicators etc.


3. Based on order in test heirarchy (e.g. unit -> integration -> e2e). For example, start
   with unit test

I have chosen to start with some unit tests as all other tests depend on app units functioning
as expected. In line with the same reasoning, I have chosen to unit test those functions on
on which other app units depend.

In addition, I may test the display of error messages and progress indicators.

Of course, there will be at least one functional smoke test to check that the main components
are rendered.

### Section: Bonus

3. What API parameters would you request be made available, to optimize data processing on the
   front end? Assume those parameters are made available to you, and incorporate them into your code.

    - page, size, sort.by (generally pagination and sorting related parameters).

>> If I have not incorporated these parameters by the time of submission, then I will gladly do so on request.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
