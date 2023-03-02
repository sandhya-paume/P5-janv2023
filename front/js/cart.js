// // Affichage des produits du panier
// Lien du panier
import { getData, isCartEmpty, sendData } from './tools.js';

// Récupération de tous les produits du panier (s'il y en a)
let keys = Object.keys(localStorage);
// Vérification du nombre de produits dans le panier
//let isCartEmpty=keys.length;
// Si le panier est vide 
if (isCartEmpty())
  {
    alert("Votre panier est vide !");
   }
else {
  const products= await buildCompleteList();
  display(products);
  listen (products);
   }

function display (products){
let total = 0;
let nb_products = 0;
products.forEach(product => {
    // Article
    nb_products += product.qty;
    total += product.price*product.qty;

    const div = document.createElement("div");
    div.innerHTML = `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
        <div class="cart__item__img">
          <img src="${product.imageUrl}" alt="${product.altText}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.name}</h2>
          <p>${product.color}</p>
          <p>${product.price}</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.qty}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>              </article>`;
      
    // Rattachement
    const items = document.querySelector("#cart__items") ;   
    items.appendChild(div);
})

const totalQuantity = document.querySelector("#totalQuantity");
totalQuantity.innerHTML=nb_products;
const totalPrice = document.querySelector("#totalPrice");
totalPrice.innerHTML=total;
}

function listen (products)
{
  products.forEach(product =>
  {
    const input = document.querySelector(`article[data-id="${product.id}"][data-color="${product.color}"] .itemQuantity`);
    // Créer un eventlistener change sur input et changer la quantité dans le localstorage
    input.addEventListener('change', () =>
    {
        // Quantité localstorage = quantité saisie
        product.qty=input.value;
        updatelocalstorage("qty",product);
        //console.log(product.qty+" "+product.key);
    })

    const deleteButton = document.querySelector(`article[data-id="${product.id}"][data-color="${product.color}"] .deleteItem`);

    // ajout de la fonction de suppression
    deleteButton.addEventListener('click', () =>
      {
        //localStorage.removeItem(product.key);
        updatelocalstorage("remove",product);
        location.reload();
      })

  })

    // Récupérer le bouton submit
    const submitBtn = document.getElementById("order");

    // Ajouter un événement de type "click" sur le bouton submit
    submitBtn.addEventListener("click", order);


}

function updatelocalstorage(action, prd)
{
 
  let products = [];
  products = JSON.parse(localStorage.getItem('products'));
  
  for(let product of products) {    
    // Récupération de la clé courante     
    let prod = product;
    
    // Vérifier si le produit et la couleur sont déjà dans le panier 
    if (prod.id == prd.id && prod.color == prd.color)
        {
        switch (action) {
          case "qty":
            prod.qty=Number(prd.qty);
            break;
          case "remove":
            products.splice(products.indexOf(prod),1);
            break;
        
          default:
            break;
        }
        localStorage.setItem('products', JSON.stringify(products));
      }

  }
}

async function buildCompleteList()
{
  let products  = [] ;
  products = JSON.parse(localStorage.getItem('products'));
  // Récupération des données du panier
  for(let product of products) {    
         
    const product_prop = await getData ('http://localhost:3000/api/products/' + product.id);
 
    product.name=product_prop.name;
    product.price=product_prop.price;
    product.imageUrl=product_prop.imageUrl;
    product.altTxt=product_prop.altTxt;
      }
    localStorage.setItem('products', JSON.stringify(products));
    return products;
}

async function order(event)
{
  // Empêcher l'envoi du formulaire par défaut
  event.preventDefault();

  // Récupération des valeurs des champs du formulaire
const firstName = document.getElementById("firstName").value;
const lastName = document.getElementById("lastName").value;
const address = document.getElementById("address").value;
const city = document.getElementById("city").value;
const email = document.getElementById("email").value;

// Création d'un objet contact à partir des valeurs récupérées
const contact = {
  firstName: firstName,
  lastName: lastName,
  address: address,
  city: city,
  email: email
};

// Définition des expressions régulières pour chaque champ
const nameRegex = /^[a-zA-Zéèêëôœîïûüàáâæç-\s]{2,}$/; // Accepte les lettres, tirets, espaces, et doit contenir au moins 2 caractères
const addressRegex = /^[a-zA-Z0-9éèêëôœîïûüàáâæç-\s]{2,}$/; // Accepte les lettres, chiffres, tirets, espaces, et doit contenir au moins 2 caractères
const cityRegex = /^[a-zA-Zéèêëôœîïûüàáâæç-\s]{2,}$/; // Accepte les lettres, tirets, espaces, et doit contenir au moins 2 caractères
const emailRegex = /^\S+@\S+\.\S+$/; // Vérifie que l'email est au format correct

// Vérification de chaque champ avec son expression régulière
if (!nameRegex.test(firstName)) {
  document.getElementById("firstNameErrorMsg").innerHTML = "Le prénom doit contenir au moins 2 lettres et ne peut contenir que des lettres, des espaces et des tirets.";
}

if (!nameRegex.test(lastName)) {
  document.getElementById("lastNameErrorMsg").innerHTML = "Le nom doit contenir au moins 2 lettres et ne peut contenir que des lettres, des espaces et des tirets.";
}

if (!addressRegex.test(address)) {
  document.getElementById("addressErrorMsg").innerHTML = "L'adresse doit contenir au moins 2 caractères et ne peut contenir que des lettres, des chiffres, des espaces et des tirets.";
}

if (!cityRegex.test(city)) {
  document.getElementById("cityErrorMsg").innerHTML = "La ville doit contenir au moins 2 lettres et ne peut contenir que des lettres, des espaces et des tirets.";
}

if (!emailRegex.test(email)) {
  document.getElementById("emailErrorMsg").innerHTML = "L'email n'est pas valide.";
}

if (nameRegex.test(firstName) && nameRegex.test(lastName) && addressRegex.test(address) && cityRegex.test(city) && emailRegex.test(email)){

  const products = JSON.parse(localStorage.getItem("products"));
  
// Transforme chaque produit stocké en objet JavaScript
const productObjects = products.map(product => product);

// console.log(productObjects);
// console.log (contact);
const order = {
  contact: contact, products: productObjects
};

const orderId= await sendData("http://localhost:3000/api/products/order/",order);
// console.log(orderId);
}



}