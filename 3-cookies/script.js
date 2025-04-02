const closeCookies = document.querySelector('.close-cookies-button');
const cookiesDialog = document.querySelector('.cookies-container');
const acceptCookies = document.querySelector('.accept-cookies-button');

document.addEventListener("DOMContentLoaded", () => {
    // if (document.cookie) {
    //     cookiesDialog.style.display = "none";
    // }

    closeCookies.addEventListener(("click"), () => {
        cookiesDialog.style.display = 'none';
    });

    acceptCookies.addEventListener(('click'), () => {
        let cookie_expiration = new Date();
        cookie_expiration.setFullYear(cookie_expiration.getFullYear() + 1);
        cookie_string = "test_cookies=true; path=/; expires=" + cookie_expiration.toUTCString();

        document.cookie = cookie_string;
        cookiesDialog.style.display = 'none';
    });
})