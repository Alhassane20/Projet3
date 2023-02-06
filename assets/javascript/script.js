
fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        fetchCategories(data)
    })


async function fetchCategories(works) {
 fetch("http://localhost:5678/api/categories")
        .then((reponse) => reponse.json())
        .then(categories => {
            console.log(categories);
            var filtres = document.getElementById("filtres");
            categories.forEach(cat => {
                filterFactory(cat);
                works.forEach(b =>{
                    workFactory(b);
                });
            });

        });
        
}

function filterByCategory(categoryId) {
    let figures = document.getElementsByClassName("figure-work");
    for(var i = 0; i < figures.length; ++i) {
        let figure = figures[i];
        let categoryWork =  parseInt(figure.getAttribute("categoryId"));
        
        if(categoryId == categoryWork || categoryId == -1) {
            figure.style.display = "block";
        } else {
            figure.style.display = "none";
        }
    }
}

function filterFactory(category) {
    div = document.createElement("div")
    div.setAttribute("class", "filtre")
    var p = document.createElement("p")
    p.append(category.name)
    div.appendChild(p)
    div.setAttribute("onclick",`filterByCategory(${category.id})`)
    filtres.appendChild(div)
}

function workFactory(work) {
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
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;

    fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        "email": "string",
        "password": "string",
    })
    }).then((response) => response.json())
    .then(data =>
        console.log(data));
}
