export type CartProductsType = Array<{
    shopId: string;
    shopName: string;
    selected:boolean;
    cartList: Array<{
        productId: string,
        imgUrl: string,
        weight: string,
        title: string,
        price: number,
        count: number,
        selected:boolean;
    }>
}>

export type CartProductsRespType = {

    success: boolean;
    data: CartProductsType
}

export type CartSubmitRespType={
    success:boolean;
    data:{
        orderId:string
    }
}