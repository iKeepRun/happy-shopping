export type ResponseType={
    success:boolean;
    data:OrderDetailResp;
}

export type OrderDetailResp={
   
    timeRange:Array<Array<{
        label:string;value:string
    }>>;
    
    address:{
        id:string;
        name:string;
        phone:string;
        address:string
    },

    time:Array<string>;


    total:number;
    shop:{shopId:string;
        shopName:string;
        cartList:{
            productId:string;
            imgUrl:string;
            weight:string;
            title:string;
            price:number;
            count:number
        }[]
    }[]

}

export type AddressRespType={
    success:boolean;
    data:AddressListType;
}

export type AddressListType=Array<AddressItemType>

export type AddressItemType={
    id:string;
    name:string;
    phone:string;
    address:string
}