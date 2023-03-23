import { Router, Request, Response} from "express";
import {DatabaseFunctions} from "./repository";
import {createHmac} from "crypto";

export class MainRouter {
    public readonly router: Router = Router()

    constructor() {
        this.router = Router()
        this.createRoutes()
    }

    private createRoutes() {
        this.router
            .get('/orders', this.getOrders)
            .post('/search', this.searchItem)
            .put('/items/:uuid', this.updateItem)
            .delete('/items/:uuid', this.deleteItem)
            .post('/items/add', this.addItem)
            .get('/basket', this.getBasket)
            .get('/items', this.getItems)
            .post('/checkHash', this.adminLogging)
            .post('/addOrder', this.addOrder)
    }

    private async getOrders(req: Request, res: Response) {
        const answer = await DatabaseFunctions.get_orders()
        res.json(answer)
    }
    private async searchItem(req: Request, res: Response) {
        const {search, minPrice, maxPrice} = req.body
        const answer = await DatabaseFunctions.item_finder(search, minPrice, maxPrice)
        res.json(answer)
    }
    private async updateItem(req: Request, res: Response) {
        await DatabaseFunctions.update_product(req.params.uuid, req.body)
        res.end()
    }
    private async deleteItem(req: Request, res: Response) {
        await DatabaseFunctions.remove_product(req.params.uuid)
        res.end()
    }
    private async addItem(req: Request, res: Response) {
        await DatabaseFunctions.add_new_product(req.body)
        res.end()
    }
    private async getBasket(req: Request, res: Response) {
        const result = await DatabaseFunctions.show_basket()
        res.json(result)
    }
    private async getItems(req: Request, res: Response) {
        const result = await DatabaseFunctions.select_all()
        res.json(result)
    }
    private async adminLogging(req: Request, res: Response) {
        //password ----> 'SafeBrowserShop1'
        const SALT = 'juasdhiuoasidh&^jhdfijuhsd;uoiyN8aysud* HFASDIUFSADH IUPDSAH*&hgajshdg78608lks'
        const hash = createHmac('sha512', SALT)
            .update(req.body.password)
            .digest('hex');
        const requiredHash: any = await DatabaseFunctions.get_admin_hash()
        if (requiredHash[0].password === hash) {
            res.status(200)
        } else {
            res.status(400);
        }
        res.end()
    }
    private async addOrder(req: Request, res: Response) {
        const data = Object.entries(req.body.basketCookie)
        const promises = data.map((arr: any, i) => {
            return DatabaseFunctions.insert_order(
                arr[0],
                arr[1].amount,
                arr[1].unitPrice,
                req.body.user,
                req.body.address)
        })
        await Promise.all(promises)
        res.end()
    }
}
