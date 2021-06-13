# cs461-course-project
KU - CS461 - Course Proj - Brichan &amp; Dreher\
Was vaguely following [this tutorial](https://www.youtube.com/watch?v=hQAHSlTtcmY)

## Features
### Users
`Registrar`s can create, delete, and assign new passwords to users

</br>

### Departments
`Registrar`s create (`Instructor`/`Create department`) and delete departments (`Del` while viewing departments) and assign department heads

</br>

### Head Instructors
Head instructors can request to create / delete courses under their department

#### Request Create Course
Click `Instructor`/`Create course`

#### Request Delete Course
As `Instructor`, click `Rq Del` while viewing courses (from `Show courses`)

#### View requests
`Instructor`s can view requests made about their department with `Instructor`/`View create course requests` and `Instructor`/`View delete course requests`

</br>

### Course requests
`Course request`s refer to 'enrolling' in a class.\
As an `Instructor`, this means you're requesting to either stop teaching or start teaching the class. \
As a `Student`, this means to either enroll or drop the class.\
Both can request to 'enroll' in a class by clicking `Join` or `Leave` on the class while viewing courses (`Show courses`)\
Both can cancel their requests by going to `Show Course Requests`

`Registrar`s can approve / deny course requests (but not for `Student`s, this was a WIP before submission)

## What didn't get done / what did in this extra time
We wrote up the help (on website) / documentation (here) to help explain how to use the app.\
What didn't get done was all the features we wanted (students joining classes, showing what classes their in, instructors assigning grades).\
It's all more of the same UI/database code, and we've well shown that we can connect out DB to our application and read/write data, so for the scope of the project this seems okay.

## To run
<details><summary>Click to expand</summary>

Run\
`npm install -g @aws-amplify/cli`\
`npm install`

Run `amplify pull`

Select `AWS access keys`\
Enter your `accessKeyId` and `secretAccessKey`
#### Region

Chose `us-east-2` region

#### Which app are you working on?
Select `cs461courseproject`
#### Pick a backend environment
Select `dev`
#### Choose your default editor
Select your default editor
#### Choose the type of app that you're building
Select `javascript`
#### What javascript framework are you using
Select `react`
#### 'Source Directory Path' through 'Start Command'
Use default (just hit enter)
#### Do you plan on moidfying this backend?
Y
Then, run `amplify pull` one more time

</details>

### Available Scripts

In the project directory, you can run:  

#### `amplify mock api`
This runs the API locally for testing  

### `amplify push`  
Force pushes to the backend  

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
