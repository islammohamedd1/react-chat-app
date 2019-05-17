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
    const userRef = db.doc(`users/${user.uid}`);
    const searchesRef = db.doc(`searches/${user.uid}`);
    const userData = {
        // displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        chats: 0,
        friends: 0,        
    }

    const searchData = {
        // displayName: user.displayName,
        email: user.email,
        uid: user.uid,
    }

    const batch = db.batch();

    batch.set(userRef, userData);
    batch.set(searchesRef, searchData);

    batch.commit()
    .then(() => console.log("User added successfully!"))
    .catch(error => console.log(`Error adding user: ${error}`));
});

exports.removeUser = functions.auth.user().onDelete((user) => {
    const db = admin.firestore();
    const userRef = db.doc(`users/${user.uid}`);
    const searchesRef = db.doc(`searches/${user.uid}`);

    userRef.delete().catch(error => console.log(error));
    searchesRef.delete().catch(error => console.log(error));

    db.collection("chats").where("users", "array-contains", user.uid).get().then(results => {
        results.docs.forEach(doc => {
            doc.ref.delete().catch(error => console.log(error));
        })
    })
});

exports.newUserDoc = functions.firestore.document("user/{userId}").onCreate(doc => {
    let data;
    data = doc.data();
    if (data) {
        admin.auth().getUser(data.uid).then(user => {
            doc.ref.set({displayName: user.displayName});
        }).catch(error => {console.log(error)});
    }
});

exports.updateUser = functions.https.onCall((user, context) => {
    const db = admin.firestore();
    const userRef = db.doc(`users/${user.uid}`);
    const searchRef = db.doc(`searches/${user.uid}`);

    const batch = db.batch();

    batch.set(userRef, {displayName: user.displayName}, {merge: true});
    batch.set(searchRef, {displayName: user.displayName}, {merge: true});

    batch.commit().catch(error => console.log(error));
})