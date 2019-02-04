import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.createChat = functions.firestore
	.document('chats/{chatId}')
	.onCreate(async (snapshot: any, context: any) => {
        console.log("Document created");
        
		const data = snapshot.data();
		const users = data.users;
        let userRef: any;
        let userSnapshot: any;
		for (let i = 0; i < users.length; i++) {
			userRef = snapshot.ref.parent.parent.collection('users').doc(users[i]);
			console.log(users[i]);
			userSnapshot = await userRef.get();
            if (userSnapshot.exists) {
                const chats = userSnapshot.data().chats + 1;
                console.log(chats);
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