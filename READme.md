# Grade Tracker API

### Introduction

The GradeTracker API allows users to sign up, login, and submit grievances to an administrator. Administrators can also use the API to view all users and grievances on the system.

### Endpoints

### 1) signup

https://friendly-snaps-elk.cyclic.app/signup
Method: POST
Data:

<img src="./images/reqSignup.png">

-   Success Response:

    <img src="./images/resSignup.png">

-   Error Response:

    <img src="./images/errSignup.png">

### 2) login

https://friendly-snaps-elk.cyclic.app/login
Method: POST
Data:

<img src="./images/reqLogin.png">

-   Success Response:

    <img src="./images/resLogin.png">

-   Note: you will get the JWT token in the res.headers["auth-token"]

    <img src="./images/toekn.png">

-   Error Response:

     <img src="./images/errLogin.png">
