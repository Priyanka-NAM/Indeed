# Indeed




# Coding Guidelines
 1. All File names if react screens, Components, Reducers, Actions must be in Pascal Case
 1. eg :if the screen is an admin home screen, the file name should be AdminHomeScreen.js
 1. All variable names must match from front end to backend in the whole flow.
<<<<<<< HEAD
 1. <b>eg:</b> if the variable is assigned to get the username in the frontend screen, this is the flow
=======
 1. <b>eg:</b> if the variable is assigned to get the username in the fron end screen, this is the flow
>>>>>>> 7756a0f6c122c8f206c8b53233eb033c8c8c0fd7
  *  name field in the form must be userName
  *  useState variable name in the screen/component - userName
  *  passing formdata while API Call, the field name in the JSON object must be userName
  *  collecting the req.body in the api call Controller function must be userName
  *  field name in the Database must be userName
  *  response object res.json({}) must be userName

# Github Guidelines

## Master branch - master code/final working code.
## Develop branch - developer code.

1. Create your own branch from develop with the branch name as {you name}/{user story} (Ex: vamsichalamolu/IND-3).
2. After done with your implemenatations in your local branch, please complie the code in your local branch and make sure it does not break.
3. After successful compilation, please create a pull request to merge your local branch to develop branch.
4. The pull request should be reviewed by anyone of our teammates.
5. Give the approval for pull requests after successful review.
6. Merge your code into develop branch.
7. Test your code in develop branch once.
8. Delete your individual branch.
 
## Note:- Please pull the latest code from develop branch whenever you start working on a new story/feature.

## ____________***IMPORTANT****__________________
     mongoDB Credentials:
         connection URI -  mongodb+srv://team7:mypassword@indeeddb.awj0c.mongodb.net/test
         DB - indeed_db
         collections: user, admin,company
    
    MySQL Credentials:
         connection URI - indeed.ccz6fxp12byz.us-east-2.rds.amazonaws.com
         DB - indeed
         username - admin
         password - mypassword
    once you connect through MySQL WB, you can see the schema name indeed; no tables has been created yet.
