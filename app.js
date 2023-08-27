// Firebase initialization
const app = firebase.initializeApp(firebaseConfig);

// Signup function
const signup = () => {
    let username = document.getElementById('userName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let repeatPassword = document.getElementById('repeatPassword').value;

    // Password validation
    if (password !== repeatPassword) {
        console.log("Passwords do not match.");
        return;
    }

    // Create user with email and password
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            // Store user data in Firebase Database
            firebase.database().ref('users/' + user.uid).set({
                uid: user.uid,
                username: username,
                lastName: lastName,
                email: email,
                password: password,
            })
            .then(() => {
                const user = { email: email, username: username };
                sessionStorage.setItem('user', JSON.stringify(user));
                console.log('User created successfully.');
                const data = sessionStorage.getItem('user')
                console.log(data);
                // window.location.href = '../Dashborad/dash.html';
                // sessionStorage.getItem('user', JSON)
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + ': ' + errorMessage);
        });
        
}

