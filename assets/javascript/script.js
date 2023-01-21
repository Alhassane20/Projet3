fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then (data =>{console.log(data);
        for (let i = 0; i < data.length; i++)
        {
            let work = data[i];
            let title = work.title;
            let url = work.imageUrl;

            console.log(title);
            url = url.replace("http://localhost:5678", "./assets");
            console.log(url);

            let figure = document.createElement("figure");
            let img = document.createElement("img");
            let figcaption = document.createElement("figcaption");
            let gallery = document.getElementsByClassName("gallery")[0];
            img.setAttribute("src", work.imageUrl);
            img.setAttribute("crossorigin","anonymous")
            figcaption.append(title);
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        }})

fetch("http://localhost:5678/api/categories")
