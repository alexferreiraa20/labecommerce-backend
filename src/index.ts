// console.log("hello");
import express, { Request, Response} from 'express';
import { users, products, purchases } from './database'
import cors from 'cors';
import { TProduct, CATEGORY, TUser, TPurchase } from "./types"
import { createUser, getAllUsers, createProduct, getAllProducts, getProductById, createPurchase, getAllPurchasesFromUserId } from "./database"
import { resourceLimits } from 'worker_threads';

console.log(users);
console.log(products);
console.log(purchases);


const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
});

app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
    
});

app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(products)
    } catch (error: any) {
        console.log(error)
        res.status(400).send(error.message)
    }
});

app.get('/products/search', (req: Request, res: Response) => {
   try {
        const q = req.query.q as string

        const result: TProduct[] = products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase())
            
        })
        if(result.length<1){
            res.status(400)
            throw new Error ("O nome deve possuir ao menos 1 caractere")
        }
        res.status(200).send(result)
   } catch (error: any) {
        console.log(error)

            if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
   }
    
})

app.post('/users', (req: Request, res: Response) =>{
    try {
        const {id, email, password} = req.body as TUser

        if(typeof id !== "string"){
            res.status(400)
            throw new Error ("o id deve ser uma string")
        }

        if(typeof email !== "string"){
            res.status(400)
            throw new Error ("o email deve ser uma string")
        }

        if(typeof password !== "string"){
            res.status(400)
            throw new Error ("o password deve ser uma string")
        }

        const idUser = users.find((user)=> user.id === id)

        if(idUser){
            res.status(409)
            throw new Error ("O 'id' informado já está cadastrado")
        }
        const userEmail = users.find((user)=> user.email === email)

        if(userEmail){
            res.status(409)
            throw new Error ("O 'email' informado já está cadastrado")
        }

        const newUser = {
            id,
            email,
            password
        }
        users.push(newUser)

    res.status(201).send("Cadastro realizado com sucesso")

    } catch (error:any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
    
})

app.post('/products', (req: Request, res: Response) =>{
    try {
        const {id, name, price, category} = req.body as TProduct

        if(!id){
            res.status(404)
            throw new Error ("o 'id' deve ser informado")
        }

        if(typeof id !== "string"){
            res.status(400)
            throw new Error ("O 'id' deve ser uma string")
        }

        if(!name){
            res.status(404)
            throw new Error ("O nome (name) deve ser informado")
        }

        if(typeof name !== "string"){
            res.status(400)
            throw new Error ("O 'name' deve ser uma string")
        }

        if(!price){
            res.status(404)
            throw new Error ("O preço (price) deve ser informado")
        }

        if(typeof price !== "number"){
            res.status(400)
            throw new Error ("O preço (price) deve ser um number (número)")
        }

        if(!category){
            res.status(404)
            throw new Error ("a categoria (category) deve ser informado")
        }

        if(typeof category !== "string"){
            res.status(400)
            throw new Error ("a categoria (category) deve ser uma string")
        }

        const idProduct = products.find((product)=> product.id === id)

        if(idProduct) {
            res.status(409)
            throw new Error ("o 'id' informado já está cadastrado")
        }

        const newProduct = {
            id,
            name,
            price,
            category
        }
    
        products.push(newProduct)
    
        res.status(201).send("Produto cadastrado com sucesso")
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
})

app.post('/purchases', (req: Request, res: Response) =>{
    try {
        const {userId, productId, quantity, totalPrice} = req.body as TPurchase

        if(!userId){
            res.status(404)
            throw new Error ("O campo 'userId' deve ser informado")
        }

        if(typeof userId !== "string"){
            res.status (400)
            throw new Error ("o 'userId' deve ser uma string")
        }

        if(!productId){
            res.status(404)
            throw new Error ("O campo 'productId' deve ser informado")
        }

        if(typeof productId !== "string"){
            res.status (400)
            throw new Error ("o 'productId' deve ser uma string")
        }    
        
        if(!quantity){
            res.status(404)
            throw new Error ("O campo 'quantity' deve ser informado")
        }

        if(typeof quantity !== "number"){
            res.status (400)
            throw new Error ("o 'quantity' deve ser um number")
        }  

        if(!totalPrice){
            res.status(404)
            throw new Error ("O campo 'totalPrice' deve ser informado")
        }

        if(typeof totalPrice !== "number"){
            res.status (400)
            throw new Error ("o 'totalPrice' deve ser um number")
        } 

        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
    }

    purchases.push(newPurchase)

    res.status(201).send("Compra realizada com sucesso")
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
    
})

app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const result: TProduct[] = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(result)
})

app.get('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        const result = products.find((product) => {
            return product.id === id
    })

    if(!result){
        throw new Error ("O produto não existe. Tente novamente.")
    }
    res.status(200).send(result)
    console.log("objeto product encontrado")

    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
    
})

app.get('/users/:id/purchases', (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        const result = purchases.filter((purchase) => {
            return purchase.userId === id
    })
    if(!result){
        throw new Error ("A compra não existe. Tente novamente")
    }
    res.status(200).send(result)
    console.log("array de compras do user procurado")

    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
    
})

app.delete('/users/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        const userIndex = users.findIndex((user) => {
            return user.id === id
    })

    if (userIndex >= 0) {
        users.splice(userIndex, 1)
        res.status(200).send("Usuário deletado com sucesso")
    } else {
        res.status (404)
        throw new Error ("Usuário não encontrado. Tente novamente")
    }
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)
    }
})

app.delete('/products/:id', (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        const productIndex = products.findIndex((product) => {
            return product.id === id
    })

    if (productIndex >= 0) {
        products.splice(productIndex, 1)
        res.status(200).send("Produto apagado com sucesso")
    } else{ 
        res.status (404)
        throw new Error ("Produto não encontrado. Tente novamente")
    }
    } catch (error: any) {
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message) 
    }
    
})

app.put('/users/:id', (req: Request, res: Response) => {
    const { id } = req.params

    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPassword = req.body.password as string | undefined

    const user = users.find((user) => user.id === id)

    if(user) {
        user.id = newId || user.id
        user.email = newEmail || user.email
        user.password = newPassword || user.password
    }

    res.status(200).send("Atualização realizada com sucesso")
})

app.put('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id as string

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number
    const newCategory = req.body.category as CATEGORY | undefined

    const product = products.find((product) => product.id === id)

    if(product) {
        product.id = newId || product.id
        product.name = newName || product.name
        product.price = isNaN(newPrice) ? product.price : newPrice
        product.category = newCategory || product.category
    }

    res.status(200).send("Atualização realizada com sucesso")
})