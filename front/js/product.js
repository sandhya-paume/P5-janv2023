import { getData } from './tools.js';

const id = getIdFromUrl();
const product = await getData ('http://localhost:3000/api/products/' + id);
display(product);
cart();




function cart()
{
document.getElementById('addToCart').addEventListener('click', () =>
{
    
    let qty = Number(document.querySelector('[name="itemQuantity"]').value);
    const color =  document.querySelector('[id="colors"]').value;

    if (qty < 1 || qty > 100)
    {
        alert('Merci de choisir une quantité comprise entre 1 et 100');
        return;
    }

    if (color.length === 0)
    {
        alert('Merci de selectionner une couleur');
        return;
    }

    // const isCartEmpty = !localStorage.getItem('products-1');

    // Récupération de tous les produits du panier (s'il y en a)
    let keys = Object.keys(localStorage);
    // Vérification du nombre de produits dans le panier
    let isCartEmpty=keys.length;
    // Initialisation du produit à ajouter
    const products = [];
        alert('Nombre de produits dans le panier : '+isCartEmpty);
    // Si le panier n'est pas vide    
    if (isCartEmpty>0)
    {
        // Création de la clé produit (products- nombre de produits dans le panier +1)
        let refProduit = 'products-'+Number(isCartEmpty+1);
        // Récupérer les données du panier
        for(let key of keys) {    
            // Récupération de la clé courante     
            let text = localStorage.getItem(`${key}`);
            // Récupération des valeurs de la clé courante
            let CurrentProduct = JSON.parse(text);
            let prod = CurrentProduct[0];
            if (!CurrentProduct[0])
            {
                prod = CurrentProduct;
            }
            // Vérifier si le produit et la couleur sont déjà dans le panier 
            if (prod.id == id && prod.color == color)
                {
                qty = Number(qty)+Number(prod.qty);
                refProduit = `${key}`;
                }
              }

            products.push({
            id: id,
            color: color,
            qty: qty
        })
        localStorage.setItem(refProduit, JSON.stringify(products));
    }
    else //quand le panier est vide
    {
        // alert("panier vide !");
        // 1er produit ajouté au panier
        products.push({
            id: id,
            color: color,
            qty: qty
        }) 
        localStorage.setItem('products-1', JSON.stringify(products));
    // Ajouter un autre produit
    // Récupérer les données du panier
    // Vérifier si le produit que je veux ajouter est déjà présent:
        // Si oui, il faut modifier la quantité du produit existant
        // Si non, ajouter le nouveau produit
    // Ajouter le nouveau produit
    // Enregistrer dans le panier
    }

})
}

function getIdFromUrl ()
{
    // Récupération de l'id du produit envoyé sur l'url de la page produit
    const queryString = window.location.search;
    // Parse l'URL
    const urlParams = new URLSearchParams(queryString);
    // Récupération de l'id du produit
    return urlParams.get('id')
}

function display(product)
{
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
}