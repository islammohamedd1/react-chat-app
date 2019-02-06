import * as functions from 'firebase-functions';

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