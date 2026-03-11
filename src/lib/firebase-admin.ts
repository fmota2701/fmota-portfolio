import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

let app: App;

// Initialize Firebase Admin (for server-side use in API routes)
if (getApps().length === 0) {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

    if (!projectId) {
        console.warn("NEXT_PUBLIC_FIREBASE_PROJECT_ID is not set. Firebase Admin may not work correctly.");
    }

    // Check if we have service account credentials
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (serviceAccountKey && projectId) {
        try {
            const serviceAccount = JSON.parse(serviceAccountKey);
            app = initializeApp({
                credential: cert(serviceAccount),
                projectId,
                storageBucket,
            });
        } catch (e) {
            console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:", e);
            app = initializeApp({ projectId, storageBucket }); // Fallback
        }
    } else if (projectId) {
        app = initializeApp({
            projectId,
            storageBucket,
        });
    } else {
        // Dummy initialization to prevent crashes during build
        app = initializeApp({ projectId: "dummy-id" });
    }
} else {
    app = getApps()[0];
}

export const adminDb = getFirestore(app);
export const adminStorage = getStorage(app);
export default app;
