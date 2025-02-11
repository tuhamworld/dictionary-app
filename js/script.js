const result = document.getElementById('result');
const sound = document.getElementById('sound');
const btn = document.getElementById('search-btn');
let searchInput = document.getElementById('inp-word');


function handleWordSearch() {
    
    let inpWord = document.getElementById('inp-word').value;

    // Fetching API
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>

                 <button onclick="playSound()">
                    <i class="fa-solid fa-volume-high"></i>
                </button>

            </div>

            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
        </div>

                <p class="word-meaning">
                    ${data[0].meanings[0].definitions[0].definition} 
                </p>
                <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
                </p>

          `;
            sound.setAttribute('src', data[0].phonetics[0].audio);
        })

        //         Change sound.setAttribute(“src”, `https:${data[0].phonetics[0].audio}`);
        // to: sound.setAttribute(“src”, data[0].phonetics[0].audio);

        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't Find the Word</h3>`
        })
    
}

btn.addEventListener('click', handleWordSearch);
searchInput.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        btn.click();
    }
})

// Play sound
function playSound() {
    sound.play();
}
