# Grade Tracker API

### Introduction

The GradeTracker API allows users to sign up, login, and submit grievances to an administrator. Administrators can also use the API to view all users and grievances on the system.

### Endpoints

### 1) Signup

-   <a href="#https://friendly-snaps-elk.cyclic.app/signup">https://friendly-snaps-elk.cyclic.app/signup</a>

-   Method: POST
-   Data:

<img src="./images/reqSignup.png">

-   Success Response:

    <img src="./images/resSignup.png">

-   Error Response:

    <img src="./images/fail.png">

### 2) Login

-   <a href="#https://friendly-snaps-elk.cyclic.app/login"> https://friendly-snaps-elk.cyclic.app/login</a>
-   Method: POST
-   Data:

<img src="./images/reqLogin.png">

-   Success Response:

    <img src="./images/resLogin.png">

-   Note: you will get the JWT token in the res.headers["auth-token"]

    <img src="./images/toekn.png">

-   Error Response:

     <img src="./images/fail.png">

### 3) Do Grievance

-   <a href="#https://friendly-snaps-elk.cyclic.app/doGrievance"> https://friendly-snaps-elk.cyclic.app/doGrievance</a>
-   Method: POST
-   Data:

<img src="./images/reqLogin.png">

-   Success Response:

    <img src="./images/resLogin.png">

-   Error Response:

     <img src="./images/errLogin.png">

### 4) Get All Users

-   <a href="#https://friendly-snaps-elk.cyclic.app/getAllUsers">https://friendly-snaps-elk.cyclic.app/getAllUsers</a>

-   Method: GET
-   This request the admin only can use it

-   Success Response:

    <img src="./images/resGetAllUsers.png">

-   Error Response:

    <img src="./images/fail.png">

### 5) Get All Users Who Do Grievance

-   <a href="#https://friendly-snaps-elk.cyclic.app/grievance-users">https://friendly-snaps-elk.cyclic.app/grievance-users</a>

-   Method: GET
-   This request the admin only can use it

-   Success Response:

    <img src="./images/resGrievance.png">

-   Error Response:

    <img src="./images/fail.png">
