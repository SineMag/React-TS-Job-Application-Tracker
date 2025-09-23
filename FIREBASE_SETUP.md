# Firebase Authentication Setup Required

## Error: auth/configuration-not-found

This error means Firebase Authentication is not enabled in your Firebase project.

## Steps to Fix:

1. **Open Firebase Console**:
   - Go to: https://console.firebase.google.com/project/job-application-tracker-9b8c5/authentication/providers

2. **Enable Authentication**:
   - Click "Authentication" in the left sidebar
   - Click "Get started" if this is your first time
   - Go to "Sign-in method" tab
   - Find "Email/Password" in the list
   - Click on it and toggle "Enable" to ON
   - Click "Save"

3. **Optional - Enable Additional Providers**:
   - You can also enable Google, GitHub, or other providers if desired

4. **Redeploy Application**:
   - After enabling authentication, run:
   ```bash
   npm run build
   firebase deploy
   ```

## Alternative: Test Locally First

You can test the changes locally before deploying:
```bash
npm run dev
```

Then visit http://localhost:5174 to test authentication.

## What This Enables:
- User registration with email/password
- User login/logout
- Secure access to personal job applications
- Data persistence across sessions
