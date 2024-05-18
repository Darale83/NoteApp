# Fullstack Notes Application using PERN Stack

# Project Name

NoteApp

## Project Overview

This project is a fullstack notes application built using the PERN stack (PostgreSQL, Express.js, React.js, Node.js). The application allows users to create, edit, delete, and archive notes. Users can also categorize their notes and filter them by category.

## User Stories

### Phase 1

#### User Stories

1. **Create, Edit, and Delete Notes**

   - As a user, I want to be able to create new notes.
   - As a user, I want to be able to edit existing notes.
   - As a user, I want to be able to delete notes.

2. **Archive/Unarchive Notes**

   - As a user, I want to archive notes that I don't need to see in my active list.
   - As a user, I want to unarchive notes and move them back to my active list.

3. **List Active Notes**

   - As a user, I want to list all my active notes.

4. **List Archived Notes**
   - As a user, I want to list all my archived notes.

### Phase 2

#### User Stories

1. **Add/Remove Categories to Notes**

   - As a user, I want to be able to add categories to my notes.
   - As a user, I want to be able to remove categories from my notes.

2. **Filter Notes by Category**
   - As a user, I want to be able to filter my notes by category.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize

## Application Features

### Notes Management

- **Create Note**: Users can create a new note with a title and content.
- **Edit Note**: Users can edit the title and content of existing notes.
- **Delete Note**: Users can delete notes permanently.
- **Archive Note**: Users can archive notes, removing them from the active list.
- **Unarchive Note**: Users can unarchive notes, adding them back to the active list.
- **List Active Notes**: Users can view all active notes.
- **List Archived Notes**: Users can view all archived notes.

### Categories Management (Phase 2)

- **Add Category to Note**: Users can assign categories to their notes.
- **Remove Category from Note**: Users can remove categories from their notes.
- **Filter Notes by Category**: Users can filter the notes list by selected categories.

## Installation and Setup

## System Requirements

Ensure you have the following tools and versions installed before running the application.

- Node.js: v16.13.1
- npm: v8.1.2
- PostgreSQL: v14

## Database Setup

1. Create a database with the name 'notes' in PostgreSQL.
2. Make sure you have access to the database.

## Backend Setup

1. Once you have opened the prject in your IDE, open the terminal and navigate to the 'backend' folder of the project.
2. In the 'backend' folder you have to create a '.env' file that contains the following:

```
DB_USER=postgresUser
DB_PASSWORD=postgresPassword
DB_HOST=localhost
```

3. Run the following command to install the dependencies:

```bash
  npm install
```

3. When all the dependencies are properly installed you need to start the server with the following command:

```bash
  npm start
```

## Frontend Setup

1. Open a new terminal in your IDE (without closing the backend terminal) and navigate to the "frontend" folder of the project.
2. Run the following command to install the dependencies:

```bash
  npm install
```

3. When all the dependencies are properly installed you need to start the server with the following command:

```bash
  npm start
```
