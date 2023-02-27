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

    /* ce que j'ai fait, c'est correcte mais trop long, compliqué et prend trop de place dans le code
    article.className="cart__item";
    article.dataset.id= product._id;
    article.dataset.color=product.color;
    
    // Div image du produit
    const cart__item__img = document.createElement("div");
    cart__item__img.className="cart__item__img";

    // Div image du produit
    const img= document.createElement("img");
    img.src= product.imageUrl;
    img.alt= product.altTxt;

    // Div contenu du panier
    const cart__item__content=document.createElement("div");
    cart__item__content.className="cart__item__content";

    // Div description du contenu du panier
    const cart__item__content__description=document.createElement("div");
    cart__item__content__description.className="cart__item__content__description";

    // H2 nom du produit
    const h2=document.createElement("h2");
    h2.innerHTML= product.name;

    // P couleur du produit
    const p_color=document.createElement("p");
    p_color.innerHTML= product.color;

      // P prix du produit
      const p_price=document.createElement("p");
        p_price.innerHTML= product.price;

      // Div paramètre du panier
      const cart__item__content__settings = document.createElement("div");
      cart__item__content__settings.className="cart__item__content__settings";

      // Div quantité de produit dans le panier
      const cart__item__content__settings__quantity = document.createElement("div");
      cart__item__content__settings__quantity.className="cart__item__content__settings__quantity";

      // P quantité du produit dans le panier
      const p_qty=document.createElement("p");
      p_qty.innerHTML= "Qté : ";

      // Input type
      const input=document.createElement("input");
      input.type="number";
      input.className="itemQuantity";
      input.name="itemQuantity";
      input.min=1;
      input.max=10;
      input.value=product.qty;
     
      // Div suppression d'article
      const cart__item__content__settings__delete = document.createElement("div");
      cart__item__content__settings__delete.className="cart__item__content__settings__delete";

    //  P suppression d'article
    const p_delete=document.createElement("p");
      p_delete.className= 'deleteItem';
      p_delete.innerHTML= "Supprimer";


{*/

 

      
    // Rattachement
    const items = document.querySelector("#cart__items") ;   
    items.appendChild(div);

    /* ce que j'ai fait, c'est correcte mais trop long, compliqué et prend trop de place dans le code

    article.appendChild(cart__item__img);
    cart__item__img.appendChild(img);

    article.appendChild(cart__item__content);
    cart__item__content.appendChild(cart__item__content__description);
    cart__item__content__description.appendChild(h2);
    cart__item__content__description.appendChild(p_color);
    cart__item__content__description.appendChild(p_price);

   article.appendChild(cart__item__content__settings);
   cart__item__content__settings.appendChild(cart__item__content__settings__quantity);
   cart__item__content__settings__quantity.appendChild(p_qty);
   cart__item__content__settings__quantity.appendChild(input);

   cart__item__content__settings.appendChild(cart__item__content__settings__delete);
   cart__item__content__settings__delete.appendChild(p_delete); */  
   
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
  // Récupérer les données du panier
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

  // Récupérer les valeurs des champs du formulaire
const firstName = document.getElementById("firstName").value;
const lastName = document.getElementById("lastName").value;
const address = document.getElementById("address").value;
const city = document.getElementById("city").value;
const email = document.getElementById("email").value;

// Créer un objet contact à partir des valeurs récupérées
const contact = {
  firstName: firstName,
  lastName: lastName,
  address: address,
  city: city,
  email: email
};

// Définir les expressions régulières pour chaque champ
const nameRegex = /^[a-zA-Zéèêëôœîïûüàáâæç-\s]{2,}$/; // Accepte les lettres, tirets, espaces, et doit contenir au moins 2 caractères
const addressRegex = /^[a-zA-Z0-9éèêëôœîïûüàáâæç-\s]{2,}$/; // Accepte les lettres, chiffres, tirets, espaces, et doit contenir au moins 2 caractères
const cityRegex = /^[a-zA-Zéèêëôœîïûüàáâæç-\s]{2,}$/; // Accepte les lettres, tirets, espaces, et doit contenir au moins 2 caractères
const emailRegex = /^\S+@\S+\.\S+$/; // Vérifie que l'email est au format correct

// Vérifier chaque champ avec son expression régulière
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