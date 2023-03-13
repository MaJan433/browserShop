import react, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom"
import {ExchangeRate} from "./ExchangeRate";



export const Basket = () => {

    const [cookies, setCookie] = useCookies(['basketCookie'])
    const [basket, setBasket] = useState([])
    const [user, setUser] = useState('')
    const [userAddress, setUserAddress] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:3001/basket');
            const data = await res.json();
            setBasket(data)
        })();
    }, []);

    const returnToMainPage = () =>{
        navigate('/')
    }

    if (!cookies.basketCookie){
        return (
            <>
            <div> Basket is empty!
            <br/>
                To add a product, click on it!
            </div>
            <button onClick={returnToMainPage}> Return to main page</button>
            </>
        )
    }

    const basketArr = Object.entries(cookies.basketCookie) ? Object.entries(cookies.basketCookie) : []

    const total = basketArr.reduce((acc, curr) => {
        const [productName, productDetails] = curr;
            const productTotal = productDetails.amount * parseFloat(productDetails.unitPrice.replace(',', '.'));
            return acc + productTotal;

    }, 0);

    const basketItems = basketArr.map(basketItem => (
        <div key={basketItem[0]} className="tutaj">
            <span>{basketItem[0]}</span> amount:  <span>{basketItem[1]}</span>
        </div>
    ));

    const sendOrderToDatabase  = async (e) => {
        e.preventDefault()
        if (user === '' || userAddress === ''){
            alert('User name and address are mandatory!')
            return;
        }
        const _tempObject = {}
        _tempObject.basketCookie = cookies.basketCookie
        _tempObject.user = user
        _tempObject.address = userAddress

        const res = await fetch('http://localhost:3001/addOrder', {
            method: 'POST',
            body: JSON.stringify(_tempObject),
            headers: {
                "Content-Type": "application/json"
            },
        });
        setCookie('basketCookie', {})
        alert('Thank you for your order!')
        navigate('/')

    };
    const importedImages = {}
    for (let i=0; i < basketArr.length; i++){
        importedImages[basketArr[i][0]] = require(`./${basketArr[i][1].photo}`)
    }

    const increaseAmount = (key) => {
        // console.log(cookies.basketCookie[key], )
        if (cookies.basketCookie[key].amount < Number(cookies.basketCookie[key].maxAmount)){
        console.log(cookies.basketCookie[key].amount, Number(cookies.basketCookie[key].maxAmount))
            const newAmount = cookies.basketCookie[key].amount + 1
            const newCookie = cookies.basketCookie
            newCookie[key].amount = newAmount
            setCookie('basketCookie', newCookie)
        } else {
            alert('Not enough items in storage :(')
        }
    }

    const decreaseAmount = (key) => {
        if (cookies.basketCookie[key].amount > 0){
            const newAmount = cookies.basketCookie[key].amount - 1
            const newCookie = cookies.basketCookie
            newCookie[key].amount = newAmount
            setCookie('basketCookie', newCookie)
        }

    }

    const divs = basketArr.map((arr) => {
        if (Number(arr[1].amount) > 0) {
            return <div key={arr[0]}
                        price={arr[1].unitPrice}
                        amount={arr[1].amount}
                        photo={arr[1].photo}
                        className="basketItem"
            >
                <div className="basketImageText">
                    <span>{arr[0]}</span>
                    <br/>
                    <span>Price: {arr[1].unitPrice} zł</span>
                    <br/>
                    <span>Amount: {arr[1].amount}</span>
                    <br/>
                    <span>Available: {arr[1].maxAmount}</span>
                    <br/>
                    <span>Total: {(Number(arr[1].unitPrice) * Number(arr[1].amount)).toFixed(2)} zł </span>
                </div>
                <div className="basketPhoto"><img src={importedImages[arr[0]]}/></div>
                <div className="amountChange" onClick={() => increaseAmount(arr[0])}><span> + </span></div>
                <div className="amountChange" onClick={() => decreaseAmount(arr[0])}><span> - </span></div>
            </div>;
        }
        })



    const clearBasket = () =>{
        setCookie("basketCookie", {})
    }

    function closeBasket() {
        navigate('/')
    }

    if (total){
        return <div className="totalBasketDiv">


            <hr/>
            <h2> BASKET </h2>

            {divs}
            <div className="totalPrice">
            <div><span>TOTAL VALUE:</span></div>
            <div><span>in PLN:{(total).toFixed(2)}</span></div>
            <div><span> <ExchangeRate total={total}/> </span></div>

            <form>
                <input
                    placeholder={'Please insert your name'}
                    onChange={(e) => setUser(e.target.value)}
                ></input>
                <input
                    onChange={(e) => setUserAddress(e.target.value)}
                    placeholder={'Please insert your address'}
                ></input>
                <div>
                <button style={{display:"inline", margin:"5px", padding:"10px"}} className="button-32" onClick={sendOrderToDatabase}> Make order! </button>
                <button style={{display:"inline", margin:"5px", padding:"10px 8px"}} className="button-32" onClick={clearBasket}> Clear basket</button>
                </div>
            </form>
        </div>;
        </div>
    } else {
        return (
            <>
            <hr/>
            <div> Your basket is empty, please add some items!</div>
                <button className="button-32" onClick={closeBasket}> Close basket </button>
            </>
            )

    }

}