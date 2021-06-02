import logo from './logo.svg';
import './App.css';
import React from 'react';
import fetchGraphQL from './services/fetchGraphQL';

const { useState, useEffect } = React;

function App(props) {
  const [name, setName] = useState(null);
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const AlbumsQuery =`
      query abc {
        albums{
          data{
            id
            title
          }
        }
      }
    `;

    fetchGraphQL(AlbumsQuery).then(response => {
      // Avoid updating state if the component unmounted before the fetch completes
      if (!isMounted) {
        return;
      }
      // const data = response.data;
      setAlbums(response.data.albums.data);
    }).catch(error => {
      console.error(error);
    });

    return () => {
      isMounted = false;
    };
  }, [fetchGraphQL]);
  return (
    <div className="App">
      <ul>
        {
        albums && albums.length && albums.map(e=>{
          return(
            <li>
              <span>{e.id}</span>.
              <span>{e.title}</span>
            </li>
          )
        })
        }
      </ul>
       
    </div>
  );
}

export default App;
