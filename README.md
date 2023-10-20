# SnapNotes

SnapNotes is an application that allows users to easily store and manage their notes securely. It offers basic note-taking functionalities, including creating, reading, updating, and deleting notes. Each user can create their own account to keep their notes separate and secure.

![snapnotes](https://github.com/yashsonisde2003/SnapNotes-Raact/blob/main/public/images/snapnotes_demo.png)
## Features

- User account creation and authentication for secure access to notes.
- Create, read, update, and delete notes.
- Easy and intuitive user interface designed with React.js.
- Secure storage of notes in a MongoDB database.
- Backend API built with Node.js and Express.

## Getting Started

### Prerequisites

Make sure you have the following software installed before setting up SnapNotes:

- Node.js
- MongoDB

### Installation

1. Clone the SnapNotes repository to your local machine:

   ```shell
   git clone https://github.com/your-username/snapnotes.git
   ```

2. Navigate to the project directory:

   ```shell
   cd snapnotes
   ```

3. Install the backend dependencies:

   ```shell
   cd backend
   npm install
   ```

4. Install the frontend dependencies:

   ```shell
   cd ../frontend
   npm install
   ```

### Configuration

Before running the application, you need to set up your configuration for the backend:

1. Create a `.env` file in the `backend` directory with the following variables and paste the path in the location of backend:

   ```env
   PORT=3001
   MONGODB_URI=your_mongodb_connection_string
   SECRET_KEY=your_secret_key
   ```

2. Replace `your_mongodb_connection_string` and `your_secret_key` with your MongoDB connection string and a secret key for JWT token generation.

### Running the Application

1. Start the backend and frontend development server by the preapplied script:

   ```shell
   cd ../frontend
   npm run both
   ```

3. The SnapNotes application should now be running at http://localhost:3000 in your browser and should be running on 5000.

## Usage

1. Sign up for an account or log in if you already have one.
2. Start creating, reading, updating, and deleting your notes.
3. Your notes are stored securely and privately in your account.

## Contributing

If you'd like to contribute to SnapNotes, please follow the [contributing guidelines](CONTRIBUTING.md).

## Contact

If you have any questions or issues, feel free to [contact us](yashrajsoni.sde2003@gmail.com).

Happy note-taking with SnapNotes!``
