

//EXEMPLO DO CÓDIGO PARA UM PRODUTO
var url = ''
var products = [{}]
url = 'http://makeup-api.herokuapp.com/api/v1/products.json';




function selectType() {

  const selecter = document.getElementById('filter-type')
  const valueSelected = selecter.options[selecter.selectedIndex].value


  const element = document.getElementById('div-product');
  element.remove(); 

  let productsx = products.filter((product) => product.product_type === valueSelected);

  var html = '';
   productsx.map((product) => (
    html += productItem(product)
  ))

  mycatalog = document.getElementById("mycatalog");

  mycatalog.innerHTML = html


}

function productItem(product) {

  var item = `<div id="div-product" class="product" data-name=${product.name} data-brand=${product.brand} data-type=${product.product_type} tabindex="508">
  <figure class="product-figure">
    <img src="${product.image_link}" width="215" height="215" alt="NYX Mosaic Powder Blush Paradise" onerror="javascript:this.src='img/unavailable.png'">
  </figure>
  <section class="product-description">
    <h1 class="product-name">${product.name} </h1>
    <div class="product-brands">
          <span class="product-brand background-brand">${product.brand}</span>
          <span class="product-brand background-price">R$ ${product.price * 4.5}  </span></div>
  </section>

  // CARREGAR OS DETALHES

  
  </div>`;
  return item

}

async function renderProducts(productsx) {


  let = products = productsx

  var html = '';
  await products.map((product) => (
    html += productItem(product)
  ))

  mycatalog = document.getElementById("mycatalog")

  mycatalog.innerHTML = html

}

async function getProducts() {



  fetch(url)
    .then(response => response.json())
    .then(productsx => (renderProducts(productsx)))
    .catch(erro => console.log(erro))

}

//EXEMPLO DO CÓDIGO PARA OS DETALHES DE UM PRODUTO
function loadDetails(product) {
  let details = `<section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">nyx</div>
        </div>
      </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">10.49</div>
        </div>
      </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">5</div>
        </div>
      </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250"></div>
        </div>
      </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
          <div class="details-bar-bg" style="width= 250">bronzer</div>
        </div>
      </div></section>`;
}


getProducts();
renderProducts(products);


