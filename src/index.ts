// console.log("hello");
import express, { Request, Response} from 'express';
import { users, products, purchases } from './database'
import cors from 'cors';
import { TProduct, CATEGORY, TUser, TPurchase } from "./types"
import { createUser, getAllUsers, createProduct, getAllProducts, getProductById, createPurchase, getAllPurchasesFromUserId } from "./database"

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
    res.status(200).send(users)
});

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
});

app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string

    const result: TProduct[] = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(result)
})

app.post('/users', (req: Request, res: Response) =>{
    const {id, email, password} = req.body as TUser

    const newUser = {
        id,
        email,
        password
    }

    users.push(newUser)

    res.status(201).send("Cadastro realizado com sucesso")
})

app.post('/products', (req: Request, res: Response) =>{
    const {id, name, price, category} = req.body as TProduct

    const newProduct = {
        id,
        name,
        price,
        category
    }

    products.push(newProduct)

    res.status(201).send("Produto cadastrado com sucesso")
})

app.post('/purchases', (req: Request, res: Response) =>{
    const {userId, productId, quantity, totalPrice} = req.body as TPurchase

    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchases.push(newPurchase)

    res.status(201).send("Compra realizada com sucesso")
})

app.get('/products/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const result: TProduct[] = products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase())
    })
    res.status(200).send(result)
})

app.get('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id as string
    const result = products.find((product) => {
        return product.id === id
    })
    res.status(200).send(result)
    console.log("objeto product encontrado")
})

app.get('/users/:id/purchases', (req: Request, res: Response) => {
    const id = req.params.id as string

    const result = purchases.filter((purchase) => {
        return purchase.userId === id
    })
    res.status(200).send(result)
    console.log("array de compras do user procurado")
})

//Delete User by Id

app.delete('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id as string

    const userIndex = users.findIndex((user) => {
        return user.id === id
    })

    if (userIndex >= 0) {
        users.splice(userIndex, 1)
    }
    res.status(200).send("Usuário deletado com sucesso")
})

app.delete('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id as string

    const productIndex = products.findIndex((product) => {
        return product.id === id
    })

    if (productIndex >= 0) {
        products.splice(productIndex, 1)
    }
    res.status(200).send("Produto apagado com sucesso")
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