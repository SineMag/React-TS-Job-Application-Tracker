<img src="https://socialify.git.ci/SineMag/React-TS-Job-Application-Tracker/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="React-TS-Job-Application-Tracker" width="640" height="320" />

# 📋 Job Application Tracker

A modern, full-stack React TypeScript application for tracking job applications with a lightweight JSON Server backend. Built with Vite, React Router, and localStorage authentication for simplicity and ease of development. The frontend and backend can be deployed together on Render.com so you can use the app without running JSON Server manually.


## ✨ Features

- **Simple Authentication** - Easy sign up/login with localStorage
- **Job Application Management** - Add, edit, delete, and track job applications
- **Status Tracking** - Monitor application status (Applied, Pending, Interview, Offer, Rejected)
- **Local Data Storage** - All data stored in JSON Server for development
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Search & Filter** - Find applications by company, position, or status
- **Sort Functionality** - Sort applications by date applied
- **404 Error Page** - Custom error page with video animation
- **Professional UI** - Modern, clean interface with smooth animations

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Routing**: React Router DOM v7
- **Styling**: CSS3 with Flexbox/Grid
- **Backend**: JSON Server (REST API) running as a Node service
- **Authentication**: localStorage (for demo purposes)
- **Deployment**: Render.com (frontend + backend)
- **Icons**: React Icons
- **Build Tool**: Vite

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- A **Render.com account** (for cloud deployment)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/SineMag/React-TS-Job-Application-Tracker.git
cd React-TS-Job-Application-Tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Application

#### Option A: Run Both Servers Together (Recommended) 🚀
```bash
npm run dev:full
```
This will start both JSON Server (port 3001) and React app (port 5174) simultaneously.

#### Option B: Run Servers Separately
```bash
# Terminal 1 - Start JSON Server
npm run json-server

# Terminal 2 - Start React app
npm run dev
```

### 4. Access the Application (expected results)
- **Frontend**: http://localhost:5174
- **JSON Server API**: http://localhost:3001
- **API Endpoints**:
  - Job Applications: http://localhost:3001/jobApplications
  - Users: http://localhost:3001/users

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Dashboard.tsx    # Main dashboard with job applications
│   ├── ErrorPage.tsx    # 404 error page
│   ├── Footer.tsx       # Footer component
│   ├── Header.tsx       # Navigation header
│   ├── JobApplicationForm.tsx    # Form for adding/editing applications
│   ├── JobApplicationList.tsx    # List view of applications
│   ├── LogInPage.tsx    # Login page
│   ├── SignUpPage.tsx   # Sign up page
│   └── WelcomePage.tsx  # Landing page
├── contexts/            # React contexts
│   ├── AuthContext.tsx  # Authentication context
│   └── NotificationContext.tsx  # Notification context
├── services/            # API services
│   └── api.ts          # JSON Server API functions
├── assets/             # Static assets
│   ├── favicon.ico
│   ├── landing.png
│   └── logo.png
├── App.tsx             # Main app component
├── App.css             # Global styles
├── main.tsx            # App entry point
└── types.ts            # TypeScript type definitions

Root Files:
├── db.json             # JSON Server database
├── package.json        # Dependencies and scripts
├── .firebaserc         # Firebase project configuration
├── firebase.json       # Firebase hosting configuration (hosting only)
└── public/
    ├── Error.mp4       # 404 error page video
    └── vite.svg
```

## 🎯 Getting Started

### 1. Sign Up
- Navigate to the [Sign-Up Page](https://job-application-tracker-9b8c5.web.app/signup).
- Create a new account with any email and password.
- All data is stored locally in your browser's localStorage.

### 2. Login
- After signing up, you will be redirected to the [Login Page](https://job-application-tracker-9b8c5.web.app/login).
- Access your personal dashboard by entering your credentials.

### 3. Add Applications
- Once logged in, you will be taken to your dashboard.
- Click "Add New Application" to start tracking a job application.
- Fill in the details and save.

### 4. Search & Filter
- Use the search bar to find applications by company or position.
- Use the filter dropdown to see applications with a specific status.

### 5. Manage Applications
- Click the "Edit" or "Delete" button on any application to manage it.
- You can also update the status of an application from the dropdown menu.

### 6. Logout
- Click the "Logout" button in the header to securely log out.
- You will be redirected to the home page.

### Application Statuses
- **Applied**: Initial application submitted
- **Pending**: Waiting for response
- **Interview**: Interview scheduled/completed
- **Offer**: Job offer received
- **Rejected**: Application rejected

## 🚀 Deployment (render.com)

### Deploy to Render.com (Frontend + Backend)

You can host both the JSON Server backend and the React frontend on Render so that the app works without running JSON Server manually.

#### 1. Backend (API) service

1. Push your code to GitHub (or another Git provider).
2. In the Render dashboard, create a **New Web Service** and connect this repository.
3. Set the **Root Directory** to `backend`.
4. Set the **Build Command** to:
   ```bash
   npm install
   ```
5. Set the **Start Command** to:
   ```bash
   npm start
   ```
6. Deploy the service and note the backend URL, e.g. `https://your-backend.onrender.com`.

#### 2. Frontend service

1. In Render, create a **New Static Site** and connect the same repository.
2. Leave the **Root Directory** empty (use the repo root).
3. Set the **Build Command** to:
   ```bash
   npm install && npm run build
   ```
4. Set the **Publish Directory** to:
   ```bash
   dist
   ```
5. Add an environment variable to the static site:
   - Key: `VITE_API_URL`
   - Value: your backend URL (for example `https://your-backend.onrender.com`)
6. Deploy the static site.

Once deployed, the frontend will call the Render backend directly using `VITE_API_URL`, and you will not need to run JSON Server manually.

### Using the hosted backend from local development

If you prefer to use the hosted backend while running the frontend locally:

1. Create a `.env` file in the project root:
   ```bash
   VITE_API_URL=https://your-backend.onrender.com
   ```
2. Start the frontend only:
   ```bash
   npm run dev
   ```

The app will then use the Render backend instead of a locally running JSON Server.

### 🔧 Production Considerations
For production deployment, you'll need to:
- Replace JSON Server with a proper backend (Node.js/Express, Python/Django, etc.)
- Implement proper authentication (JWT, OAuth, etc.)

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start React development server only
npm run json-server      # Start JSON Server backend only
npm run dev:full         # Start both frontend and backend simultaneously (recommended)

# Backend (from the root project)
npm run backend          # Start JSON Server backend from the /backend folder

# Production
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint
npm start                # Build and serve the production bundle with Express
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Sinenhlanhla Magubane**
- [@SineMag](https://github.com/SineMag)

## 🌟 Key Features Explained

### JSON Server Backend
- **REST API**: Full CRUD operations via HTTP requests
- **File-based Storage**: Data persists in `db.json` file
- **Auto-reload**: Changes to `db.json` automatically update the API
- **Easy Testing**: Direct API access at `http://localhost:3001`

### Development Workflow
1. **Start Development**: `npm run dev:full` 🚀
2. **Make Changes**: Edit React components or API calls
3. **Test Features**: Add/edit/delete job applications
4. **View Data**: Check `db.json` to see stored data
5. **Deploy**: Build and deploy frontend to Firebase Hosting

## 🔄 Data Flow

```
React App (Frontend) ↔ JSON Server (Backend) ↔ db.json (Database)
     Port 5174              Port 3001            File System
```

## 🎯 Perfect For

- **Learning React & TypeScript** 📚
- **API Integration Practice** 🔌
- **Portfolio Projects** 💼
- **Rapid Prototyping** ⚡
- **Job Application Tracking** 📋

## 🙏 Acknowledgments

- **React Team** for the amazing framework ⚛️
- **JSON Server** for the simple backend solution 🗄️
- **Firebase** for hosting services 🔥
- **Vite** for the lightning-fast build tool ⚡
- **React Icons** for the beautiful icon library 🎨

---

## 🚀 Quick Start Summary

```bash
# 1. Clone the repository
git clone https://github.com/SineMag/React-TS-Job-Application-Tracker.git
cd React-TS-Job-Application-Tracker

# 2. Install dependencies
npm install

# 3. Start both servers
npm run dev:full

# 4. Open your browser
# Frontend: http://localhost:5174
# API: http://localhost:3001
```

---

**Happy Job Hunting! 🎯✨**
