const getWorksRequest = new Request('http://localhost:5678/api/works', { method: 'GET' });
const getCategoriesRequest = new Request('http://localhost:5678/api/categories', { method: 'GET' });

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

fetch(getCategoriesRequest)
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Http code isnt 200');
        }
    })
    .then(data => {
        // for each element in data, add the work in the html
        for (let key in data) {
            addCategoryButton(data[key].id, data[key].name);
        }

        var buttons = document.getElementsByClassName("buttonfilter");
        for (const button of buttons) {
            if (button.id == "buttonAll") {
                document.getElementById("buttonAll").onclick = function () { filterWorks(0) };
            } else {
                button.onclick = function () { filterWorks(button.getAttribute("categoryId")) };
            }
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

function addCategoryButton(id, name) {
    const currentDiv = document.getElementById("filters");
    const newButton = document.createElement("button");
    const newCaptionText = document.createTextNode(name);
    newButton.setAttribute("categoryId", id);
    newButton.classList.add("buttonfilter");
    newButton.appendChild(newCaptionText);
    currentDiv.appendChild(newButton);
}

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

function onLoadClickButtonAll(){
    console.log("tesetet");
    document.getElementById("buttonAll").click();
}