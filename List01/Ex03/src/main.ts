import Client from "./client";
import Order from "./order";
import Product from "./product";

const client = new Client("João", "Rua 1");
const order = new Order(client);
const product1 = new Product("Produto 1", 10);
const product2 = new Product("Produto 2", 20);
const product3 = new Product("Produto 3", 30);
order.addProduct(product1);
order.addProduct(product2);
order.addProduct(product3);
order.addProduct(product1);
order.addProduct(product1);
order.addProduct(product1);
order.addProduct(product1);
order.addProduct(product1);
order.addProduct(product1);
order.finishOrder();
