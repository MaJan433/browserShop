const {pool} = require("./pool");
const {v4:uuid} = require("uuid")

class DatabaseFunctions {


    static async get_orders(){
        const [result] = await pool.execute('SELECT * FROM `basket_orders`')
        return result
    }
    static async update_product(uuid, object){
        const [result] =  await pool.execute('UPDATE `main_table` SET `name`=:name, `price`=:price, `lat`=:lat, `lon`=:lon, `photo`=:photo, `amount`=:amount, `cat`=:cat WHERE `uuid`= :uuid', {
            uuid: uuid,
            name: object.productName,
            price: object.price,
            lat: object.lat,
            lon: object.lon,
            photo: object.photo,
            amount: object.amount,
            cat: object.cat
        })
    }

    static async item_finder(word, minPrice, maxPrice){
        const [rows] = await pool.execute(
            'SELECT * FROM `main_table` WHERE `name` LIKE ? AND `price` >= ? AND `price` <= ?',
            [`%${word}%`, minPrice, maxPrice]
        );
        return rows;
    }
    static async select_all() {
        const [result] = await pool.execute('SELECT * FROM `main_table`')
        return result
    }
    static async show_basket() {
        const [result] = await pool.execute('SELECT * FROM `basket`')
        return result
    }
    static async remove_product(uuid){
        await pool.execute('DELETE FROM `main_table` WHERE `uuid` = :uuid', {
            uuid: uuid,
        })
    }

    static async add_new_product(object) {

        await pool.execute('INSERT INTO `main_table` VALUES(:uuid, :name, :price, :lat, :lon, :photo, :amount, :cat)', {
            uuid: uuid(),
            name: object.productName,
            price: object.price,
            lat: object.lat,
            lon: object.lon,
            photo: object.photo,
            amount: object.amount,
            cat: object.cat
        })
    }

    static async get_admin_hash() {
        const [hash] = await pool.execute('SELECT `password` FROM `admin_password`')
        return hash
    }
    static async insert_order(item, amount, price, user, address){
        await pool.execute('INSERT into `basket_orders` VALUES (:uuid, :item, :amount, :price, :user, :address)', {
            uuid: uuid(),
            item,
            amount,
            price,
            user,
            address
        })
    }

}
module.exports = {
    DatabaseFunctions,
}
