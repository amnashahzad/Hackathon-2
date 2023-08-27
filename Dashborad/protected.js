function isAuthenticated() {
    const user = localStorage.getItem('user');
    return user !== null;
}

// Check if the user is authenticated
if (!isAuthenticated()) {
    window.location.href = '../index.html' ;
}

const logout = () => {
    localStorage.removeItem('user');
    console.log('loging out....');
}