// const jsdom = require("jsdom");

// import { orderBy } from "/module/lodash"

// const { JSDOM } = jsdom;
// const { window } = new JSDOM(``, { runScripts: "outside-only" });


const productCard = document.querySelector("[catalog-container]")

// var url = url = 'https://makeup-api.herokuapp.com/api/v1/products.json';

let url = 'data/products.json'
let products = []
let sortedProducts = []
let sortResult = []

/* ------------------------------------------------------------------ */
/*  Realiza o Fecht - asinc / await  */
/* ------------------------------------------------------------------ */

async function getProducts() {
  /* --------------------------------- */

    const response = await fetch(url, { method: 'GET', mode: 'no-cors' })
    if (!response.ok) {
      throw new Error(`HTTP error ! status: ${response.status}`)
    }

    products = await response.json(); // extract data as a JSON Object from response

  /*  Faz o tratamento dos campos Null & 
      Para o preço do produto deverá ser aplicado um fator de conversão de R$5,50 
         e exibido o seu preço com 2 casas decimais.*/
      // products.map((product, i) => {
      //       let products.rating[i] = (product.rating > 0 ? product.rating : 0)
      //           products.price[i] = (product.price == null ? 0 : (product.price * 5.5).toFixed(2))

      //           products.brand[i] = (product.brand == null ? "" : product.brand)
      //           products.product_type[i] = (product.product_type == null ? "" : product.product_type)
      // })

      /*  A página inicial deverá carregar todos os produtos 
          considerando a ordenação por Melhor Avaliados  */
        ordena('rating', 'desc')

     renderProducts(products) /*renderiza o product container inicial */
}

/* ------------------------------------------------------------------ */
/*  Renderiza o array de produtos - Product Card                      */
/* ------------------------------------------------------------------ */
async function renderProducts(products) {

    var html = '';

    await products.map((product) => (
      html += productItem(product) + loadDetails(product) + " </div>"
    ))
    mycatalog = document.getElementById("mycatalog")
    mycatalog.innerHTML = html
}
/* ------------------------------------------------------------------ */
/* Montagem do Card de produtos item a item a ser renderizado         */
/* 
   Para o preço do produto deverá ser aplicado um fator de conversão
   de R$5,50 e exibido o seu preço com 2 casas decimais
------------------------------------------------------------------ */
function productItem(product) {

  item =
    `<div id="div-product" class="product" data-name=${product.name} 
            data-brand=${product.brand} data-type=${product.product_type} tabindex="508">

          <figure class="product-figure">
              <img src="${product.image_link}" width="215" height="215" 
              alt=${product.name} onerror="javascript:this.src='img/unavailable.png'">
          </figure>

        <section class="product-description">
            <h1 class="product-name">${product.name} </h1>
            <div class="product-brands">
                <span class="product-brand background-brand">${product.brand}</span>
                <span class="product-brand background-price">R$ ${(product.price * 5.5).toFixed(2)}</span>
            </div>
        </section>
 `;

  return item

}
/* ------------------------------------------------------------------ */
function loadDetails(product) {
  
      /*Algumas informações dos produtos estão como null, protanto ...
      desconsiderar a exibição da informação nos detalhes dos produtos */
     console.log(`Antes preço = ${product.price}  Rating = ${product.rating}`)

     product.price = (product.price = null) ? 0 : product.price
     product.rating = (product.rating = null ) ? 0 : product.rating 

     console.log(`Depois preço = ${product.price}  Rating = ${product.rating}`)

     let showOrHidenDetails =  '"product-details"'

    if ((product.price = null)) {
         let showOrHidenDetails = '"hide"'}

    if ((product.price = 0)) {
      let showOrHidenDetails = '"hide"'
    }

  let details = 
  `<section class=${showOrHidenDetails}>
  
   <div class="details-row">
        <div>Brand</div>

        <div class="details-bar">

            <div class="details-bar-bg" style="width= 250">${product.brand} </div>
        </div>

    </div>

    <div class="details-row">
        <div>Price</div>
        <div class="details-bar">
             <div class="details-bar-bg" style="width= 250">R$ ${(product.price * 5.5).toFixed(2)}</div>
        </div>

    </div>
    
    <div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
             <div class="details-bar-bg" style="width= 250">${product.rating}</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">${product.category} </div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250"> ${product.product_type}</div>
        </div>
    </div>
  </section>`;

  return details
}
/* -------------------------------------------------------------------------- */
/*  Filtra e renderiza o container de acordo com a seleção do tipo de produto */ 
/* -------------------------------------------------------------------------- */
function selectType() {

  const selecter = document.getElementById('filter-type')
  var valueSelected = selecter.options[selecter.selectedIndex].value

  if (valueSelected == "todos") {
    renderProducts(products)
    return
  }
  // Filtra seleção 
  products.filter((product) => product.product_type == valueSelected);

  renderProducts(products)

}
/* ------------------------------------------------------------------------- */
/*  Implemntaççao do Search bar                                              */ 
/* ------------------------------------------------------------------------- */
function mySearch() {

  const searchbox = document.getElementById("filter-name").value.toLowerCase()
  const storeitems = document.getElementById("mycatalog")
  const myproducts = document.querySelectorAll('.product')

  // console.log('Horray! Someone wrote "' + searchbox + '"!');
  console.log(myproducts)

  myproducts.forEach((product, i) => {

    let productName = document.getElementsByTagName('h1')[i].textContent.toLowerCase()

    if (productName) {


      if (productName.indexOf(searchbox) > -1) {
        myproducts[i].style.display = ""
        console.log(productName)
      }
      else { myproducts[i].style.display = "none" }
    }
  })

}
/* ------------------------------------------------------------------ */
/* Seleciona critério de ordenação       */
/* ------------------------------------------------------------------ */
function ordena(coluna, ordem ) {
    ordem = ordem == 'asc' ? 'asc' : 'desc'
    sortResult = orderBy(products, coluna, ordem)
    products = sortResult
}
  /*------------------------------------------------------------------------- */
  /*  Ordena e renderiza o Card de Produtos segundo seleção */
  /*------------------------------------------------------------------------- */
  function productOrderBy() {
   
    const selecter = document.getElementById('sort-type')
    var ordem = selecter.options[selecter.selectedIndex].value
  
      switch (ordem) {
        case 'ascPrice':   /* Menores Preços */
              var coluna = 'price'
              var ordem = 'asc'
              break
        case 'descPrice':   /* Maiores Preços */
              var coluna = 'price'
              var ordem = 'asc'
              break
        case 'ascName':  /* A-Z */
              var coluna = 'name'
              var ordem = 'asc'
              break
        case 'descName': /* Z-A */
              var coluna = 'name'
              var ordem = 'desc'
              break
        default:    /*  descRating - Melhores avaliados */
              var coluna = 'rating'
              var ordem = 'desc'
              BreakingChangeType
      }
      console.log(` critério ordenação: + ${coluna}  ${ordem}`)
           ordena(coluna, ordem )
          
      // renderProducts(products)
  }
 /* ------------------------------------------------------------------ */ 
getProducts()
