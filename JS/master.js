let loading = document.getElementById("loading")
let closeModal = document.getElementById("closeModal")
let bodyData = document.getElementById("bodyData")
let rowDate = document.getElementById("rowDate")
async function getGames(category) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '22e88c02a3msh57413f170492de1p1ae5ccjsna90c3d66175f',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    rowDate.classList.remove("d-none")
    loading.classList.remove("d-none")
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options)
    const response = await api.json()
    allGames = response
    console.log(response);
    displayGames()
    loading.classList.add("d-none")
}
let allGames = [];
function displayGames() {
    let cartona = ""
    for (let i = 0; i < allGames.length; i++) {
        cartona +=
            `
            <div class="col-md-3 d-flex justify-content-center">
                <div class="card bg-dark h-100" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showDetails(${allGames[i].id})" style="width: 18rem;">
                    <img src="${allGames[i].thumbnail}" class="card-img" alt="">
                    <div class="card-body bg-dark p-2">
                        <div class="card-title d-flex justify-content-between">
                            <h5 class="title_card text-white">${allGames[i].title}</h5>
                            <h6 class="free text-white">Free</h6>
                        </div>
                        <p class="card-text h-100 opacity-50 text-center text-white">${allGames[i].short_description.split(" ", 15).join(" ")}</p>
                    </div>
                    <div class="list-group list-group-flush">
                    </div>
                    <div class="card-body d-flex bg-dark justify-content-between">
                        <p class="platform text-white">${allGames[i].genre}</p >
                        <p class="platform text-white">${allGames[i].platform}</p>
                    </div >
                </div >
            </div >
            `
    }
    document.getElementById("rowDate").innerHTML = cartona
}
async function showDetails(id) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '22e88c02a3msh57413f170492de1p1ae5ccjsna90c3d66175f',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    loading.classList.remove("d-none")
    bodyData.classList.remove("d-none")
    closeModal.classList.remove("d-none")
    let response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options)
    if (response.ok) {
        let data = await response.json()
        console.log(data);
        document.getElementById("bodyData").innerHTML =
            `
                <div class="col-md-3">
                    <h3 class="text-white">Details Game</h3>
                <img src="${data.thumbnail}" width="100%" alt="">
                    </div>
                        <div class="description_details pe-5 col-md-8">
                        <h4 class="text-white mt-5 pb-2">Title: ${data.title}</h4>
                        <h5 class="text-white pb-3">Category: <span class="text-dark rounded">${data.genre}</span></h5>
                        <h5 class="text-white pb-3">Platform: <span class="text-dark rounded">${data.platform}</span></h5>
                        <h5 class="text-white pb-3">Status: <span class="text-dark rounded">${data.status}</span></h5>
                        <p class="text-white details_description">${data.description}</p>
                        <button class="btn_details bg-dark">Show Game</button>
                    </div>
        `
        loading.classList.add("d-none")
    }
}
closeModal.addEventListener('click', () => {
    bodyData.classList.add("d-none")
    closeModal.classList.add("d-none")
    rowDate.classList.remove("d-none")
})
rowDate.addEventListener("click", () => {
    bodyData.classList.remove("d-none")
    rowDate.classList.add("d-none")
})
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        const category = e.target.getAttribute('data-category')
        getGames(category) 
    })
})
getGames('mmorpg')
