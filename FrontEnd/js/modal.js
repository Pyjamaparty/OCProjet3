var modal1 = document.getElementById("modal1")
var modal2 = document.getElementById("modal2")
var modalWrapper1 = document.getElementById("modalWrapper1")
var modalWrapper2 = document.getElementById("modalWrapper2")
var editButton = document.getElementById("editButton")
var addImgButton = document.getElementById("add-img")

editButton.onclick = function () {
    modal1.style.display = "block"

    document.addEventListener("click", function (event) {
        if (event.target.matches(".modal-close-button")) {
            closeModal()
        }
        if (event.target.matches(".back-arrow")) {
            backArrow()
        }
    },
        false
    )
}

// prevent the modal to close if we click on the modal wrapper
document.querySelectorAll(".modal").forEach(modal => {
    modal.addEventListener("click", function (e) {
        if (!(modalWrapper1.contains(e.target) ||
        modalWrapper2.contains(e.target))) {
            closeModal()
        }
    })
})

addImgButton.onclick = function () {
    modal1.style.display = "none"
    modal2.style.display = "block"
}

function backArrow() {
    modal1.style.display = "block"
    modal2.style.display = "none"
}

function closeModal() {
    modal1.style.display = "none"
    modal2.style.display = "none"
}

function deleteWork(id) {
    /* if user is logged in */
    if (localStorage.getItem("token") != null) {
        const url = 'http://localhost:5678/api/works/' + id
        fetch(url,
            {
                method: 'DELETE',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
            })
            .then(response => {
                if (response.status === 200 || response.status === 204) {
                    return response.json()
                } else {
                    console.log(response)
                    throw new Error('Http code isnt 200 or 204')
                }
            })
    } else {
        throw new Error('User must be authenticated!')
    }
}

var addFileInput = document.getElementById("addFile")
var previewImage = document.getElementById("preview-image")
var readImgDiv = document.getElementById("read-img-div")

addFileInput.onchange = (e) => {
    if (e.target.files[0]) {
        previewImage.src = URL.createObjectURL(e.target.files[0])
        readImgDiv.style.display = "none"
    }
}

const addImgForm = document.getElementById("add-img-form")
const validateAddImg = document.getElementById("validate-add-img")

addImgForm.addEventListener("input", (e) => {
    e.preventDefault()

    // check that all fields are filled
    if (addImgForm.addFile.value.length != 0 &&
        addImgForm.imgTitle.value.length != 0 &&
        addImgForm.categorySelect.value.length != 0) {
        validateAddImg.disabled = false
    } else {
        validateAddImg.disabled = true
    }
})

addImgForm.addEventListener("submit", (e) => {
    e.preventDefault()

    var inputFile = document.querySelector('input[type="file"]')
    
    createWork(inputFile.files[0],
        addImgForm.imgTitle.value,
        addImgForm.categorySelect.value)
})

// create work request
async function createWork(image, title, categoryId) {
    const formData = new FormData()
    formData.append("image", image)
    formData.append("title", title)
    formData.append("category", categoryId)

    await fetch('http://localhost:5678/api/works',
        {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: formData
        }).then(response => {
            if (response.status === 201) {
                return response.json()
            } else {
                throw new Error('Http code isnt 201')
            }
        }).then(data => {
            addWorkImage(data.imageUrl, data.title, data.categoryId, data.id)
        })
}