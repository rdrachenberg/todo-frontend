# Todo Backend Setup Guide

Follow these steps to configure and run the Todo Backend application.

## Presteps: Clone the repo & run mysql instance
### In your terminal or command prompt run the following
    git clone https://github.com/rdrachenberg/todo-backend.git

### Make sure to have a local instance of mysql running
* [Ways to init mysql mac OS](https://www.geeksforgeeks.org/how-to-install-mysql-on-macos/)
* [Additional resources PC instructions](https://dev.mysql.com/doc/mysql-getting-started/en/)

## Step 1: Prepare the Environment Configuration File
1. Locate the `example.env` file in the project directory.
2. Rename it to `.env`
3. Save the file after renaming.

## Step 2: Configure the Database Connection
1. Open the `.env` file in a text editor.
2. Update the connection string as follows:

    ```
    mysql://<USERNAME>:<PASSWORD>@localhost:3306/todos
    ```

3. Replace `<USERNAME>` and `<PASSWORD>` with your MySQL credentials.
4. Save the `.env` file.

## Step 3: Install Dependencies and Start the Server
1. Open a terminal and navigate to the root of the project directory.
2. Run the following commands:

    ```
    npm install && npm start
    ```

## Step 4: Verify the Setup
If everything is configured correctly, you should see the following output in the terminal:

```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (v5.22.0) to ./node_modules/@prisma/client in 278ms

Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)

Tip: Want to react to database changes in your app as they happen? Discover how with Pulse: https://pris.ly/tip-1-pulse

Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": MySQL database "todos" at "localhost:3306"

MySQL database todos created at localhost:3306

🚀  Your database is now in sync with your Prisma schema. Done in 121ms

✔ Generated Prisma Client (v5.22.0) to ./node_modules/@prisma/client in 281ms


> todo-backend@1.0.0 seed
> node prisma/seed.js

seeded db
Server running on port 8080
```

## Congratulations!
The Todo backend Express application is now up and running.
