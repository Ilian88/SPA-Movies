import {html} from '../../node_modules/lit-html/lit-html.js';
import { getMovieById, updateMovie } from '../api/data.js';

const templateEdit = (movie,onSubmit) => html `
    <section id="edit-movie">
    <form @submit=${onSubmit} class="text-center border border-light p-5" >
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Movie Title" .value=${movie.title} name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..." .value=${movie.description} name="description" ></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" .value=${movie.img} name="imageUrl">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    </section>
`

export async function editPage(ctx) {
    const id = ctx.params.id;
    const movie = await getMovieById(id);
    console.log(id);
    ctx.render(templateEdit(movie,onSubmit));


    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const data =  [...formData.entries()].reduce((a,[k,v]) => Object.assign(a,{[k] :v}),{});
        console.log(data);

        await updateMovie(id,data);
        
        ctx.page.redirect('/details/' + id);
    }

}