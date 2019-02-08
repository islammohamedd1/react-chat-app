import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// const serviceAccount =  require('./react-chat-app-5c722ed4c4c8.json');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://react-chat-app-1a980.firebaseio.com',
})

exports.createChat = functions.firestore
	.document('chats/{chatId}')
	.onCreate(async (snapshot: any, context: any) => {
		const data = snapshot.data();
		const users = data.users;
        let userRef: any;
        let userSnapshot: any;
		for (let i = 0; i < users.length; i++) {
			userRef = snapshot.ref.parent.parent.collection('users').doc(users[i]);
			userSnapshot = await userRef.get();
            if (userSnapshot.exists) {
                const chats = userSnapshot.data().chats + 1;
                await userRef.update({ chats });
            }	
		}
    });
    
exports.newMessage = functions.firestore
    .document('chats/{chatId}/messages/{messageId}')
    .onCreate((snapshot: any, context: any) => {
        return snapshot.ref.set({
            time: new Date(),
        }, {merge: true});
    });

exports.newFreinds = functions.firestore
    .document('friends/{docId}')
    .onCreate(async (snapshot: any, context: any) => {
        const users = snapshot.data().users;
        let userRef;
        let userSnapshot;
        let friendsCount;
        for (let i = 0; i < users.length; i++) {
            userRef = snapshot.ref.parent.parent.collection('users').doc(users[i])
            userSnapshot = await userRef.get();
            friendsCount = userSnapshot.data().friends + 1;
            await userRef.set({ friends: friendsCount }, {merge: true});
        }

    });


exports.newUser = functions.auth.user().onCreate((user) => {
    const db = admin.firestore();
    return db.doc(`users/${user.uid}`).set({
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        chats: 0,
        friends: 0,
    })
    .then(docRef => console.log("user created successfully:", docRef))
    .catch(error => console.log("USER CREATION IN DATABSE ERROR!!", error));
    
})