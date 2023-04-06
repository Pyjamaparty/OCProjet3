const getWorksRequest = new Request('http://localhost:5678/api/works', { method: 'GET' });

fetch(getWorksRequest)
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Http code isnt 200');
        }
    })
    .then(data => {
        console.log(data);
        // for each element in data, add the work in the html
        for (let key in data) {
            addWork(data[key].imageUrl, data[key].title, data[key].category.id);
        }
    });

function addWork(src, alt, categoryId) {
    const currentDiv = document.getElementById("works");

    const newFigure = document.createElement("figure");
    const newImg = document.createElement("img");
    newImg.src = src;
    newImg.alt = alt;
    const newFigCaption = document.createElement("figcaption");
    const newCaptionText = document.createTextNode(alt);
    newFigure.setAttribute("categoryId", categoryId);
    newFigCaption.appendChild(newCaptionText);
    newFigure.appendChild(newImg);
    newFigure.appendChild(newFigCaption);
    currentDiv.appendChild(newFigure);
}

document.getElementById("buttonAll").click();
document.getElementById("buttonAll").onclick = function () { filterWorks(0) };
document.getElementById("buttonObjects").onclick = function () { filterWorks(1) };
document.getElementById("buttonApartments").onclick = function () { filterWorks(2) };
document.getElementById("buttonHotels").onclick = function () { filterWorks(3) };


function filterWorks(categoryId) {
    var worksFigure = document.getElementById('works');
    for (const child of worksFigure.children) {
        // display all works corresponding to the categoryId OR display everything if the "All" button was clicked
        if (categoryId == child.getAttribute("categoryId") || categoryId == 0) {
            child.style.display = "block";
        } // hide all works not corresponding to the categoryId
        else {
            child.style.display = "none";
        }
    }
}