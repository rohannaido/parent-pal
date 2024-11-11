
import { initializeApp, cert } from 'firebase-admin/app';

const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

const firebaseSingleton = () => {
    return initializeApp({
        credential: cert(serviceAccount),
    });
};

type FirebaseSingleton = ReturnType<typeof firebaseSingleton>;

// eslint-disable-next-line
const globalForFirebase = globalThis as unknown as {
    firebase: FirebaseSingleton | undefined;
};

const firebase = globalForFirebase.firebase ?? firebaseSingleton();

export default firebase;

if (process.env.NODE_ENV !== 'production') globalForFirebase.firebase = firebase;
