const url='https://itunes.apple.com/search?term='
const proxyUrl= 'https://proxy-itunes-api.glitch.me/search?term='
const form =document.querySelector('#music-search-form')
const songList= document.querySelector('#song-list')

form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearErrors();
    clearResults();
    searchRequest();
})

function clearResults () {
    let songs = document.querySelectorAll("li")
        for (let song of songs) {
            song.remove();
        }      
}

function searchRequest () {
    let searchInput = document.querySelector('#search-box').value
    searchInput = searchInput.replace(/ /g, "+");
    console.log(searchInput)
    fetch(url + searchInput)
    .then(res => res.json())
    .then(data => {
        if (data.results.length > 0) {
            for (let song of data.results) {
                renderMusicResults(song)
            }    
        } else {
            noResults()
            }
        })
    
    .catch(error => {
        catchError()}) 
}

function noResults () {
    let indSong = document.createElement('li')
        
    let noResult = document.createElement('p')
    noResult.innerText= "No results found"
    indSong.appendChild(noResult)
    songList.appendChild(indSong)
}

function renderMusicResults (song) {
    let indSong = document.createElement('li')
    
    let songAudio = document.createElement('audio')
    songAudio.className = 'music-player'
    songAudio.src = song.previewUrl
    songAudio.volume = .4
    indSong.appendChild(songAudio)
    
    let artwork = document.createElement('img')
    artwork.src=song.artworkUrl100
    indSong.appendChild(artwork)
    
    let artistName= document.createElement('h3')
    artistName.innerText=song.artistName
    indSong.appendChild(artistName)
    
    let title = document.createElement('h5')
    title.innerText = song.trackName
    indSong.appendChild(title)

    let releaseDate = document.createElement('p')
    releaseDate.innerText =`Release Date: ${moment(song.releaseDate). format('l')}`;
    indSong.appendChild(releaseDate)
    
    let trackId= document.createElement('p')
    trackId.innerText=song.trackId

    songList.appendChild(indSong)

    songList.addEventListener('click', e => {
    playMusic(e.target.parentElement)
})
}

function playMusic(song) {
    let audio = document.querySelector("audio")
    console.log(song.firstElementChild)
    audio.src = song.firstElementChild.src
}

function catchError () {
    let indSong = document.createElement('li')
    let errorEl = document.createElement('p')
    errorEl.innerText = 'Error'
    indSong.appendChild(errorEl)
    songList.appendChild(indSong)
}

function clearErrors () {
    let errors = document.querySelectorAll("li")
    for (let error of errors) {
        error.remove();
    }    
}
