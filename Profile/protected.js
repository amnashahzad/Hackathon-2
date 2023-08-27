function isAuthenticated() {
    const user = sessionStorage.getItem('user');
    return user !== null;
}

if (!isAuthenticated()) {
    window.location.href = '../signup/signup.html' ;
}