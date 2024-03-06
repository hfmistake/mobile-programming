import Product from "./product";
import Client from "./client";

class Order {
  products: Product[] = [];
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  get total(): number {
    let total = 0;
    this.products.forEach((product) => {
      total += product.price;
    });
    return total;
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  finishOrder(): void {
    console.log("Produtos comprados:");
    let singleProducts = new Set(this.products);
    singleProducts.forEach((product) => {
      let quantity = this.products.filter(
        (p) => p.name === product.name,
      ).length;
      console.log(
        `${product.name} - Quantidade: ${quantity} - Valor Unitário: ${product.price}R$ - Valor Total: ${quantity * product.price}R$`,
      );
    });
    console.log(`Total da compra: ${this.total}R$`);
    console.log(`Cliente: ${this.client.name}`);
    console.log(`Endereço de entrega: ${this.client.address}`);
    console.log("Pedido finalizado!");
  }
}

export default Order;
