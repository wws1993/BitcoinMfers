declare namespace API.order {
  interface entry {
    /** 订单id */
    id: number;
    /** 创建时间 */
    createTime: date;
    /** 更新时间 */
    updateTime: date;
    /** 购买数量 */
    num: number
    /**  付款人地址 */
    ownerAddress: string
    /**  用户nft收款地址 */
    receiveAddress: string
    /**  平台收款地址 */
    payAddress: string
    /**  取值：Economy, Normal, Faster  */
    feeLevel: string
    /** 付款金额 */
    value: string
    /** 机器人订单id */
    botOrderId: string
    /** nft信息 */
    nftInfoList: {
      /** 图片大图 */
      contentUrl: string;
      /** 图片编号 */
      imgId: number;
      /** 铭文 */
      inscription: string;
      /** 铭文hash */
      inscriptionHash: string;
    }[]
  }

  namespace dto {
    type batchQueryDto = {size?: number, status?: OrderStatus}
  }
}
