import page from '../node_modules/page/page.mjs';
import {
    render
} from '../node_modules/lit-html/lit-html.js';
import {
    homePage
} from './views/home.js'
import {
    registerPage
} from './views/register.js';
import {
    logout
} from './api/data.js';
import {
    loginPage
} from './views/login.js';
import {
    addMoviePage
} from './views/addMovie.js';
import {
    detailsPage
} from './views/details.js';
import {
    editPage
} from './views/edit.js';

const main = document.querySelector('main');

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();

    setUserNav();
    page.redirect('/');
})




page('/', decorateContext, homePage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);
page('/addMovie', decorateContext, addMoviePage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);

setUserNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const email = sessionStorage.getItem('email');
   
    if (email != null) {
        document.getElementById('welcomeMsg').textContent = `Welcome, ${email}`;
        [...document.querySelectorAll('.guest')].forEach(e => e.style.display = 'none');
        document.querySelector('.user').style.display = 'block';
    } else {
        [...document.querySelectorAll('.guest')].forEach(e => e.style.display = 'block');
        document.querySelector('.user').style.display = 'none';
    }

}