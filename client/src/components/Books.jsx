import React, {Component} from 'react';

class Books extends Component{
    constructor(){
        super()
        this.state ={
            data: [],  
            bookInput: ''
        }
    }
    //this gets books api and displays it
    newSearch(){
        fetch('/books')
            .then(res => res.json())
            .then(data => this.setState({data}))
    }
    //fetching info from api 
    bookSearch = async () => {
        let search = this.state.bookInput.split(' ').join('+')
        const getBook = await fetch(`/book?search=${search}&type=${this.state.type}`)
        let res = await getBook.json()
        this.setState({
            data: res
        })
    }
    //gets and adds info to favorites json file
    FaveBook= (i) => {
        let imFave = {
            id: i.trackId,
            artist: i.artistName,
            artwork: i.artworkUrl100,
            track: i.trackName,
            //this gets and posts books info to favoritesBooks json file 
            description: i.description
        }
        fetch('/favoritesBooks', {
            method: 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(imFave)
        })
        alert('Book added to favourites')
    }
    
    render(){
        return (
            <div>
       
                <h1>E-Books</h1>
            {/* allows user to enter a song/artist */}
                <input type="text" onChange={(e) => this.setState({bookInput: e.target.value})}input/>
                <button onClick={() => this.bookSearch()}>Search</button>
                <fieldset>
            {/*displays ebooks information */}
                    {this.state.data.map(sort_data => <article key={sort_data.trackId}>{sort_data.artistName}&nbsp;
                    {sort_data.trackName}
                    <p>{sort_data.description}</p>
                    <img src={sort_data.artworkUrl100} alt='bookPic'/><br/><br/>
                    <button onClick={() => {this.FaveBook(sort_data)}}>Favorite</button>
                    </article>)}
                </fieldset>
            </div>
        )
    }
}

export default Books