var cart = {}; //corzina. o variabila globala

$.getJSON("goods.json", function (data) {
  let goods = data; //pastram intro variabila toate produsele
  checkCart(); //verificam ce produse avem alese
  showCart(); //scoatem produsele alese in pagina

  function showCart() {
    //aceasta f vizualizeaza corzina
    //special se scrie aceasta functie in interiorul altei functii pentru a nu pierde this


    if ($.isEmptyObject(cart)) {//daca  corzina e goala
 let out = `You do not have products. Go to home page <a href="index.html">Home</a>`;
 $("#my-cart").html(out);

    } else {
      let out = "";

      for (let key in cart) {
        let pr = parseFloat(goods[key].cost);

        out += `
      <div class="cart-wrapp">
      <button class="delete" data-atr="${key}">x</button>
      <img class="productCart" src="${goods[key].image}" alt="">
      <div class="nameProductCart" >${goods[key].name}</div>
      <button class="minus" data-atr="${key}">-</button>
      ${cart[key]}
      <button class="plus" data-atr="${key}">+</button>
      <div class="priceProductCart">${cart[key] * pr}</div>
     </div>  
      `;
      }
      $("#my-cart").html(out);
      $(".plus").on("click", plusGoods); //functia care creste nr de produse in corzina
      $(".minus").on("click", minusGoods); //functia care scade nr de produse in corzina
      $(".delete").on("click", deleteGoods); //functia care sterge produsul din corzina
    }
  }
  function minusGoods() {
    //special se scrie aceasta functie in interiorul altei functii pentru a nu pierde this
    let articul = $(this).attr("data-atr");
    if (cart[articul] > 1) {
      cart[articul]--;
    } //daca avem mai mult de un produs putem sa micsoram cantitatea
    else {
      delete cart[articul]; //altfel stergem
    }
    saveCartToLS();
    showCart();
  }
  function plusGoods() {
    //special se scrie aceasta functie in interiorul altei functii pentru a nu pierde this
    let articul = $(this).attr("data-atr");
    cart[articul]++;
    saveCartToLS();
    showCart();
  }

  function deleteGoods() {
    let articul = $(this).attr("data-atr"); //elementul pe care clickam
    delete cart[articul]; //stergem
    saveCartToLS(); //update la corzina
    showCart(); //aratam corzina
  }
});

function checkCart() {
  //avem nevoie sa verificam daca avem ceva in corzina
  if (localStorage.getItem("cart") != null) {
    cart = JSON.parse(localStorage.getItem("cart")); //scoatem ce avem in cart localstorage si transformam inapoi in js
  }
}

//avem nevoie de o functie care va urmari si reincarca localstorage de fiecare data cind facem vrio modificare
//o vom adauga la plusGoods si minusGoods
function saveCartToLS() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
