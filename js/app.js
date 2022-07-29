const productCardTemplate = document.querySelector("[data-product-template]")

//EXEMPLO DO CÓDIGO PARA UM PRODUTO

// var url = url = 'https://makeup-api.herokuapp.com/api/v1/products.json';

let url = 'data/products.json'
let products = []


function productItem(product) {
  

  const productCard = productCardTemplate.content.cloneNode(true).children[0]
  const header = Productcard.querySelector("[data-name]")
  const header = Productcard.querySelector("[data-name]")
  const header = Productcard.querySelector("[data-name]")
  const header = Productcard.querySelector("[data-name]")
  const header = Productcard.querySelector("[data-name]")

  // var item = `<div id="div-product" class="product" data-name=${product.name} data-brand=${product.brand} data-type=${product.product_type} tabindex="508">
  // <figure class="product-figure">
  //   <img src="${product.image_link}" width="215" height="215" alt="NYX Mosaic Powder Blush Paradise" onerror="javascript:this.src='img/unavailable.png'">
  // </figure>
  // <section class="product-description">
  //   <h1 class="product-name">${product.name} </h1>
  //   <div class="product-brands">
  //         <span class="product-brand background-brand">${product.brand}</span>
  //         <span class="product-brand background-price">R$ ${(product.price * 5.5).toFixed(2)}</span></div>
  // </section>

  // // CARREGAR OS DETALHES

  
  // </div>`;
  // return item

}

async function renderProducts(products) {

  var html = '';
  await products.map((product) => (

        // html += ( product.price > 0 ? productItem(product) : "")

       html  += productItem(product)
  ))

  mycatalog = document.getElementById("mycatalog")

  mycatalog.innerHTML = html

}

async function getProducts()  {

const response =  await fetch(url, {method: 'GET', mode: 'no-cors'})

      if (!response.ok){
          throw new Error (`HTTP error ! status: ${response.status}`)
      }
    
    products = await response.json(); // extract data as a JSON Object from response
  
    renderProducts(products)

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


function selectType() {


  const selecter = document.getElementById('filter-type')
  var valueSelected = selecter.options[selecter.selectedIndex].value

  if (valueSelected == "todos" )  {
      renderProducts(products)
      return   
  } 
     // Filtra seleção 
      myrowset = products.filter((product) => product.product_type == valueSelected);

      renderProducts(myrowset)

}


function mySearch() {

  const searchbox = document.getElementById("filter-name").value.toLowerCase()
  const storeitems = document.getElementById("mycatalog")
  const myproducts = document.querySelectorAll('.product')

  console.log('Horray! Someone wrote "' + searchbox + '"!');

    myproducts.forEach((product, i) => {

      let productName = document.getElementsByTagName('h1')[i].textContent.toLowerCase()

      if(productName) {

              if(productName.indexOf(searchbox) > -1 ) 
                 {myproducts[i].style.display = "" 
                  console.log(productName)}
              else { myproducts[i].style.display = "none"}
        }
    })

  }
  

getProducts()