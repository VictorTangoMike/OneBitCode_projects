const User = require("./src/User");
const Book = require("./src/Book");

// Login

const Victor = new User('Victor Silva', 'victor@example.com', '12345')

Victor.login('victor@example.com', '1234')

// Pós login

if (Victor.logged === true) {
    const CodigoDaVinci = new Book('Código da Vinci', 'Livro de ficção científica', 100);

    console.log(`O livro ${CodigoDaVinci.name} foi adicionado com sucesso!`);

    CodigoDaVinci.addToStock(10);

    console.log(`Estoque atual: ${CodigoDaVinci.inStock}`);

    console.log('Aplicando desconto de 25%');

    CodigoDaVinci.calculateDiscount(25);

    console.log(`O preço do livro será de R\$${CodigoDaVinci.price}`);
} else {
    console.log('Você não está logado.');
}
