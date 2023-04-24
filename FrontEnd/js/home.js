const getWorksRequest = new Request('http://localhost:5678/api/works', { method: 'GET' })
const getCategoriesRequest = new Request('http://localhost:5678/api/categories', { method: 'GET' })

fetch(getWorksRequest)
    .then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error('Http code isnt 200')
        }
    })
    .then(data => {
        // for each element in data, add the work in the html
        for (let key in data) {
            addWorkImage(data[key].imageUrl, data[key].title, data[key].category.id, data[key].id)
        }
    })

fetch(getCategoriesRequest)
    .then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error('Http code isnt 200')
        }
    })
    .then(data => {
        // for each element in data, add the work in the html
        for (let key in data) {
            addCategoryButton(data[key].id, data[key].name)
            const opt = document.createElement("option")
            opt.value = data[key].id
            opt.text = data[key].name
            document.getElementById("categorySelect").add(opt)
        }

        var buttons = document.getElementsByClassName("buttonfilter")
        for (const button of buttons) {
            button.onclick = function () {
                filterWorks(button.getAttribute("categoryId"))
                changeActiveButton(button, buttons)
            }
        }
    })

function changeActiveButton(target, buttons) {
    // remove the activebutton property from all buttons except the target, then add the property to the target
    for (const button of buttons) {
        if (button != target) {
            button.classList.remove("activebutton")
        } else {
            target.classList.add("activebutton")
        }
    }
}


function addWorkImage(src, alt, categoryId, workId) {
    /* add image in gallery */
    const currentDiv = document.getElementById("works")

    const newFigure = document.createElement("figure")
    const newImg = document.createElement("img")
    newImg.src = src
    newImg.alt = alt
    const newFigCaption = document.createElement("figcaption")
    const newCaptionText = document.createTextNode(alt)
    newFigure.setAttribute("categoryId", categoryId)
    newFigure.setAttribute("workId", workId)
    newFigCaption.appendChild(newCaptionText)
    newFigure.appendChild(newImg)
    newFigure.appendChild(newFigCaption)
    currentDiv.appendChild(newFigure)

    /* add image in modal */
    const modalGalleryDiv = document.getElementById("modal1-gallery")

    const newModalFigure = document.createElement("figure")
    const newModalImg = document.createElement("img")
    newModalImg.src = src
    newModalImg.alt = alt
    const newModalFigCaption = document.createElement("figcaption")
    const newModalCaptionText = document.createTextNode("éditer")
    const newModalDeleteBIcon = document.createElement("i")
    newModalDeleteBIcon.classList.add("fa-regular", "fa-trash-can")
    newModalFigure.style.position = "relative"
    newModalFigure.setAttribute("workId", workId)
    newModalDeleteBIcon.setAttribute("workId", workId)

    /* add event listener for the trashcan button */
    newModalDeleteBIcon.addEventListener("click", function (event) {
        event.preventDefault()
        event.stopImmediatePropagation()

        if (event.target.matches(".fa-trash-can")) { /* if the button we clicked is a trash can*/
            /* check which figure has the same workId and delete the html component */
            var worksFigures = document.getElementById('works')
            for (const child of worksFigures.children) {
                if (workId == child.getAttribute("workId")) {
                    child.remove()
                }
            }

            /* same thing with modal figure */
            var modalFigures = document.getElementById('modal1-gallery')
            for (const child of modalFigures.children) {
                if (workId == child.getAttribute("workId")) {
                    child.remove()
                }
            }

            deleteWork(workId)
        }
    })

    newModalFigCaption.appendChild(newModalCaptionText)
    newModalFigure.appendChild(newModalImg)
    newModalFigure.appendChild(newModalFigCaption)
    newModalFigure.appendChild(newModalDeleteBIcon)
    modalGalleryDiv.appendChild(newModalFigure)
}

function addCategoryButton(id, name) {
    const currentDiv = document.getElementById("filters")
    const newButton = document.createElement("button")
    const newCaptionText = document.createTextNode(name)
    newButton.setAttribute("categoryId", id)
    newButton.classList.add("buttonfilter")
    newButton.appendChild(newCaptionText)
    currentDiv.appendChild(newButton)
}

function filterWorks(categoryId) {
    var worksFigure = document.getElementById('works')
    for (const child of worksFigure.children) {
        // display all works corresponding to the categoryId OR display everything if the "All" button was clicked
        if (categoryId == child.getAttribute("categoryId") || categoryId == 0) {
            child.style.display = "block"
        } // hide all works not corresponding to the categoryId
        else {
            child.style.display = "none"
        }
    }
}

function onLoadClickButtonAll() {
    document.getElementById("buttonAll").click()
}

/* after page is loaded, check if a user token exists and display the correct elements */
document.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem("token") != null) {
        document.getElementById("login-id").style.display = "none"
        const elementsToShow = document.getElementsByClassName("show-if-logged")
        for (const element of elementsToShow) {
            element.style.display = "block"
        }
    }
}, false)

/* when logging out, some elements shouldn't be displayed anymore */
const logoutButton = document.getElementById("logout-id")
logoutButton.addEventListener('click', function () {
    localStorage.removeItem("token")
    const elementsToShow = document.getElementsByClassName("show-if-logged")
    for (const element of elementsToShow) {
        element.style.display = "none"
    }
    location.reload()
}, false)