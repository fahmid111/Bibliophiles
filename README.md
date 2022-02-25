<div id="top"></div>

<br />
<div align="center">

![](client/public/image/logoBib.jpg)

<h2 align="center">Bibliophiles</h3>
  <h3 align="center">A Bibliophile's Paradise</h3>
</div>


## About Bibliophiles

Bibliophiles is a book cataloging and review website. There are two types of users - Admin and Reader. <br /><br/>
An Admin can add, update and delete- <br />
  <ul>
    <li>Books</li>
    <li>Authors</li>
    <li>Publishers</li>
    <li>Genres</li>
  </ul>
<br/>
A Reader can- <br/>
<ol>
    <li>Explore and critique books available in our database.</li>
    <li>Search for any book as they want using our advance search.</li>
    <li>Create virtual bookshelves and add and delete books in their bookshelves and personalize their bookshelves accordingly.</li>
 </ol>
 <br/>
Here in Bibliophiles, a Reader will find properly cataloged books, so that they can enrich their knowledge of books and everything related to books (i.e. authors, publishers etc.)

## Languages and Tools

<ul>
  <li>Node.js</li>
  <li>OracleDB</li>
  <li>Bootstrap</li>
  <li>React</li>
</ul>



## Prerequisites

**`Oracle`**: As this is primarily an Oracle Database Project, Oracle has to be installed in your system. To install Oracle 19c, follow these steps.
<ol>
  <li>Go <a href="http://www.oracle.com/index.html">here</a> and register for an account of your own.</li>
  <li>Then go <a href="https://www.oracle.com/database/technologies/oracle-database-software-downloads.html">here</a> and install the file according to your system.</li>
  <li>After downloading the ZIP file, UNZIP it and Run setup.exe</li>
  <li>Install properly.</li>
</ol>
<br/>

**`Node.js`**: For this project, you will also need Node.js.<br/>
Install Node.js from [here](https://nodejs.org/en/download/)



## Installing The Project

Follow the steps below to properly install this project.

### Downloading the Project

<ol>
  <li>First, download the project as a ZIP file from github into your PC</li>
  <li>Then UNZIP it</li>
</ol>
<br/>



### Setting up the database

<ol>
  <li>Go to SQL Plus</li>
  <li>Enter proper user-name and password to login</li>
  <li>Then run command
   ```sh
   SQL> connect sys as sysdba
   Enter password: password
   ```
</li>
<li>Create a new user. For example, we are creating c##bibliophiles
   ```sh
   create user c##bibliophiles identified by password;
   grant all privileges to c##bibliophiles;
   ```
</li>
<li>Now connect to c##bibliophiles
   ```sh
   SQL> connect c##bibliophiles
   Enter password: password
   ```
</li>
<li>Run the `SchemaCreation.sql` file from `database-setup` folder<br/>

   ```sh
   SQL> @[path]
   ```
In the place of `[path]` you will have to provide the path of `SchemaCreation.sql` in your PC.<br/>
For example if your file is in `D:\Bibliophiles-main\database-setup\SchemaCreation.sql` then run
   ```sh
   SQL> @D:\Bibliophiles-main\database-setup\SchemaCreation.sql
   ```
</li>
<li>Run the `TrigsFuncProcs.sql` file from `database-setup` folder<br/>

   ```sh
   SQL> @[path]
   ```
In the place of `[path]` you will have to provide the path of `TrigsFuncProcs.sql` in your PC.<br/>
For example if your file is in `D:\Bibliophiles-main\database-setup\TrigsFuncProcs.sql` then run
   ```sh
   SQL> @D:\Bibliophiles-main\database-setup\TrigsFuncProcs.sql
   ```
</li>
<li>This way user c##bibliophiles will have the proper schema of our project</li>
<li>To get the existing Data of our Project, you will also have to run `Data.sql` file. But, as there are characters in `Data.sql` that SQL Plus cannot read, you will have to go to your database GUI and run Data.sql for c##bibliophiles from there.</li>
<li>If done properly, your user c##bibliophiles should have proper scema, triggers, procedures, functions and data of our project.</li>
</ol>
<br/>



### Setting up the environment variables

Create a new file `.env` in the `server` folder<br/>
Add the following code.

```sh
PORT = THE_PORT_YOU_WANT_TO_RUN_ON
DatabaseUser = DATABASE_USER_NAME
DatabasePassword = DATABASE_USER_PASSWORD
DatabaseConnectionString = DATABASE_CONNECTION_STRING
```
You will have to insert proper values in places of
<ul>
  <li>THE_PORT_YOU_WANT_TO_RUN_ON</li>
  <li>DATABASE_USER_NAME</li>
  <li>DATABASE_USER_PASSWORD</li>
  <li>DATABASE_CONNECTION_STRING</li>
</ul>
	
For example, if we want to run it on port `5000`, using the user c##bibliophiles we just created, and with the connection string as `localhost:1521/orcl`, then we will add the following code in `.env`

```sh
PORT = 5000
DatabaseUser = 'c##bibliophiles'
DatabasePassword = 'password'
DatabaseConnectionString = 'localhost:1521/orcl'
```

### Installing NPM Packages

Open cmd and go to the client folder in cmd and run the command

```sh
 npm install
```

Then go to the server folder in cmd and do the same

```sh
 npm install
```

### Running the Project

Open cmd and go to the server folder in cmd and run the command

```sh
 npm start
```

Then go to the client folder in cmd and do the same

```sh
 npm start
```


## Creators of This Project

- [**Abu Humayed Azim Fahmid**](https://github.com/fahmid111) - 1805036

- **Asif Shahriar** - 1805040

  

## Supervisor

- [Dr. Muhammad Abdullah Adnan](https://cse.buet.ac.bd/faculty/facdetail.php?id=adnan)

  - **Associate Professor**

    ▶ **Contact:**

    Room No: 311
    Department of Computer Science and Engineering
    Bangladesh University of Engineering and Technology
    Dhaka 1000, Bangladesh

    ▶   **Homepage:**

    [https://sites.google.com/site/abdullahadnan](https://sites.google.com/site/abdullahadnan)
