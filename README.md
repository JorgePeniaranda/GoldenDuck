# GoldenDuck
Project for educational and illustrative purposes, non-commercial project. No use is made or authorized for profit due to copyright and unauthorized licensing issues.



## Instructions
The following programs are required to run GoldenDuck:

#### [Node.JS](https://nodejs.org/es/download/)
Used to use Laravel with React.js

#### [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
Used for implementing a database.

#### [Composer](https://getcomposer.org/download/)
Important for Laravel implementation.



### How to start GoldenDuck?
After installing all the corresponding programs, to start GoldenDuck we need to open a console and enter the following commands:

#### `npm ci`
With this command we download the dependencies and install them.

#### `npm start`
With this command we start GoldenDuck.

#### `npm run build`
With this command we create an optimized build ready to be deployed at production level.



### How to import the database?
Steps to import GoldenDuck database:

        - Open SQL Server
        - Right click on the "Databases" folder
        - Click on "Import Data-tier Application...".
        - Next
        - In "Import from local disk", select "Browse".
        - Browse for ".bacpac" files found in the repository folder "./baseDB".
        - Select either of the two
        - Next
        - Next
        - Finish
        - Repeat with the remaining file



### How to set up the database connection?

#### `composer global require laravel/installer`
With this command we install laravel on our computer

#### [Download Drivers Here](https://learn.microsoft.com/en-us/sql/connect/php/download-drivers-php-sql-server?view=sql-server-ver15)
These drivers are necessary to make the connection from Laravel to SQL Server.
Steps to install:

        - Go to "C:/xampp/php/ext".
        - Paste the respective files according to this table¹ (php_pdo_sqlsrv and php_sqlsrv of your corresponding PHP² version)
        - In the php.ini file located in "C:/xampp/php" add the following lines with the name corresponding to the added file:
            extension=php_sqlsrv_80_ts_x64.dll
            extension=php_pdo_sqlsrv_80_ts_x64.dll
        - Restart XAMPP

[1: Table](https://i.stack.imgur.com/wgHTf.png)

[2: Check PHP Version](http://localhost/dashboard/phpinfo.php)

#### Enable ports to SQL Server
    - Open "SQL Server Configuration Manager
    - Open "SQL Server Network Configuration"
    - Open "Protocols for [SQL Name]"
    - Double-click on "TCP/IP" and enable
    - Go to "SQL Server Services" right click on SQL Server([SQL Name]) and restart it

#### Create user in the database and allow access to it
Create user:

    - Expand "Security" folder
    - Right click on "Logins"
    - Click on "New Login"
    - Enter name
    - Select "SQL Server authentication"
    - Enter password if necessary
    - In the category "Server Roles" check all options
    - In the category "User Mapping" select the databases "HomebankingUsar" and "HomebankingPassUsar".
    - In the category "Securables" click on "Search" and select "The server '[Server Name]'" and accept
    - Click on "OK" to create the account

Allow Access:

    - Start SQL Server and log in
    - Right click on the SQL Server
    - Click on properties
    - Go to the security category
    - Select "SQL Server and Windows Authentication mode"



### Configure .env
    - In the "api" folder create a copy of ".env.example" and rename it to ".env".
    - Inside ".env" modify "DB_USERNAME" and "DB_PASSWORD" with the users previously created.
    - Save changes to file

[Watch GoldenDuck live](https://goldenduck.netlify.app/)
