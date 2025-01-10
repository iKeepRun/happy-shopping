import { OrderDetailResp, ResponseType, AddressRespType, AddressListType, AddressItemType } from "./type"
import "./style.scss"
import Popup from "../../components/Popup";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import { message } from "../../utils/message";
import { Picker, Dropdown, Radio, Space } from 'antd-mobile';

const payType = [
    {
        pay_icon: "&#xe86e;",
        type_desc: "微信"
    }, {
        pay_icon: "&#xe634;",
        type_desc: "支付宝"
    }
]



function Order() {
    const param = useParams()
    const [showDiscount, setShowDiscount] = useState(false)
    const [showAddress, setShowAddress] = useState(false)
    const { request: orderRequest } = useRequest<ResponseType>({ manual: true })
    const { request: addressRequest } = useRequest<AddressRespType>({ manual: true })
    const [respData, setRespData] = useState<OrderDetailResp | null>(null)
    const [addressList, setAddressList] = useState<AddressListType>()
    const { orderId } = param;
    const [showPicker, setShowPicker] = useState(false);
    const [showPay, setShowPay] = useState(false);
    useEffect(() => {
        orderRequest({
            url: "/order_list.json",
            method: "POST",
            data: orderId
        }).then(
            (resp) => {
                // console.log(resp.data.time[0][0].label)
                setRespData(resp.data)
            }
        ).catch(e => message(e.message))
    }, [orderRequest, orderId])

    function handleDiscountClick() {
        setShowDiscount(true)
    }

    function handleSelectAddress() {
        setShowAddress(true)
        addressRequest({
            url: "/address_list.json",
            method: "POST"
        }
        ).then(
            (resp) => {
                setAddressList(resp.data)
            }
        ).catch(e => message(e.message))
    }


    function handleNewAddressClick(item: AddressItemType) {
        if (respData) {
            const newRespData = { ...respData };
            newRespData.address = item
            setRespData(newRespData);
        }
        setShowAddress(false)
    }

    function handlePickerClick() {
        setShowPicker(true);
    }
    
    const [currentRadio,setCurrentRadio]=useState({pay_icon: "&#xe86e;",type_desc: "微信"})

    function handlePayTypeChoice(item:any){
        console.log("cxxxxxx",item)
          setCurrentRadio(item)
    }

    return respData ? (
        <div className="page order-page">
            <div className="order-title">确认订单</div>
            <div className="order-owner">
                <div className="iconfont order-owner-address">&#xe603;</div>
                <div className="name-addr">
                    <div className="name">收货人：{respData.address.name}<span className="name-phone">{respData.address.phone}</span></div>
                    <div className="addr">收货人地址：{respData.address.address}</div>
                </div>
                <div className="order-owner-more iconfont" onClick={() => { handleSelectAddress() }}>&#xe839;</div>
            </div>
            <div className="delivery-time" onClick={() => { handlePickerClick() }}>送达时间<span className="choice">{respData.time[0]} {respData.time[1]}:{respData.time[2]}</span></div>

            {respData.shop.map(item =>
                <div className="order-detail" key={item.shopId}>
                    <div className="order-detail-title">
                        <div className="iconfont order-detail-title-img">&#xe6d8;</div>
                        <p className="order-detail-title-name">{item.shopName}</p>
                    </div>
                    <div className="order-detail-content" >
                        {item.cartList.map(product =>

                            <div className="order-detail-item" key={product.productId}>
                                <div className="detail-item-left">
                                    <img className="item-img" src={product.imgUrl} alt={product.title} />
                                </div>
                                <div className="detail-item-middle">
                                    <div className="item-title">{product.title}</div>
                                    <div className="item-specification">{product.weight}</div>
                                </div>
                                <div className="detail-item-right">
                                    <div className="item-price">&yen;{product.price}</div>
                                    <div className="item-count">x{product.count}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}


            <div className="order-discounts" onClick={() => { handleDiscountClick() }}>优惠券<span className="choice">请选择</span></div>

            <div className="order-info">
                <div className="order-info-item">
                    <div className="order-info-text">商品总计</div>
                    <div className="order-info-text">&yen;108.9</div>
                </div>
                <div className="order-info-item">
                    <div className="order-info-text">配送方式</div>
                    <div className="order-info-text">同城配送</div>
                </div>
                <div className="order-info-item">
                    <div className="order-info-text">优惠减免</div>
                    <div className="order-info-text">- 0&yen;</div>
                </div>
            </div>

            <div className="order-total">
                <div>合计：<span className="order-total-yen">&yen;</span><span className="order-total-price">108.9</span></div>
                <div className="order-submit" onClick={() => { setShowPay(true) }}>提交订单</div>
            </div>

            <Popup show={showDiscount} clickCallback={() => { setShowDiscount(false) }}>
                <div className="discount">
                    <div className="discount-title">优惠券</div>
                    <div className="discount-list">
                        <div className="discount-item">
                            <div className="discount-item-price">&yen;15</div>
                            <div className="discount-item-info">
                                <div className="info-maxout">满70可用</div>
                                <div className="info-date">有效期至2025-12-12</div>
                            </div>
                            <div className="iconfont discount-item-icon">&#xe839;</div>
                        </div>
                    </div>
                    <div className="discount-list">
                        <div className="discount-item">
                            <div className="discount-item-price">&yen;25</div>
                            <div className="discount-item-info">
                                <div className="info-maxout">满100可用</div>
                                <div className="info-date">有效期至2025-12-12</div>
                            </div>
                            <div className="iconfont discount-item-icon">&#xe839;</div>
                        </div>
                    </div>
                    <div className="discount-confirm">确定</div>
                </div>
            </Popup>
            <Popup show={showAddress} clickCallback={() => { setShowAddress(false) }}>
                <div className="address">
                    <div className="address-title">选择地址</div>
                    {addressList?.map(item =>
                        <div className="address-item" key={item.id} onClick={() => handleNewAddressClick(item)}>
                            <div className="receiver-name">{item.name} <span className="receiver-phone">{item.phone}</span></div>
                            <div className="receiver-address">{item.address}</div>
                        </div>

                    )}


                    <div className="address-add">新增地址</div>
                </div>
            </Popup>


            <Popup show={showPay} clickCallback={() => { setShowPay(false) }}>
                <div className="pay">
                    <div className="pay-title">请支付</div>
                    <div className="pay-total">&yen;240</div>
                    <div className="pay-type">
                        <div className="iconfont pay-type-icon" style={currentRadio.type_desc==="微信"?{color:"#73D13D"}:{color:"deepskyblue"}} dangerouslySetInnerHTML={{ __html: currentRadio.pay_icon }}></div>
                        <div className="pay-type-text">{currentRadio.type_desc}</div>
                        <div className="iconfont pay-type-activate">

                            <Dropdown className="dropdown">
                                <Dropdown.Item key='sorter' title=''>
                                    {/* <i className="iconfont">&#xe839;</i> */}

                                    <div style={{ margin: '0 75px' }}>
                                        <Radio.Group defaultValue='default'>
                                            <Space direction='vertical' block>
                                                {payType.map(item =>
                                                    <Radio block value={item.type_desc==='微信'?'default':''} onClick={()=>{
                                                        handlePayTypeChoice(item)
                                                    }}>
                                                        {item.type_desc}
                                                    </Radio>
                                                )}


                                            </Space>
                                        </Radio.Group>
                                    </div>
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="pay-balance">
                        <div className="iconfont pay-balance-icon">&#xe624;</div>
                        <div className="pay-balance-text">余额：&yen;200</div>
                        <div className="pay-balance-activate"></div>
                    </div>
                    <div className="pay-now">立即支付</div>
                </div>
            </Popup>

            <Picker
                columns={respData.timeRange}
                visible={showPicker}
                onClose={() => {
                    setShowPicker(false)
                }}
                value={respData.time}
                onConfirm={v => {
                    if (respData) {
                        const newData = { ...respData }
                        newData.time = v as string[];
                        setRespData(newData)
                    }
                    setShowPicker(false)
                }}
            />


        </div>
    ) : null;
}

export default Order;