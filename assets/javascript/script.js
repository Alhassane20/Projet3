
fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then(data => {
        fetchCategories(data)
    })


async function fetchCategories(works) {
    fetch("http://localhost:5678/api/categories")
        .then((reponse) => reponse.json())
        .then(categories => {
            var filtres = document.getElementById("filtres");
            categories.forEach(cat => {
                filterFactory(cat);
                works.forEach(b => {
                    workFactory(b);
                });
            });

        });

}

function filterByCategory(categoryId) {
    // filtrer les les travaux par categories
    let figures = document.getElementsByClassName("figure-work");
    for (var i = 0; i < figures.length; ++i) {
        let figure = figures[i];
        let categoryWork = parseInt(figure.getAttribute("categoryId"));

        if (categoryId == categoryWork || categoryId == -1) {
            figure.style.display = "block";
        } else {
            figure.style.display = "none";
        }
    }
}

function filterFactory(category) {
    // creer les filtres dynamiquement
    div = document.createElement("div")
    div.setAttribute("class", "filtre")
    var p = document.createElement("p")
    p.append(category.name)
    div.appendChild(p)
    div.setAttribute("onclick", `filterByCategory(${category.id})`)
    filtres.appendChild(div)
}

function workFactory(work) {
    // créer les travaux dynamiquement
    var title = work.title;
    var url = work.imageUrl;

    var figure = document.createElement("figure");
    var img = document.createElement("img");
    var figcaption = document.createElement("figcaption");
    var gallery = document.getElementsByClassName("gallery")[0];
    img.setAttribute("src", work.imageUrl);
    img.setAttribute("crossorigin", "anonymous")
    figcaption.append(title);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
    figure.setAttribute("categoryId", work.categoryId);
    figure.setAttribute("class", "figure-work");

}

async function Connection() {
    // authentification
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;

    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "email": user,
            "password": password,
        })
        // Remplir le formulaire
        // Envoyer le formulaire
    }).then((response) => response.json())
        .then(data => {
            if (data.token == null) {
                let message = data.message
                document.body.append(message)
                // Si connexion échouée
                // Recois aucun token 
                // Recois un message d'erreur
            } else {
                // localStorage.setItem("token", data.token)
                window.location = "index.html?token=" + data.token;
                // Si connexion reussie
                // Recevoir le token
                // Stocker le token
                // Rediriger vers la page d'accueil
            }

        })
}



function getToken() {
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token')
    return token;
}

if (getToken() != null) {
    // Modifications pour page connecté
    let rectangle = document.getElementById("rectangle")
    rectangle.style.display = "flex"
    let boutonmodal = document.getElementById("boutonmodal")
    boutonmodal.style.display = "flex"
    let modifierworks = document.getElementById("modifierworks")
    modifierworks.style.display = "flex"
    // Ajouter "token" dans une variable
    //  Si localStorage contient token
    //  Affiche les boutons
}

function fermerModale() {
    let modaleContener = document.querySelector(".modalContener")
    modaleContener.style.display = "none";
}

function ouvrirModale() {
    let modaleContener = document.querySelector(".modalContener")
    modaleContener.style.display = "block"

    worksModale();
}

document.addEventListener("click", (e) => {
    if (e.target.id === "modaleContener") {
        fermerModale()
    }
})

function worksModale() {
    fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then(data => {
            for (let i = 0; i < data.length; ++i) {
                workModalFactory(data[i]);
            }
        })
}

function workModalFactory(work) {
    let images = document.getElementById("images")

    let imge = document.createElement("div")
    imge.setAttribute("class", "imge")

    let imgwork = document.createElement("img")
    imgwork.setAttribute("src", work.imageUrl)
    imgwork.setAttribute("crossorigin", "anonymous")

    let croix = document.createElement("i")
    croix.setAttribute("class", "fa-solid fa-arrows-up-down-left-right arrow")

    let poubelle = document.createElement("i")
    poubelle.setAttribute("class", "fa-sharp fa-solid fa-trash-can poubelle")
    poubelle.setAttribute("click", deleteOneWork(id))

    let editer = document.createElement("figcaption")
    editer.append("éditer")

    imge.appendChild(imgwork)
    imge.appendChild(croix)
    imge.appendChild(poubelle)
    imge.appendChild(editer)
    images.appendChild(imge)
}

function deleteWorks() {
    // fetch pour récup les works avec fetch
    // pour chaque works de ta liste
    // 
    fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then(data => {
            for (i = 0; i < data.length; i++) {
                let id = data[i].id
                deleteOneWork(id)
            }
        })

    window.location.reload()
}

function deleteOneWork(id) {
    let url = "http://localhost:5678/api/works/" + id;
    fetch(url, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    }).then((response) => response.json())
        .then((data) => {
        })
}

function changerModale() {
    let modale1 = document.getElementById("modale1")
    let modale2 = document.getElementById("modale2")
    modale1.style.display = "none"
    modale2.style.display = "block"
    categoriesModale()
}
function returnModal() {
    let modale1 = document.getElementById("modale1")
    let modale2 = document.getElementById("modale2")
    modale1.style.display = "block"
    modale2.style.display = "none"
}

function addWorks(e) {
    let image = document.getElementById("addPhotos").value
    let titre = document.getElementById("titre").value;
    let categorie = document.getElementById("categorie").value;
    let newForm = new FormData()
    newForm.append("image",image)
    newForm.append("title",titre)
    newForm.append("category",categorie)
    console.log(newForm);
    fetch("http://localhost:5678/api/works", {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${getToken()}`,
        },
        body: newForm,
    }).then((response) => response.json())
        .then(data => {
            console.log(data);
            let erreur = data.error
            if (image =! "file") {
        document.body.append(erreur)
    }
            if (titre =! "string") {
        document.body.append(erreur)
    }
            if (categorie =! "string") {
        document.body.append(erreur)
    }
})
}

function categoriesModale() {
    fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
        .then(data => {
            let categorie = document.getElementById("categorie")
            categorie.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                let option = document.createElement("option");
                option.setAttribute("value", data[i].id)
                option.append(data[i].name);
                categorie.appendChild(option)
            }

        })
}