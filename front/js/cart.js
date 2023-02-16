// // Affichage des produits du panier
// Lien du panier
import { getData } from './tools.js';



async function display_cart(){
  // Récupération de tous les produits du panier (s'il y en a)
  let keys = Object.keys(localStorage);
  // Vérification du nombre de produits dans le panier
  let isCartEmpty=keys.length;
   // Si le panier est vide    
   if (isCartEmpty<=0)
   {
      alert("Votre panier est vide !");
   }
   else {
        const products  = [] ;
       // Récupérer les données du panier
       for(let key of keys) {  
        
          // Récupération de la clé courante     
          let text = localStorage.getItem(`${key}`);
          // Récupération des valeurs de la clé courante
          let CurrentProduct = JSON.parse(text);
          console.log(CurrentProduct.id);
          let prod = CurrentProduct[0];
          if (!CurrentProduct[0])
          {
            prod = CurrentProduct;
          }
          
        
        const product_prop = await getData ('http://localhost:3000/api/products/' + prod.id);

        products.push({
            id: prod.id,
            color: prod.color,
            qty: Number(prod.qty),
            name:product_prop.name,
            price:product_prop.price,
            imageUrl:product_prop.imageUrl,
            altTxt:product_prop.altTxt,
            key:key
        }) 
            }
            return products;
   }



}

const product= await display_cart();

display(product);

function display (products){
  
let total = 0;
let nb_products = 0;
products.forEach(product => {
    // Article
    nb_products += product.qty;
    total += product.price*product.qty;

    const article = document.createElement("article");
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

      // Créer un eventlistener change sur input et changer la quantité dans le localstorage
      input.addEventListener('change', () =>
      {
        // Quantité localstorage = quantité saisie
        product.qty=input.value;
        // modification de la valeur dans le localstorage
        localStorage.setItem(product.key, JSON.stringify(product));
        // Rafraichissement de la page
        location.reload();
      })

      // Div suppression d'article
      const cart__item__content__settings__delete = document.createElement("div");
      cart__item__content__settings__delete.className="cart__item__content__settings__delete";

    //  P suppression d'article
    const p_delete=document.createElement("p");
      p_delete.className= 'deleteItem';
      p_delete.innerHTML= "Supprimer";

// ajout de la fonction de suppression
p_delete.addEventListener('click', () =>
{
  localStorage.removeItem(product.key);
  location.reload();
})

      
    // Rattachement
    const items = document.querySelector("#cart__items") ;   
    items.appendChild(article);
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
   cart__item__content__settings__delete.appendChild(p_delete);
  
   
})

const totalQuantity = document.querySelector("#totalQuantity");
totalQuantity.innerHTML=nb_products;
const totalPrice = document.querySelector("#totalPrice");
totalPrice.innerHTML=total;

}