
const nameValue = "token";

function setToken(token){
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 8 * 60 * 60 * 1000);
    const cookieValue = `${encodeURIComponent(nameValue)}=${encodeURIComponent(token)};expires=${expirationDate.toUTCString()};path=/`;
    document.cookie = cookieValue;
}

function getToken(){
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(nameValue + '=')) {
            return decodeURIComponent(cookie.substring(nameValue.length + 1));
        }
    }
    return null;
}

export {
    setToken,
    getToken
}