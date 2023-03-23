import {pool} from "./pool";
import {v4 as uuid} from "uuid";

export type updateProductJSON = {
    productName:string,
    price: number,
    lat: number,
    lon: number,
    photo: string,
    amount: number,
    cat: string
}

export class DatabaseFunctions {

    public static async get_orders(){
        const [result] = await pool.execute('SELECT * FROM `basket_orders`')
        return result
    };
    public static async update_product(uuid: string, object: updateProductJSON){
        const [result] =  await pool.execute('UPDATE `main_table` SET `name`=:name, `price`=:price, `lat`=:lat, `lon`=:lon, `photo`=:photo, `amount`=:amount, `cat`=:cat WHERE `uuid`= :uuid', {
            uuid: uuid,
            name: object.productName,
            price: object.price,
            lat: object.lat,
            lon: object.lon,
            photo: object.photo,
            amount: object.amount,
            cat: object.cat
        });
    };

    public static async item_finder(word:string,
                             minPrice: number,
                             maxPrice : number){
        const [rows] = await pool.execute(
            'SELECT * FROM `main_table` WHERE `name` LIKE ? AND `price` >= ? AND `price` <= ?',
            [`%${word}%`, minPrice, maxPrice]
        );
        return rows;
    };

    public static async select_all() {
        const [result] = await pool.execute('SELECT * FROM `main_table`')
        return result
    };

    public static async show_basket() {
        const [result] = await pool.execute('SELECT * FROM `basket`')
        return result
    };

    public static async remove_product(uuid: string){
        await pool.execute('DELETE FROM `main_table` WHERE `uuid` = :uuid', {
            uuid: uuid,
        })
    }
    public static async add_new_product(object: updateProductJSON) {

        await pool.execute(
            'INSERT INTO `main_table` VALUES(:uuid, :name, :price, :lat, :lon, :photo, :amount, :cat)',
            {
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

    public static async get_admin_hash() {
        const [hash] = await pool.execute('SELECT `password` FROM `admin_password`')
        return hash
    }
    public static async insert_order(item: string,
                                     amount: number,
                                     price: number,
                                     user: string,
                                     address: string){
        await pool.execute('INSERT into `basket_orders` VALUES (:uuid, :item, :amount, :price, :user, :address)', {
            uuid: uuid(),
            item,
            amount,
            price,
            user,
            address
        });
    };

};