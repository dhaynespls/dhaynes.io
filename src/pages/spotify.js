import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import PrimaryLayout from "../components/PrimaryLayout"
import postStyles from "../css/Post.module.css"
import spotifyStyles from "../css/Spotify.module.css"

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner"

export default () => {
  const authEndpoint = "https://accounts.spotify.com/authorize"
  const clientId = "e8b1d58ead4044f39fc1bfacfebffba1" // Not a secret
  const redirectUri = "http://127.0.0.1:8000/spotify"
  const scopes = ["user-library-read"]

  // Get the hash of the url
  const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce(function(initial, item) {
      if (item) {
        var parts = item.split("=")
        initial[parts[0]] = decodeURIComponent(parts[1])
      }
      return initial
    }, {})
  window.location.hash = ""

  const [_token, setToken] = useState(hash.access_token)
  const [loaded, setLoaded] = useState(false)
  const [finished, setFinished] = useState(false)
  const [allAlbums, setAllAlbums] = useState([])

  // If there is no token, redirect to Spotify authorization
  if (!_token) {
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20"
    )}&response_type=token&show_dialog=true`
  }

  // Populate allAlbums with every track's album object in the library
  useEffect(() => {
    let handlePrepWork = async () => {
      let populateAllAlbums = async (offset = 0) => {
        let { items, next } = await fetch(
          `https://api.spotify.com/v1/me/tracks?offset=${offset}&limit=50`,
          {
            headers: {
              "Content-Type": "text/json",
              Authorization: `Bearer ${_token}`,
            },
          }
        ).then(res => res.json())

        // Insert into state
        for (const { track } of items) {
          setAllAlbums(oldArray => [...oldArray, track.album])
        }

        if (next) {
          await populateAllAlbums(offset + 50)
        }
        setLoaded(true)
      }
      populateAllAlbums()
    }
    handlePrepWork()
  }, [])

  // Deduplicate based on albums
  useEffect(() => {
    if (loaded) {
      const uniqueArray = allAlbums.filter((album, index) => {
        const _album = JSON.stringify(album)
        return (
          index ===
          allAlbums.findIndex(obj => {
            return JSON.stringify(obj) === _album
          })
        )
      })
      setAllAlbums(uniqueArray)
      setFinished(true)
    }
  }, [loaded])

  return (
    <PrimaryLayout>
      <Link className={postStyles.home} to="/">
        <span role="img" aria-label="home" style={{ paddingRight: ".3em" }}>
          ⬅️
        </span>
        Home
      </Link>

      <h1>A better Spotify library album listing</h1>
      <h2>
        Or, taking the naive approach and looping through all tracks,
        deduplicating, and listing their associated album.
      </h2>
      <hr />
      {!finished ? (
        <p>
          I'm not the best at optimizing React performance, I'm certain your
          browser may crash on fetching data for about half a minute, just sit
          it out {"<3"}
          <Loader
            style={{ textAlign: "center" }}
            type="TailSpin"
            color="#00BFFF"
            height={100}
            width={100}
          />
        </p>
      ) : (
        <div>
          {allAlbums.map(album => {
            return <div key={album.id}>{album.name}</div>
          })}
        </div>
      )}
    </PrimaryLayout>
  )
}
