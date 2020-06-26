let cart = {}; //moia corzina

$("document").ready(function () {
  loadGoods(); //se incarca datele de pe server
  checkCart(); //verificam starea corzinei
  showMiniCart(); //pentru a arata ceea ce avem in corzina
});

function loadGoods() {
  //incarcam produsele
  $.getJSON("goods.json", function (data) {
    let out = "";
    for (let key in data) {
      out += '<div class="wrap">';
      out += '<p class="nameProduct">' + data[key]["name"] + "</p>";
      out += '<img src="' + data[key]["image"] + '"' + " >";
      out += '<p class="price">Price:' + data[key]["cost"] + "</p>";
      out += '<button class="add-to-card" data-atr="' + key + '">Buy</button>';
      out += "</div>";
    }
    $("#goods").html(out);
    $("button.add-to-card").on("click", addToCart);
  });
}

function addToCart() {
  //add product to card
  //putem adauga in Cookie sau LocalStorage. Acum folosim ultimul
  let articul = $(this).attr("data-atr"); //elementul pe care facem click(this) ii citim data-art
  if (cart[articul] != undefined) {
    cart[articul]++;
  } else {
    cart[articul] = 1; //primim atributul elementului pe care am facut click si ii dam ca valoare 1
  }

  //localstorage primeste doar string
  localStorage.setItem("cart", JSON.stringify(cart));
  showMiniCart(); //pentru a arata daca am adaugat produse in cart
  //localstorage primeste primul arg este cart iar al doilea este cartul nostru pe care il facem in string
  //in console, in Aplication avem localstorage care inregistreaza datele
}

function checkCart() {
  //verific daca avem corzina in localstorage
  //cu getItem vedem daca cart e gol, daca are ceva
  if (localStorage.getItem("cart") != null) {
    cart = JSON.parse(localStorage.getItem("cart")); //scoatem ce avem in cart localstorage si transformam inapoi in js
  } //aceasta functie o vom indeplini dupa ce se va incarca pagina
}

function showMiniCart() {
  //scoatem pe pagina corzina
  let out = "";
  for (let w in cart) {
    out += w + "---" + cart[w] + "<br>";
  }

  out += '<br><a href="cart.html">My products</a>';
  $("#mini-cart").html(out);
}
