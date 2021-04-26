import {
    html
} from '../../node_modules/lit-html/lit-html.js';
import {
    deleteMovie,
    getLikeFromSpecificUser,
    getMovieById,
    getNumberOfLikes
} from '../api/data.js';
import {
    addLike
} from '../api/data.js';

import {
    createModal
} from '../modal.js'

const template = (movie, isOwner, likes, onDelete, onEdit, createLike, isLiked) => html `
    <section id="movie-example">
    <div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
                <img class="img-thumbnail" src=${movie.img}
                     alt="Movie">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${movie.description}</p>

                ${isOwner ? html ` 
                <a @click = ${onDelete} class="btn btn-danger" href="javascript:void(0)">Delete</a>
                <a @click=${onEdit} class="btn btn-warning" href="javascript:void(0)">Edit</a>
                <span  class="enrolled-span">Liked ${likes}</span>
                ` 
                : isLiked ? html `
                <span  class="enrolled-span">Liked ${likes}</span>`
                    :
                html `
                    <a @click = ${createLike}  class="btn btn-primary" href="javascript:void(0)">Like</a>
                `  }

                
            </div>
        </div>
    </div>
    </section>
`

export async function detailsPage(ctx) {
    const id = ctx.params.id;

    

    const movie = await getMovieById(id);
    const userId = sessionStorage.getItem('userId');
    let likes = await getNumberOfLikes(id);
    let likeArr = await getLikeFromSpecificUser(movie._id,userId);
    let isLiked = likeArr.find(m=> m._ownerId == userId && m.movieId == movie._id);
    
    if(isLiked) {
        isLiked = true;
    } else {
        isLiked = false;
    }


    let isOwner = movie._ownerId == userId;


    ctx.render(template(movie, isOwner, likes, onDelete, onEdit, createLike,isLiked));


    async function createLike() {
        await addLike(movie);
        await getNumberOfLikes(id);
        isLiked = true;
        ctx.render(template(movie, isOwner, likes, onDelete, onEdit, createLike, isLiked));
    }


    async function onDelete() {
        createModal('Are you sure you want to delete this idea?', onChoice);

        async function onChoice(confirmed) {
            if (confirmed) {
                await deleteMovie(id);

                ctx.page.redirect('/');
            }
        }

    }

    async function onEdit() {

        ctx.page.redirect('/edit/' + id);

    }


}