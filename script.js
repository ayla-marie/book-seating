const container = document.querySelector(".container");
//querySelectorAll selects all classes with spot in the name and stores them in a node
const spots = document.querySelectorAll(".row .spot:not(.reserved)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

//the plus sign turns price from string to int value
let ticketPrice = +movieSelect.value;

//save selected movie info
function setMovieData(movieIndex, MoviePrice) {
    localStorage.setitem("SelectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", MoviePrice)
}

//functions
function updateSelectedCount() {
    const selectedSpots = document.querySelectorAll(".row .spot.selected")

    //[...selectedSpots]takes the node list from selectedSpots and builds an array
    //map loops through a function like forEach but also returns the array
    const spotsIndex = [...selectedSpots].map(spot => {
        return [...spots].indexOf(spot)
    })

    //JSON.stringify turns the array into string form
    localStorage.setItem("selectedSpots", JSON.stringify(spotsIndex));

    //console.log(selectedSpotsCount); to check count is accurately displaying
    const selectedSpotsCount = selectedSpots.length;

    count.innerText = selectedSpotsCount;
    total.innerText = selectedSpotsCount * ticketPrice;
}

//save selected movie and price to local storage
function setMovieData(movieIndex, MoviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", MoviePrice);
}

function populateUI() {
    //JSON.parse turns string back to an array
    const selectedSpots = JSON.parse(localStorage.getItem("selectedSpots"));
    if (selectedSpots !== null && selectedSpots.length > 0) {
        spots.forEach((spot, index) => {
            if (selectedSpots.indexOf(index) > -1) {
                spot.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//event listeners
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});


container.addEventListener('click', (e) => {
    if (e.target.classList.contains("spot") && !e.target.classList.contains("reserved")) {
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
});

//initial count and total set
updateSelectedCount();