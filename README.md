# Indeed




# Coding Guidelines
 1. All File names if react screens, Components, Reducers, Actions must be in Pascal Case
 1. eg :if the screen is an admin home screen, the file name should be AdminHomeScreen.js
 1. All variable names must match from front end to backend in the whole flow.
 1. <b>eg:</b> if the variableis asigned to get the username in the fron end screen, this is the flow
  *  name field in the form must be userName
  *  usestate variable name in the screen/component - userName
  *  passing formdata whilke API Call, the field name in the JSON object must be userName
  *  collecting the req.body in the api call Controller function must be userName
  *  field name in the Database must be userName
  *  response object res.json({}) must be userName
