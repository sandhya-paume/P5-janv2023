// Affichage des produits du site Kanap (image, nom, description,..)
// Lien du produit
import { getData } from './tools.js';
const products = await getData ('http://localhost:3000/api/products/');
display(products);

// Création de la répétition des produits)
function display(products){
    products.forEach(product =>   
    {
  /*on peut aussi mettre: 
  for (let i = 0; i < products.length; i++){
    const product=products[i]; */
    const link = document.createElement("a");
    link.href='./product.html?id='+ product._id;

    // Article 
    const article= document.createElement("article");

    // Image du produit 
    const img = document.createElement("img");
    img.src= product.imageUrl;
    img.alt= product.altTxt;

    // Nom du produit 
    const name= document.createElement("h3");
    name.className='productName';
    name.innerText= product.name;

    // Description du produit
    const description = document.createElement("p");
    description.className='productDescription';
    description.innerText= product.description;

  // Rattachement parent/enfants (DOM)
  // Récupération de l'élément du DOM qui accueillera les fiches produits/canapés
    const items = document.querySelector(".items") ;
    items.appendChild(link);
    link.appendChild(article);
    article.appendChild(img);
    article.appendChild(name);
    article.appendChild(description);
    })
}

