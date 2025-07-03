import Hero from "./Hero.jsx"
import Grid from "./Grid.jsx"

export default function Layout(){

    return (
        <>
        <header><h1>LoreQuest</h1></header>
        <main>
            <Hero/>
            <Grid />
        </main>
        <footer>
            <p>Created By <a href="https://vanshikacy.github.io/web-portfolio/" target="_blank">Vanshika Choudhary</a> 🐾<br></br>            
            ⭐ the repo on <a href="/" target="_blank">GitHub</a> :)
            </p>
        </footer>
        </>
    )
}