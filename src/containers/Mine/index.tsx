import Docker from "../../components/Docker";
import "./style.scss"

function Mine() {
    return (
        <div className="page mine-page">
            <div className="mine-title">
                我的
            </div>
            <div className="mine-info">
                <img className="mine-avatar-img" src="\R-C.png" alt="avatar"></img>
                <span className="mine-name">李翠花</span>
                <span className="mine-vip-level">vip5</span>
                <span className="mine-vip-center">会员中心</span>
            </div>
            <div className="mine-vip-detail">
                <div className="mine-vip-item">4 <br /> 优惠券</div>
                <div className="mine-vip-item">258<br />积分</div>
            </div>
            <div className="mine-more">
                <div className="mine-more-item">
                    <div className="more-item-icon iconfont">&#xe612;</div>
                    <div className="more-item-text">全部订单</div>
                </div>
                <div className="mine-more-item">
                    <div className="more-item-icon iconfont">&#xe604;</div>
                    <div className="more-item-text">待付款</div>
                </div>
                <div className="mine-more-item">
                    <div className="more-item-icon iconfont">&#xe612;</div>
                    <div className="more-item-text">待发货</div>
                </div>
                <div className="mine-more-item">
                    <div className="more-item-icon iconfont">&#xe6b1;</div>
                    <div className="more-item-text">待收货</div>
                </div>
                <div className="mine-more-item">
                    <div className="more-item-icon iconfont">&#xe8ab;</div>
                    <div className="more-item-text">退款/售后</div>
                </div>
                <div className="mine-more-item">
                    <div className="more-item-icon iconfont">&#xe772;</div>
                    <div className="more-item-text">客服</div>
                </div>
                <div className="mine-more-item">
                    <div className="more-item-icon iconfont">&#xe781;</div>
                    <div className="more-item-text">设置</div>
                </div>
                <div className="mine-more-item">
                    <div className="more-item-icon iconfont">&#xe63e;</div>
                    <div className="more-item-text">地址</div>
                </div>
            </div>
            <Docker name="mine" />
        </div>
    )
}

export default Mine;