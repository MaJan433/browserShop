const express = require('express')
const {DatabaseFunctions} = require("./repository");
const {createHmac} = require("crypto");

const router = express.Router()

router
    .get('/orders', async (req,res) => {
        const answer = await DatabaseFunctions.get_orders()
        console.log(answer, 'to jest tu')
        res.json(answer)
    })
    .post('/search', async (req,res)=> {
        console.log(req.body)
        console.log('got this')
        console.log(req.body.search)
        const {search, minPrice, maxPrice} = req.body
        console.log({search, minPrice, maxPrice})
        const answer = await DatabaseFunctions.item_finder(search, minPrice, maxPrice)
        res.json(answer)
    })
    .put('/items/:uuid', async (req, res) => {
        console.log(req.params.uuid)
        console.log('odbiera!')
        await DatabaseFunctions.update_product(req.params.uuid, req.body)
        res.end()
    })
    .delete('/items/:uuid', async (req, res)=>{
        console.log(req.params.uuid)
        console.log('delete works!')
        await DatabaseFunctions.remove_product(req.params.uuid)
        res.end()
    })
    .get('/items', async(req,res)=>{
        const result = await DatabaseFunctions.select_all()
        //console.log(result)
        res.json(result)
    })
    .get('/basket', async(req, res) => {
        const result = await DatabaseFunctions.show_basket()
        //console.log(result)
        res.json(result)
    })
    .get('/weather', async(req, res) =>{
        const weatherInfo = await fetch('https://danepubliczne.imgw.pl/api/data/synop',
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }

        })
        const weatherData = await weatherInfo.json();

        res.json({weatherData})
        console.log(weatherData)
    })
    .post('/checkHash', async(req, res)=> {
        //password ----> 'SafeBrowserShop1'
        const salt = 'juasdhiuoasidh&^jhdfijuhsd;uoiyN8aysud* HFASDIUFSADH IUPDSAH*&hgajshdg78608lks'
        const hash = createHmac('sha512', salt)
            .update(req.body.password)
            .digest('hex');
        const requiredHash = await DatabaseFunctions.get_admin_hash()
        if (requiredHash[0].password === hash){
            console.log('logged in admin panel')
            res.status(200)
            res.end()
        } else {
            res.status(400);
            res.end()
        }
    })
    .post('/addOrder', async (req, res)=>{
        console.log(req.body, 'tutaj mam przychodzacy json')
        const data = Object.entries(req.body.basketCookie)

        const promises = data.map((arr, i) => {
            return DatabaseFunctions.insert_order(
                arr[0],
                arr[1].amount,
                arr[1].unitPrice,
                req.body.user,
                req.body.address)})
        await Promise.all(promises)
        res.end()
    })
    .post('/items/add', async (req, res) => {
        //console.log(req.body, 'to tu')
        await DatabaseFunctions.add_new_product(req.body)
        res.end()
})

module.exports = {
    router
}

