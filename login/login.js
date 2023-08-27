const login = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

//     firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             let user = userCredential.user;
//             firebase.database().ref('users/' + user.uid).set({
//                 uid: user.uid,
//                 email: email,
//                 password: password
//                 // You shouldn't save the password to the database for security reasons.
//                 // Instead, you can save other user-related information here.
//             })
//                 .then(() => {
//                     const userSession = { email: email, };
//                     sessionStorage.setItem('user', JSON.stringify(userSession));
//                     console.log('User created successfully.');
//                     window.location.href = '../Dashborad/dash.html';
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 });
//         })
//         .catch((error) => {
//             let errorCode = error.code;
//             let errorMessage = error.message;
//             console.log(errorCode + ': ' + errorMessage);
//         });
firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            console.log(user)
            const dbRef = firebase.database().ref();
            dbRef.child("users").child(user.uid).get().then((snapshot) => {
                if (snapshot.exists()) {
                    const username = snapshot.val().username
                    console.log(username);
                         const user = { email: email, username: username };
                        localStorage.setItem('user', JSON.stringify(user));
                        console.log('User created successfully.')
                        window.location.href = '../Dashborad/dash.html'
                    // if (userData.role === 'Admin') {
                    //     const user = { email: email };
                    //     localStorage.setItem('user', JSON.stringify(user));
                    //     console.log('User created successfully.')
                    //     window.location.href = '../Admin/items/items.html'
                    // }
                    // else {
                    //     const user = { email: email };
                    //     localStorage.setItem('user', JSON.stringify(user));
                    //     window.location.href = '../Home/home.html'
                    // }
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + ': ' + errorMessage)
        });
}
