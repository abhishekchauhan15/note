![image](https://github.com/abhishekchauhan15/note/assets/76480451/7bdcfbf2-9ef5-44e2-8c19-5b702fad6721)



# Note-taking app

## Description

Note-taking is a web application that allows users to manage their notes. Users can register, log in, create, update, and delete their notes.

## Installation

To run this application locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running `npm install`.
4. Set up your database and update the database configuration in the `.env` file.
5. Start the server by running `npm start`.
6. Access the application in your web browser at `http://localhost:5000`.



## Database Schema

The database schema for this application consists of three tables:

### users Table

| Column Name | Data Type       | Description              |
|-------------|-----------------|--------------------------|
| id          | INT             | User ID (Primary Key)    |
| username    | VARCHAR(255)    | Username (Unique, Not Null) |
| password    | VARCHAR(255)    | Password (Not Null)      |

### notes Table

| Column Name | Data Type       | Description              |
|-------------|-----------------|--------------------------|
| id          | INT             | Note ID (Primary Key)    |
| title       | VARCHAR(255)    | Note Title (Not Null)    |
| content     | TEXT            | Note Content             |
| user_id     | INT             | User ID (Foreign Key referencing users.id, Not Null) |
| created_at  | TIMESTAMP       | Creation Timestamp (Default: Current Timestamp) |
| updated_at  | TIMESTAMP       | Last Updated Timestamp (Default: Current Timestamp on Update) |

### note_versions Table

| Column Name | Data Type       | Description              |
|-------------|-----------------|--------------------------|
| id          | INT             | Note Version ID (Primary Key) |
| note_id     | INT             | Note ID (Foreign Key referencing notes.id, Not Null) |
| title       | VARCHAR(255)    | Note Title (Not Null)    |
| content     | TEXT            | Note Content             |
| created_at  | TIMESTAMP       | Creation Timestamp (Default: Current Timestamp) |


## Technologies Used

- Node.js
- Express.js
- MySQL
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- React.js for the frontend

