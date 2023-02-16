// Affichage des produits du site Kanap (image, nom, description,..)
// Lien du produit
import { getData } from './tools.js';
const products = await getData ('http://localhost:3000/api/products/');
display(products);

// Création de la répétition des produits)
function display(products)
{
products.forEach(product => {
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
   name.innerHTML= product.name;

   // Description du produit
   const description = document.createElement("p");
   description.className='productDescription';
   description.innerHTML= product.description;

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

/*
 Exemple avec 1 fiche produit: 

 // Lien du produit
const reponse = await fetch('http://localhost:3000/api/products/8906dfda133f4c20a9d0e34f18adcf06');
const products = await reponse.json();

const linkProduct = document.createElement("a");
  linkProduct.href='./product.html?id='+ products._id;

     // Article 
          const articleProduct = document.createElement("article");

   // Image du produit 
  const imgProduct = document.createElement("img");
  imgProduct.src= products.imageUrl;
  imgProduct.alt= products.altTxt;

   // Nom du produit 
const nameProduct = document.createElement("h3");
nameProduct.className='productName';
nameProduct.innerHTML= products.name;

   // Description du produit
const descriptionProduct = document.createElement("p");
descriptionProduct.className='productDescription';
descriptionProduct.innerHTML= products.description;

// Rattachement parent/enfants (DOM)
  const itemsProduct = document.querySelector(".items") ;
  itemsProduct.appendChild(linkProduct);
  linkProduct.appendChild(articleProduct);
  articleProduct.appendChild(imgProduct);
  articleProduct.appendChild(nameProduct);
  articleProduct.appendChild(descriptionProduct);

*/