import { CartProductsRespType, CartProductsType ,CartSubmitRespType} from "./type"
import Docker from "../../components/Docker";
import "./style.scss"
import { useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest";
import { message } from "../../utils/message";
import { useNavigate } from "react-router-dom";
function Cart() {

    const [cartProducts, setCartProducts] = useState<CartProductsType>([]);
    const { request:CartProductsRequest } = useRequest<CartProductsRespType>({ manual: true })

    const {request:CartSubmitRequest}=useRequest<CartSubmitRespType>({manual:true})
    const navigate=useNavigate()
    // let [selectAll,setSelectAll]=useState(false);
    useEffect(() => {
        CartProductsRequest({
            url: "/cartProducts.json",
            method: "POST"
        }).then(
            (resp) => {
                const newCartProducts = resp.data
                newCartProducts.forEach(item => {
                    item.selected = false;
                    item.cartList.map(p => p.selected = false)
                })
                setCartProducts(newCartProducts)
            }
        ).catch(e => { message(e.message) })
    }, [CartProductsRequest])

    function handleChangeCount(newCount: string, shopId: string, productId: string) {
        const updatedCartProducts = cartProducts.map(shop => {
            if (shop.shopId === shopId) {
                return {
                    ...shop, cartList: shop.cartList.map(product => {
                        if (product.productId === productId) {
                            //data type conver
                            if (Number.isNaN(+newCount)) {
                                return { ...product, count: 0 }
                            } else {
                                return { ...product, count: +newCount }
                            }

                        }
                        return product;
                    })
                }
            }
            return shop
        })

        setCartProducts(updatedCartProducts)
    }

    function changeProductSelected(shopId: string, productId: string) {
        const newList = [...cartProducts]
        const shop = newList.find(shop => shop.shopId === shopId)
        let shopAllSelected=true;
        shop?.cartList.forEach(product => {
            if (product.productId === productId) {
                product.selected = !product.selected
            }
            if(!product.selected){
                shopAllSelected=false
            }
        })
        
        shop!.selected=shopAllSelected
        setCartProducts(newList)
        
    }

    function changeShopSelected(shopId: string) {
        const newList = [...cartProducts]
        const shop = newList.find(shop => shop.shopId === shopId)
        shop!.selected = !shop!.selected
        if (shop?.selected) {
            shop?.cartList.forEach(product => {
                product.selected = true
            })
        }else{
            shop?.cartList.forEach(product => {
                product.selected = false
            })
        }
        setCartProducts(newList)
    }

    
    const notSelectAll=cartProducts.find(item=>!item.selected)

    function changeSelectAll(){
        const newList = [...cartProducts]
        newList.forEach(shop=>{
            shop.selected=!shop.selected
            shop.cartList.map(item=>item.selected=!item.selected)
        })

        setCartProducts(newList)
    }
    let count=0;
    let totalPrice=0;
    cartProducts.forEach(shop=>{
        shop.cartList.forEach(product=>{
            if(product.selected){
                count=count+1
                totalPrice=totalPrice+product.count*product.price
            }
        })
    })
    
    let params:Array<{productId:string,count:number}>=[]
    function handleSubmitClick(){
        cartProducts.forEach(shop=>{
            shop.cartList.forEach(product=>{
                if(product.selected){
                    params.push({productId:product.productId,count:product.count})
                }
            })
        })

       if(params.length===0){
        message("您没有勾选任何商品，无法生成订单")
        return ;
       }
       CartSubmitRequest({
        url:"/cartSubmit.json",
        method:"POST",
        data:params
       }).then(resp=>{
        const orderId=resp.data.orderId;
        
        //    jump to order-page
       navigate(`/order/${orderId}`)    
       }).catch(e=>message(e.message))
    
    }
    return (
        <div className="page cart-page">
            <div className="cart-title">购物车</div>
            {cartProducts.map(shop => {
                return <div className="cart-detail" key={shop.shopId}>
                    <div className="cart-detail-title">
                        <div className={shop.selected?"cart-detail-radio cart-detail-radio-activate ":"cart-detail-radio"} onClick={() => { changeShopSelected(shop.shopId) }}></div>
                        <div className="iconfont cart-detail-title-img">&#xe6d8;</div>
                        <p className="cart-detail-title-name">{shop.shopName}</p>
                    </div>

                    <div className="cart-detail-content">
                        {shop.cartList.map(product => {
                            return <div className="cart-detail-item" key={product.productId} onClick={() => { changeProductSelected(shop.shopId, product.productId) }}>
                                <div className={product.selected ? "cart-detail-radio cart-detail-radio-activate" : "cart-detail-radio"} ></div>

                                <img className="cart-detail-item-img" src={product.imgUrl} alt="" />
                                <div className="cart-detail-item-right">
                                    <div className="item-title">{product.title}</div>
                                    <div className="item-specification">{product.weight}</div>
                                    <div className="item-price"><span className="yen">&yen;</span>{product.price}</div>
                                    <input className="item-input" value={product.count} onChange={(e) => handleChangeCount(e.target.value, shop.shopId, product.productId)}  onClick={(e)=>{e.stopPropagation()}} />
                                </div>
                            </div>
                        })}

                    </div>
                </div>
            })}


            <div className="cart-total">    
                <div className={notSelectAll?"cart-total-radio":"cart-total-radio cart-total-radio-activate" }  onClick={()=>{changeSelectAll()}}></div>
                {/* <div className={selectAll?"cart-total-radio cart-total-radio-activate":"cart-total-radio"}></div> */}
                全选
                <span className="cart-total-text">合计：</span>
                <div className="cart-total-price"><span className="yen">&yen;</span>{totalPrice}</div>
                <div className="cart-total-pay" onClick={()=>{handleSubmitClick()}}>结算 （{count}）</div>
            </div>
            <Docker name="cart" />
        </div>)
}


export default Cart;