
import { initializeApp, cert } from 'firebase-admin/app';

const firebaseSingleton = () => {
    return initializeApp();
};

type FirebaseSingleton = ReturnType<typeof firebaseSingleton>;

// eslint-disable-next-line
const globalForFirebase = globalThis as unknown as {
    firebase: FirebaseSingleton | undefined;
};

const firebase = globalForFirebase.firebase ?? firebaseSingleton();

export default firebase;

if (process.env.NODE_ENV !== 'production') globalForFirebase.firebase = firebase;
