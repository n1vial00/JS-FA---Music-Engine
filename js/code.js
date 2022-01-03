
// Last.fm API: /2.0/?method=artist.getinfo&artist=Cher&api_key=bd48b2b48c1b2e96b40249c9434bb1d8 


function songSearch() {
    document.querySelector("#songIn").value;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=cher&api_key=bd48b2b48c1b2e96b40249c9434bb1d8&format=json", true);

    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let answerObj = JSON.parse(xmlhttp.response)
            let div = document.createElement("div");
            let img = document.createElement("img");
            img.setAttribute("src", answerObj.image);

            div.append(img)
            document.querySelector("#getSongContent").append(div);
        }
    }
}

function artistSearch() {
    
}








document.querySelector("#songBut").addEventListener("click", songSearch);
document.querySelector("#artistBut").addEventListener("click", artistSearch);
