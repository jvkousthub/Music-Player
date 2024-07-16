
async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text()
    console.log(response);
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    // let link=tds.getElementsByTagName("a")
    console.log(as);
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index]
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split('songs/')[1])
        }
    }
    return songs
}
async function fetchAndParseMetadata(url) {
    try {
        let response = await fetch(url);
        let blob = await response.blob();
        const metadata = await musicMetadata.parseBlob(blob);
        return metadata.common;
    } catch (error) {
        console.error('Error reading metadata:', error);
        return { artist: 'Unknown', title: 'Unknown' };
    }
}

(async function main() {
    let song = await getsongs()
    console.log(song)
    let ul = document.querySelector(".list").getElementsByTagName("ul")[0]
    for (const s of song) {
    //     let { artist, title } = await fetchAndParseMetadata(s);
    //     for (let i = 0; i < song.length; i++) {
    //         const e = song[i];
    //         song[i]=e.split('songs/')[1]
    //         // console.log(song[i])
    // }
    ul.innerHTML = ul.innerHTML + `<li><img class="invert" src="music.svg" alt="music">
                            <div class="info">
                                <div class="name">${s.replaceAll("%20", " ",)}</div>
                                <div class="artist">Unknown</div>
                            </div>
                            <img class="splay invert" src="play.svg" alt="play">
                        </li>`
}

}
) ()