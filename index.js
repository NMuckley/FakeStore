
class Product {
  constructor(name, price) {
    this.name = name
    this.price = price
  }

  toHTML() {
    return ` 
    <div class="item">
      <p>${this.name}</p>
      <p class="price">$${this.price}</p>
      <button>add to cart</button>
    </div>
    `
  }
}

class Shop {
  constructor() {
    this.fetchProducts()
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
        console.log("data: ", data)
        this.products = data.map( product => new Product(product.name, product.price))
        this.render()
      })
  }

  render() {
    let productsHtml = this.products.map( product => product.toHTML())
    const productsContainer = document.querySelector("#products-list")
    const productsHtmlString = productsHtml.join(" ")
    productsContainer.innerHTML = productsHtmlString
  }
}

const shop = new Shop()
