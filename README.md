# Assignment - 2

- Download the repo as zip file
- extrct the zip file

## Prerequisites:

- npm must be installed
- postgresql:15 must be installed and service shoule be started
- there must exist a user "postgres" and password as "<your_password>"
- have a local instance of postgres running in port \*_5432_
- add sample env file:

example .env file

```
DB_USERNAME="postgres"
DB_NAME="myapp"
DB_PASSWORD="mypass"
DB_PORT=5432
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
