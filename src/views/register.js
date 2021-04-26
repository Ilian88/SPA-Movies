import {
    html
} from '../../node_modules/lit-html/lit-html.js';
import {
    register
} from '../api/data.js';

const template = (onSubmit,err) => html `
    <section id="form-sign-up">
    <form @submit = ${onSubmit} class="text-center border border-light p-5" action="#" method="post">
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

        <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
        </div>

        <button type="submit" class="btn btn-primary">Register</button>
    </form>
    </section>
`

export async function registerPage(ctx) {

    ctx.render(template(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repass = formData.get('repeatPassword');

       
        
        try {
            if (email == '') {
                throw new Error('Email must be filled!');
            }
            if (password.length < 6) {
                throw new Error('Password must contain at least 6 characters!');
            }
            if (password != repass) {
                throw new Error('Passwords don\' match!');
            }
            await register(email, password);
         

        event.target.reset();
        ctx.setUserNav();
        ctx.page.redirect('/');

        } catch (err) {
            ctx.render(template(onSubmit,err.message));
        }
        
    }

}