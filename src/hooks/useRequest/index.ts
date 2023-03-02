import useResquest, { type IRequestOption } from "./request.client";
import './interceptor.response';
import './interceptor.request';

const { Get, Delete, Post, Put } = useResquest();

export enum OrderStatus {
  INTI = 'INTI',
  PAID = 'PAID',
  EXECUTING = 'EXECUTING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export default () => ({
  mint: (num: number, receiveAddress: string) => Post('/order/create', {num, receiveAddress}),
  supply: () => Post('/order/supply'),
  /** update order status */
  operateUpdate: () => Post('/operate/update'),
  /** 查询某订单 */
  operateQuery: (id: number): API.Response<API.order.entry> => Get('/operate/get'),
  /** 批量查询 */
  operateBatchQuery: ({size = 10, status}: API.order.dto.batchQueryDto) => Get('/operate/listOrderByStatus', {size, status}),
});
