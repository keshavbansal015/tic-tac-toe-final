import { getFirestore, doc, updateDoc, increment } from 'firebase/firestore';

const updateUserStats = async (userId, fieldToUpdate) => {
    const db = getFirestore();
    const userRef = doc(db, 'users', userId);

    try {
        // Increment the specified field
        await updateDoc(userRef, {
            [fieldToUpdate]: increment(1)
        });
        console.log(`User ${fieldToUpdate} updated`);
    } catch (error) {
        console.error('Error updating user stats:', error);
    }
};

export default updateUserStats;