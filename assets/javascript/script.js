fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then (data =>{console.log(data);
        for (var i = 0; i < data.length; i++)
        {
            var work = data[i];
            var title = work.title;
            var url = work.imageUrl;

            console.log(title);
            url = url.replace("http://localhost:5678", "./assets");
            console.log(url);

            var figure = document.createElement("figure");
            var img = document.createElement("img");
            var figcaption = document.createElement("figcaption");
            var gallery = document.getElementsByClassName("gallery")[0];
            img.setAttribute("src", work.imageUrl);
            img.setAttribute("crossorigin","anonymous")
            figcaption.append(title);
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);

            var categorie = work.categoryId
            console.log(categorie);
        }})

fetch("http://localhost:5678/api/categories")
.then((reponse) => reponse.json())
.then (categories => {console.log(categories)
    var filtres = document.getElementById("filtres")
    for (var i = 0; i < categories.length; i++){
        var category = categories[i]
        var div = document.createElement("div")
        div.setAttribute("class","filtre")
        var p = document.createElement("p")
        p.append(category.name)
        div.appendChild(p)
        filtres.appendChild(div)
        console.log(div);
        var id = category.id
        console.log(id);
        const categorie1 = new Set
        categorie1.add(id)
        const categorie2 = new Set
        categorie2.add(id)
        const categorie3 = new Set
        categorie3.add(id)

}})

    