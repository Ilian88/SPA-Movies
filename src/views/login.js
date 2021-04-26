import {
    html
} from '../../node_modules/lit-html/lit-html.js';
import {
    login
} from '../api/data.js';

const template = (onSubmit, err) => html `
    <section id="form-login">
    <form @submit=${onSubmit} class="text-center border border-light p-5" action="" method="">
        <div class="form-group">

            ${err ? html ` <div class="errMsg">
                <p >${err }</p>
            </div>`: '' }
            

            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <button type="submit" class="btn btn-primary">Login</button>
    </form>
    </section>
`

export async function loginPage(ctx) {

    ctx.render(template(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {

            await login(email, password);

            event.target.reset();
            ctx.setUserNav();
            ctx.page.redirect('/');
        } catch (err) {

            ctx.render(template(onSubmit, err.message));

        }
    }

}