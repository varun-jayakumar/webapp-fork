# Assignment - 1

- Download the repo as zip file
- extrct the zip file

## Pre-req:

- npm must be installed
- have a local instance of postgres running in port **5432**
- add sample env file:

```
LOCAL_DB_USERNAME="<username>"
LOCAL_DB_PASSWORD="<password>"
LOCAL_DB_CONNECTION_STRING="postgres://<user_name>:<password>@localhost:5432/<db_name>"

PORT=3000
```

## 🚀 Instructions to run the project:

To get the server running:

```
npm i

npm start
```

npm start will start the server in port 3000

To run all integration tests:

```
npm test
```

**Author: varun.jayakumar**
