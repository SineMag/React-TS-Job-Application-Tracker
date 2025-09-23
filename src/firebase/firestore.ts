import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from './config';
import type { JobApplication } from '../types';

const COLLECTION_NAME = 'jobApplications';

export const addJobApplication = async (userId: string, application: Omit<JobApplication, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...application,
    userId,
    dateApplied: application.dateApplied,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return docRef.id;
};

export const updateJobApplication = async (applicationId: string, updates: Partial<JobApplication>): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, applicationId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: new Date()
  });
};

export const deleteJobApplication = async (applicationId: string): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, applicationId);
  await deleteDoc(docRef);
};

export const getUserJobApplications = async (userId: string): Promise<JobApplication[]> => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  const applications: JobApplication[] = [];
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    applications.push({
      id: doc.id,
      company: data.company,
      position: data.position,
      status: data.status,
      dateApplied: data.dateApplied.toDate(),
      notes: data.notes || ''
    });
  });
  
  return applications;
};
