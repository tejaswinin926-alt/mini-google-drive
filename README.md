# Mini Google Drive

A full-stack cloud file storage application inspired by Google Drive. Users can securely register, log in, upload, download, view, and delete files through a clean and responsive web interface.

## Features

* User Registration & Login
* JWT Authentication
* Secure Password Hashing
* File Upload
* File Download
* File Delete
* View Uploaded Files
* Responsive User Interface

## Tech Stack

### Frontend

* React (Vite)
* React Router
* React Icons
* Framer Motion
* React Toastify
* CSS

### Backend

* Flask
* Flask-JWT-Extended
* Flask-SQLAlchemy
* Flask-CORS
* SQLite

## Project Structure

```
mini-google-drive/
│
├── backend/
│   ├── app.py
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Installation

### Backend

```bash
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Future Enhancements

* Folder Management
* File Sharing
* Search Files
* Profile Management
* Dark Mode
* Cloud Storage Integration

## Author

**Tejaswini Nasanakoti**
