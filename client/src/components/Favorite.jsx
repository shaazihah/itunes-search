import React, {Component} from 'react';

class Favorite extends Component {
    constructor(){
        super()
        this.state = {
            songFav: [],
            booksLike: []
        }
    }
// fetches info from favorites music json file.
    componentDidMount(){
        fetch('/favoritesMusic')
            .then(res => res.json())
            .then(music => this.setState({songFav: music}))

            fetch('/favoritesBooks')
            .then(res => res.json())
            .then(books => this.setState({booksLike: books}))
    }
//remove favorited songs
    remSong = (i) => {
        let songDeleteFromFav = {
            deleted: i.id
        }
        //fetches updated data once items has been removed
        fetch('/favoritesMusic', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(songDeleteFromFav)
        })
        //page will reload once item is removed
        document.location.reload()
    }
//removes any favorite book 
    bookRemove = (i) => {
        let bookRemovedFromFav = {
            deleted: i.id
        }
        //fetches updated data once items has been removed
        fetch('/favoritesBooks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookRemovedFromFav)
        })
        document.location.reload()
    }
    render(){
        return(
            <div>
                <fieldset>
            {/*this the song information the user favorites */}
                    {this.state.songFav.map(favM => <article key={favM.trackId}> <p>{favM.artist}</p> <p>{favM.trackId}</p>
                        <img src={favM.artwork} alt='artwork'/><br/>
                        <audio controls><source src={favM.sample}/></audio>
                        <p>{favM.track}</p>
                    
                        <button onClick={() => {this.remSong(favM)}}>Remove</button>

                    </article>)}
                </fieldset>
                <fieldset>
            {/*this displays info of favourited book*/}
                    {this.state.booksLike.map(favB => <article key={favB.artwork}><p>{favB.artist}</p>
                        <img src={favB.artwork} alt='artwork'/><br/>
                        <p>{favB.description}</p>
                        <p>{favB.track}</p>
                        <button onClick={() => {this.bookRemove(favB)}}>Remove</button>

                    </article>)}
                </fieldset>
            </div>
        )
    }
}

export default Favorite