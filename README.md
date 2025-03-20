# React & Node.js Skill Test

## Estimated Time

- 60 min

## Requirements

- Bug fix to login without any issues (20min) <br/>
  There is no need to change or add login function.
  Interpret the code structure and set the correct environment by the experience of building projects. <br/>
  Here is a login information. <br/>
  ✓ email: admin@gmail.com  ✓ password: admin123
  Solution
  
  - Set up the project
  
  npm install (for both Client and server)
  
  - Setup database
  I used docker container with following compose
  version: '3.8'
  
  services:
    mongodb:
      image: mongo:latest
      container_name: mongodb
      ports:
        - "27017:27017"
      environment:
        MONGO_INITDB_ROOT_USERNAME: admin
        MONGO_INITDB_ROOT_PASSWORD: admin123
      volumes:
        - mongodb_data:/data/db
  
  volumes:
    mongodb_data:
  
  -Create the env files and set the base url
  
  REACT_APP_BASE_URL=http://localhost:5001
  
  This should have the login working

- Implement Restful API of "Meeting" in the both of server and client sides (40min)<br/>
  Focus Code Style and Code Optimization. <br/>
  Reference other functions.
Solution
  Server
  - The skeleton for for controller/meeting/meeting.js existed, update the code with appropriate methods
  - Updated the   controller/meeting/_routes.js
  - controller/routes had the setup there

  Client

  - The getapi already existed
  - Updated AddData method

   The code is still having some issues, which I need more time to debug
