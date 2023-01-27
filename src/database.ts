import { TUser } from "./types"
import { TProduct } from "./types"
import { TPurchase } from "./types"

export const users: TUser [] = [{
    id: "u001",
    email: "fulano@gmail.com",
    password: "123"
},

{
    id: "u002",
    email: "betania@gmail.com",
    password: "456"
}]

export const products: TProduct [] = [{
    id: "L001",
    name: "Senhor dos Anéis",
    price: 90,
    category: "book"
},
{
    id: "L002",
    name: "As Crônicas de Nárnia",
    price: 85,
    category: "book"
}]

export const purchases: TPurchase [] = [{
    userId: "u001",
    productId: "L002",
    quantity: 2,
    totalPrice: 2 * 85 
}]