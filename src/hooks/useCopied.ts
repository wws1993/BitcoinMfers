export default () => {
  return (msg: string) => {
    console.log('copy content:', msg);

    var textareaC = document.createElement('textarea');
    textareaC.setAttribute('readonly', 'readonly'); //设置只读属性防止手机上弹出软键盘
    textareaC.value = msg;
    document.body.appendChild(textareaC); //将textarea添加为body子元素
    textareaC.select();
    document.execCommand('copy');
    document.body.removeChild(textareaC);//移除DOM元素
    console.log("copy successed");
  }
}