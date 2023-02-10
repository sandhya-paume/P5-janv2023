// Récupération de l'id du produit envoyé sur l'url de la page produit
    const queryString = window.location.search;
// Parse l'URL
    const urlParams = new URLSearchParams(queryString);
// Récupération de l'id du produit
    const id = urlParams.get('id')

// Récupération des données du produit
// Lien du produit
    const reponse = await fetch('http://localhost:3000/api/products/' + id);
    const product = await reponse.json();
    console.log (product);

// Image du produit à ajouter sous class="item__img"
    const img = document.createElement("img");
    img.src= product.imageUrl;
    img.alt= product.altTxt;
    const item__img = document.querySelector(".item__img") ;
    item__img.appendChild(img);

// Nom du produit à modifier id="title"
// QuerySelector permet de récupérer le h1 contenant l'id "title"
    const title = document.querySelector("#title") ;
    title.innerHTML= product.name;

// Prix du produit à modifier id="price"
    const price = document.querySelector("#price") ;
    price.innerHTML= product.price;

// Description du produit à modifier  id="description"
    const description = document.querySelector("#description");
    description.innerHTML= product.description;

// Couleur du produit à parser et à ajouter name="color-select"
    const colors = document.querySelector("#colors");
// Création d'une boucle pour récupérer toutes les couleurs et les affecter à une option
for (let i = 1; i < product.colors.length; i++){
    var option = document.createElement('option');
    const color = product.colors[i];
    option.text = color;
    colors.add(option,i);
} 

// Intégration des données du produit à la page html

