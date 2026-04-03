'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  try {
    if (!getApps().length) {
      // Important! initializeApp() is called without any arguments because Firebase App Hosting
      // integrates with the initializeApp() function to provide the environment variables needed to
      // populate the FirebaseOptions in production. It is critical that we attempt to call initializeApp()
      // without arguments.
      let firebaseApp;
      try {
        // Attempt to initialize via Firebase App Hosting environment variables
        firebaseApp = initializeApp();
      } catch (e) {
        // Silent failing during SSR is acceptable as we fall back to config
        firebaseApp = initializeApp(firebaseConfig);
      }

      return getSdks(firebaseApp);
    }
    return getSdks(getApp());
  } catch (err) {
    if (process.env.NODE_ENV === "production") {
      console.error('CRITICAL: Firebase initialization failed completely. App may be unstable.', err);
    }
    // Return empty objects/nulls instead of crashing the entire server process
    return {
      firebaseApp: null as any,
      auth: null as any,
      firestore: null as any
    };
  }
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
