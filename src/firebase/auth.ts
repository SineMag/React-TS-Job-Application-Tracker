import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  type User 
} from 'firebase/auth';
import { auth } from './config';

export const signUp = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    if (error.code === 'auth/configuration-not-found') {
      throw new Error('Firebase Authentication is not enabled. Please enable Email/Password authentication in Firebase Console.');
    }
    throw error;
  }
};

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    if (error.code === 'auth/configuration-not-found') {
      throw new Error('Firebase Authentication is not enabled. Please enable Email/Password authentication in Firebase Console.');
    }
    throw error;
  }
};

export const logOut = async (): Promise<void> => {
  await signOut(auth);
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
