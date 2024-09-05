class Book {
  constructor(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.inStock = 0;
  }

  addToStock(quantity) {
    this.inStock += quantity;
  }

  calculateDiscount(percent) {
    this.price -= this.price * (percent / 100);
  }
}

module.exports = Book;