import memeData from "../memeData";
import {useEffect, useState} from "react";

export const Meme = () => {
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImg: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    const getMemeImage = () => {
        const randomIndex = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomIndex].url
        setMeme(prevMeme => ({...prevMeme, randomImg: url}))
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setMeme(prevMeme => ({...prevMeme, [name]: value}))
    }

    return (
        <main>
            <div className="form">
                <input className="form-input" placeholder="Top text" type="text" name="topText" onChange={handleChange}
                       value={meme.topText}
                />
                <input className="form-input" placeholder="Bottom text" type="text" name="bottomText" onChange={handleChange}
                        value={meme.bottomText}
                />
                <button className="form-button" onClick={getMemeImage}>Get a new image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.randomImg} alt="meme image" className="meme-img"/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}