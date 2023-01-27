import { TUser } from "./types"
import { TProduct } from "./types"
import { TPurchase } from "./types"
import { CATEGORY } from "./types"

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
    category: CATEGORY.BOOKS
},
{
    id: "L002",
    name: "As Crônicas de Nárnia",
    price: 85,
    category: CATEGORY.BOOKS
}]

export const purchases: TPurchase [] = [{
    userId: "u001",
    productId: "L002",
    quantity: 2,
    totalPrice: 2 * 85 
}]

export function createUser(id:string, email:string, password:string): void{
    const newUser: TUser = {
        id,
        email,
        password
    }
    users.push(newUser)
    console.log("Cadastro Realizado com Sucesso")
}

createUser("u005", "alex@email.com", "senhanova")

export function getAllUsers(): TUser [] {
    return users
}

console.log(getAllUsers);


export function createProduct (id: string, name: string, price: number, category: CATEGORY): void {
    const newProduct: TProduct = {
        id,
        name,
        price,
        category
    }
    products.push(newProduct)
    console.log("Produto criado com sucesso!");
    
}

createProduct("p005", "Iphone 14", 10000, CATEGORY.ELECTRONICS)

export function getAllProducts (): TProduct[] {
    return products
}

export function getProductById(idSearch:string | undefined) {
    return(products.filter((product) => 
    product.id === idSearch
     )
)}

console.log(getProductById("p005"));

export function queryProductsByName(q: string):void {
    const query = products.filter((product) => {
        product.name.toLowerCase().includes(q.toLowerCase())
    })
    console.log(query);

}

export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number): void {
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    console.table(newPurchase)
    purchases.push(newPurchase)
    console.log("Compra realizada com sucesso")
}

export function getAllPurchasesFromUserId(userIdToSearch: string): TPurchase[] | undefined {
    return(purchases.filter((purchase) => 
        purchase.userId === userIdToSearch
    ))
}
