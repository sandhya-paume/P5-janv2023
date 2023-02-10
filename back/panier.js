export function ajoutListenerPanier(){
    const addToCart = document.querySelector("#addToCart");
    addToCart.addEventListener("click", function (event){
    event.preventDefault();
// Création de la constante du panier
    const panier = {
        id: parseInt(id),
        quantity: event.target.querySelector("[name=itemQuantity]").value,
        color:  event.target.querySelector("[id=color]").value,
    };
// Création de la charge utile au format JSON
const chargeUtile = JSON.stringify(panier);
// Appel la fonction fetch avec toutes informations nécessaires

    });
}