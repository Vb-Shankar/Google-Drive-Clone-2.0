# Google Drive Clone - Frontend

A React-based frontend application for a Google Drive clone with file management, drag-and-drop uploads, and authentication.

## Features

- **Authentication System**
  - User registration with email verification
  - Login with verified email
  - Forgot password functionality
  - Password reset via email link
  - Two-step activation workflow

- **File Management**
  - View files and folders with timestamps
  - Create new folders
  - Upload files via drag-and-drop
  - Download files
  - Delete files
  - Responsive dashboard

- **UI/UX**
  - Tailwind CSS for styling
  - React Icons for better visuals
  - React Toastify for notifications
  - Clean and intuitive interface

## Prerequisites

- Node.js (v16+)
- npm or yarn
- Backend server running on `http://localhost:5000`

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/googledrive-frontend.git
cd googledrive-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your API URL:
```
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Google Drive Clone
```

## Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Build

Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/      # Reusable components
├── pages/          # Page components (Login, Register, Dashboard, etc.)
├── services/       # API service calls
├── context/        # React Context (Authentication)
├── utils/          # Utility functions
├── App.jsx         # Main app component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Technology Stack

- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation
- **React Icons** - Icon library
- **React Toastify** - Notifications

## License

This project is open source and available under the MIT License.
