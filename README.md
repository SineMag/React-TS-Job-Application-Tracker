# Job Application Tracker

A modern, full-stack React TypeScript application for tracking job applications with Firebase backend integration. Built with Vite, React Router, and Firebase Authentication & Firestore.

## 🚀 Live Demo

**Live Application**: https://job-application-tracker-9b8c5.web.app

## ✨ Features

- **User Authentication** - Secure sign up/login with Firebase Auth
- **Job Application Management** - Add, edit, delete, and track job applications
- **Status Tracking** - Monitor application status (Applied, Pending, Interview, Offer, Rejected)
- **Cloud Storage** - All data stored securely in Firebase Firestore
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Real-time Sync** - Data syncs across all devices
- **404 Error Page** - Custom error page with video animation
- **Professional UI** - Modern, clean interface with smooth animations

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Routing**: React Router DOM v7
- **Styling**: CSS3 with Flexbox/Grid
- **Backend**: Firebase (Authentication + Firestore)
- **Deployment**: Firebase Hosting
- **Icons**: React Icons
- **Build Tool**: Vite

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**
- **Firebase CLI** (for deployment)

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

### 3. Firebase Configuration

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard

#### Get Firebase Config
1. In your Firebase project, click the gear icon → "Project settings"
2. Scroll down to "Your apps" and click the web icon `</>`
3. Register your app and copy the config object

#### Update Firebase Config
Replace the config in `src/firebase/config.ts` with your Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

#### Enable Firebase Services
1. **Authentication**:
   - Go to Authentication → Sign-in method
   - Enable "Email/Password" provider
   
2. **Firestore Database**:
   - Go to Firestore Database → Create database
   - Choose "Start in test mode" (rules will be updated automatically)

### 4. Run the Application
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

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
│   └── AuthContext.tsx  # Authentication context
├── firebase/            # Firebase configuration
│   ├── auth.ts         # Authentication functions
│   ├── config.ts       # Firebase config
│   └── firestore.ts    # Firestore database functions
├── assets/             # Static assets
│   ├── favicon.ico
│   ├── landing.png
│   └── logo.png
├── App.tsx             # Main app component
├── App.css             # Global styles
├── main.tsx            # App entry point
└── types.ts            # TypeScript type definitions

public/
├── Error.mp4           # 404 error page video
└── vite.svg

Firebase Files:
├── .firebaserc         # Firebase project configuration
├── firebase.json       # Firebase hosting configuration
├── firestore.rules     # Firestore security rules
└── firestore.indexes.json  # Firestore indexes
```

## 🎯 Usage

### Getting Started
1. **Sign Up**: Create a new account with email and password
2. **Login**: Access your personal dashboard
3. **Add Applications**: Click "Add New Application" to track a job application
4. **Manage Applications**: Edit, update status, or delete applications
5. **Logout**: Securely logout when done

### Application Statuses
- **Applied**: Initial application submitted
- **Pending**: Waiting for response
- **Interview**: Interview scheduled/completed
- **Offer**: Job offer received
- **Rejected**: Application rejected

## 🚀 Deployment

### Deploy to Firebase Hosting
1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Deploy**:
   ```bash
   firebase deploy
   ```

Your app will be deployed to: `https://your-project-id.web.app`

### Deploy to Other Platforms
The built files in the `dist/` folder can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

## 🔒 Security

- **Authentication**: Firebase Authentication handles secure user management
- **Database Rules**: Firestore rules ensure users can only access their own data
- **HTTPS**: All connections are encrypted
- **Input Validation**: Form inputs are validated on both client and server

## 🎨 Customization

### Styling
- Modify `src/App.css` for global styles
- Component-specific styles are included in the main CSS file
- Color scheme can be changed by updating CSS custom properties

### Adding Features
- New components go in `src/components/`
- Database functions in `src/firebase/firestore.ts`
- Types in `src/types.ts`

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Configuration Error**:
   ```
   Error: auth/configuration-not-found
   ```
   **Solution**: Enable Email/Password authentication in Firebase Console

2. **Build Errors**:
   - Ensure all dependencies are installed: `npm install`
   - Check TypeScript errors: `npm run build`

3. **Deployment Issues**:
   - Verify Firebase CLI is installed: `firebase --version`
   - Check project configuration: `firebase projects:list`

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
firebase deploy      # Deploy to Firebase Hosting
firebase serve       # Test Firebase hosting locally
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
- GitHub: [@SineMag](https://github.com/SineMag)

## 🙏 Acknowledgments

- React team for the amazing framework
- Firebase for backend services
- Vite for the fast build tool
- React Icons for the icon library

---

**Happy Job Hunting! 🎯**