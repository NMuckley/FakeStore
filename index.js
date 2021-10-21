
class Product {
  constructor(name, price, handler) {
    this.name = name
    this.price = price
    this.handler = handler
  }

  toHTML() {
    return `
    <div class="item">
      <p>${this.name}</p>
      <p class="price">$${this.price}</p>
      <button id="${this.nameToID()}">add to cart</button>
    </div>
    `
  }
    
  toCartHTML() {
    return `
    <div class="item">
      <p>${this.name}</p>
      <p class="price">$${this.price}</p>
    </div>
   `
  }
  
  nameToID() {
    return this.name.toLowerCase().replaceAll(" ", "-")
  }
  
  addClickHandlers() {
    const addButton = document.getElementById(this.nameToID())
    if (addButton) {
      addButton.addEventListener("click", () => this.handler(this.name, this.price) )
    }
  }
  
}


class Cart {
  constructor() {
    this.products = []
    this.removalArray = []
  }
  
  addProduct(product) {
    this.products.push(product)
    this.render()
    
    document.querySelector("#cartitems").addEventListener("click", () => alert("hahaha"))
  }

  render() {
    let productsHtml = this.products.map( product => product.toCartHTML())
    const productsContainer = document.querySelector("#cartitems")
    const productsHtmlString = productsHtml.join(" ")
    productsContainer.innerHTML = productsHtmlString
    
    const totalCostContainer = document.querySelector("#totalcost")
    totalCostContainer.innerHTML = `$${this.totalCost()}`
  }
  
  totalCost() {
    let productPrices = this.products.map( product => product.price)
    return productPrices.reduce((total, num) => { return total + num }, 0)
  }

  removeItemFromCart(item) {

  }

}




class Shop {
  constructor() {
    this.fetchProducts()
    this.cart = new Cart()
  }

  fetchProducts() {
    fetch("https://nate-shop.herokuapp.com/products", {
      method: "get",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then( response => response.json())
      .then( data => {
        this.products = data.map( product => new Product(product.name, product.price, this.addToCartHandler.bind(this)))
        this.render()
      })
  }

  render() {
    let productsHtml = this.products.map( product => product.toHTML())
    const productsContainer = document.querySelector("#products-list")
    const productsHtmlString = productsHtml.join(" ")
    productsContainer.innerHTML = productsHtmlString
    this.addProductHandlers()
  }
  
  addProductHandlers() {
    this.products.forEach( product => product.addClickHandlers() )
  }
  
  addToCartHandler(name, price) {
    this.cart.addProduct(new Product(name, price, () => {} ))
  }
  
}

const shop = new Shop()
