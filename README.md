# Task Beaver

Task Beaver demo: https://task-beaver.herokuapp.com/

Git wiki : https://github.com/ChrisThreadgill/TaskBeaver

## Group Memberss:

### Chris Threadgill

### Darren Kong

### Joshua Raphael Bautista

### Vernyoon Chao

#

## Task Beaver

---

Task Beaver

We are a software engineering oriented project planning application, with the versatility to tackle any of your day to day tasks as well as plan and execute your next full stack application!.

## How to Run

---

1. You will need to download the repo and open it in VScode
2. Install node_modules using 'npm install'
3. In the root folder, create a '.env' file and use the '.env.example' file as a reference (you may copy and paste and use your own data)
4. In your terminal use the following commands in this order:
   - psql-create user taskbeaver_app with password 'password' createdb
   - npx dotenv sequelize init
     ** data models,seed data, and associations have been completed for you **
   - npx dotenv sequelize db:create
   - npx dotenv sequelize db:migrate
   - npx dotenv sequelize db:seed:all
5. In your terminal, type "npm start" to begin the server
6. In your browser navigate to "http://localhost:8080/"

## Languages and FrameWorks

---

We used PUG, a front-end framework along with an Express.JS back-end. PostgresSQL was utilized for our database.

## Technologies Used

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Pug](https://img.shields.io/badge/Pug-FFF?style=for-the-badge&logo=pug&logoColor=A86454)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### Where we plan to go from here

Although we are proud of the application we have created there are a few additional improvements we feel can be added to the site:

- Be able to add contacts for each project
- Implement a comment system to each task
- Add a dynamic search feature for the task
- To be able to add a different Task Beaver user to the task list
- User profile page with a custom user image
