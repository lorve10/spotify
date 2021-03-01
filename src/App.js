import React, { useState, useEffect } from 'react';
import { Credentials } from './Credentials';
import axios from 'axios';
import body from './body.css';
import Artistas from './component/Artistas';
import Canciones from './component/Canciones';
import Newreleases from './component/Newreleases';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

const App = () => {

/////////// llamda a funcion Credentials
  const spotify = Credentials();
  console.log('Cargando..  (._.)');


  const [genres, setGenres] = useState({selectedgenero: '',listageneroFronAPI: []});
  const [artista, setArtista]=useState({ selectedArtista: '', listaFronAPI:[]});
  const [releases, setreleases]=useState({selectedreleases:'', listreleasesAPI:[]});
  const [canciones, setCanciones]=useState({selectedcanciones:'',listaCanciones:[]})
  const [token, setToken] = useState('');
  const [buscar, setBuscar]=useState('');
  const [leer, setleer]=useState('');
  const [check, setCheck] = useState(false);


  useEffect(() => {

    axios('https://accounts.spotify.com/api/token', {
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(spotify.ClientId+ ':' + spotify.ClientSecret)
             },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(tokenResponse => {
      setToken(tokenResponse.data.access_token);

      //////////////// llamada a categorias ///////////

      axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then(genreResponse =>{
        setGenres({
              selectedgenero: genres.selectedgenero,
              listageneroFronAPI: genreResponse.data.categories.items
            })
      });

     /////////////// llamada a new releases///////////
      axios("https://api.spotify.com/v1/browse/new-releases?limit=10",{
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
      })
      .then(releasesresponse =>{
        setreleases({
        selectedreleases: releases.selectedrelease,
        listreleasesAPI: releasesresponse.data.albums.items
        })
     });

    });

  },[genres.selectedGenre,spotify.ClientId,spotify.ClientSecret]);


////////////////////// Bucador de artista ///////////
  const hal=()=>{
    axios(`https://api.spotify.com/v1/search?q=${buscar}&type=track%2Cartist`,{
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    })
    .then(Artistaresponse =>{
        setArtista({
          selectedArtista: artista.selectedArtista,
          listaFronAPI: Artistaresponse.data.artists.items
        })

    })
  }
  ////////////// fin buscador artista////////

  ///////// buscador canciones //////////
  const cancion=()=>{
    axios(`https://api.spotify.com/v1/search?q=${leer}&type=track`,{
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    })
    .then(Response =>{

      setCanciones({
        selectedcanciones:canciones.selectedcanciones,
        listaCanciones:Response.data.tracks.items
      })


    })
  }
/////////// fin buscador canciones ///////////



  return (
     <div>
    <Router>
    <header>
           <nav className="nav">

        <Link className="e" to="/Releases"><img className="img " src="./spotify.png" ></img></Link>
                 <div class="input"  >
                    <Link className="e" to="/Artistas"><input type="text" className="form-control bg-dark mt-2 text-white"
                     placeholder="Buscar Artista"
                     onChange={({target:{value}})=>setBuscar(value)}
                     onClick={hal}  value={buscar}
                     /></Link>

                 </div>
                 <div class="input">
                     <Link className="e" to="/Canciones"><input type="text" className="form-control bg-dark mt-2 text-white "
                     placeholder="Buscar Cancion" aria-label="Search"
                     onChange={({target:{value}})=>setleer(value)}
                     value={leer}  onClick={cancion}
                     /></Link>
                 </div>
             </nav>
             </header>
             <body>

             <Switch>
                  <Router path="/Releases">
                      {Releases()}
                  </Router>
                  <Router path="/Artistas">
                     {Artista()}
                  </Router>
                  <Router path="/Canciones">
                      <Canciones canciones={canciones.listaCanciones}/>
                  </Router>
             </Switch>
             </body>
  </Router>
       </div>
  );
}

export default App;
