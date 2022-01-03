// Aleksi Viitanen

let API = "bd48b2b48c1b2e96b40249c9434bb1d8";

function songSearch() {

    document.querySelector("#getSongContent").textContent = "";
    let artist = document.querySelector("#songInI").value;
    let song = document.querySelector("#songInII").value;

    if(artist === "" || song === "") {
        document.querySelector("#getSongContent").textContent = "Error! Insert both an artist and a song. Using default values.";
        artist = "Carpenter Brut";
        song = "Turbo Killer";
    }


    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","https://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=" + artist + "&track=" + song + "&autocorrect=1&limit=10&api_key=" + API + "&format=json", true);

    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let div = document.createElement("div");
            for(i = 0; i <= 9; i++) {
            let answerObj = JSON.parse(xmlhttp.response);
            answerObj = answerObj.similartracks.track;
            let div2 = document.createElement("div");
            div2.textContent = answerObj[i].artist.name + " - " + answerObj[i].name;
            div.append(div2);
            document.querySelector("#getSongContent").append(div);
            }
        }
    }
}

function artistSearch() {
    
    document.querySelector("#artistInfoBox").textContent = "";
    let artist = document.querySelector("#artistIn").value;

    if(artist === "") {
        document.querySelector("#artistInfoBox").textContent = "Error! Insert both an artist and a song. Using default values.";
        artist = "Carpenter Brut";
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
                    div2.textContent = "Artist: " + answerObj[0].artist.name;
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



document.querySelector("#songBut").addEventListener("click", songSearch);
document.querySelector("#artistBut").addEventListener("click", artistSearch);
