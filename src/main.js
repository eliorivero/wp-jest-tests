import './main.scss';

export const wpJestTestsInit = () => {
    if ( ! wpJestTests || ! wpJestTests.posts ) {
        return false;
    }
    const entryContent = document.querySelector( '.entry-content' );
    if ( ! entryContent ) {
		return false;
    }
    entryContent.insertAdjacentHTML( 'afterend', '<button type="button" id="load-posts">Load Posts</button>' );
    const button = document.querySelector( '#load-posts' );

    const loadPosts = () => {
        fetch( wpJestTests.restUrl + 'wp/v2/posts?per_page=' + wpJestTests.posts )
        .then( res => {
            if ( ! res.ok ) {
                throw new Error( res.status );
            }
            return res.json();
        } )
        .then(
            res => {
                entryContent.classList.add( 'jest-tests' );
                button.parentNode.removeChild( button );
                entryContent.innerHTML = '<ul>' + res.map(
                    post => `<li><a href="${ post.link }">${ post.title.rendered }</a></li>`
                ).join( '' ) + '</ul>';
            }
        )
        .catch( err => console.error( err ) );
    }

    button.addEventListener( 'click', loadPosts );
    
    return true;
}

document.addEventListener( 'DOMContentLoaded', wpJestTestsInit );
