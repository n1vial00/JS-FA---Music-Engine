// Aleksi Viitanen

let API = "bd48b2b48c1b2e96b40249c9434bb1d8";

ARTIST_LIST = ["Carpenter Brut", "Cheshyre", "Turmion Kätilöt", "Eluveitie", "Eisbrecher", "The Crash"];
SONG_LIST = ["Turbo Killer", "Animal", "Hades", "Lvgvs", "1000 Flammen", "Lauren Caught My Eye"];

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function artistSearch() {
    
    document.querySelector("#artistInfoBox").textContent = "";
    let artist = document.querySelector("#artistIn").value;

    if(artist === "") {
        document.querySelector("#artistInfoBox").textContent = "Error! Insert both an artist and a song. Using default values.";
        artist = ARTIST_LIST[getRndInteger(0, ARTIST_LIST.length)];
    }

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + artist + "&autocorrect=1&limit=10&api_key=" + API + "&format=json", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let div = document.createElement("div");
            for(i = -1; i <= 9; i++) {
                let answerObj = JSON.parse(xmlhttp.response);
                answerObj = answerObj.toptracks.track;
                let div2 = document.createElement("div");
                if(i == -1) {
                    div2.textContent = 'Artist: "' + answerObj[0].artist.name + '"';
                    div2.classList.add("artistDiv")
                } else {
                    div2.textContent = answerObj[i].name;
                    
                }
                div.append(div2);
                document.querySelector("#artistInfoBox").append(div);
            }
        }
    } 
}

function songSearch() {

    document.querySelector("#getSongContent").textContent = "";
    let artist = document.querySelector("#songInI").value;
    let song = document.querySelector("#songInII").value;

    if(artist === "" || song === "") {
        document.querySelector("#getSongContent").textContent = "Error! Insert both an artist and a song. Using default values.";
        let rndNr = getRndInteger(0, ARTIST_LIST.length);
        artist = ARTIST_LIST[rndNr];
        song = SONG_LIST[rndNr];
    }

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=" + artist + "&track=" + song + "&autocorrect=1&limit=10&api_key=" + API + "&format=json", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let div = document.createElement("div");
            for(i = -1; i <= 9; i++) {
                let answerObj = JSON.parse(xmlhttp.response);
                let answerObjX = answerObj.similartracks.track;
                let div2 = document.createElement("div");
                if(i == -1) {
                    div2.textContent = 'Finding songs similar to "' + song + '" by "' + artist + '"';
                    div2.classList.add("artistDiv");
                } else {
                    div2.textContent = answerObjX[i].artist.name + " - " + answerObjX[i].name; 
                }
                console.log(answerObjX);
                div.append(div2);
                document.querySelector("#getSongContent").append(div);
            }
        }
    }
}

function toggle() {
    document.querySelector("#hid").classList.toggle("hiddenOnes")
}


document.querySelector("#artistBut").addEventListener("click", artistSearch);
document.querySelector("#songBut").addEventListener("click", songSearch);

