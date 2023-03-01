import useResquest, { type IRequestOption } from "./request.client";
import './interceptor.response';
import './interceptor.request';

const { Get, Delete, Post, Put } = useResquest();

export default () => ({
  mint: (num: number, receiveAddress: string) => Post('/order/create', {num, receiveAddress})
});
