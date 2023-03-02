import svg_twitter_v2 from '@/assets/svg/twitter.v2.svg'
import svg_cat from '@/assets/svg/cat.svg'
import svg_min from '@/assets/svg/utils.min.svg'
import svg_add from '@/assets/svg/utils.add.svg'
import { useEffect, useState } from 'react'
import cx from 'classnames'
import { QRCode } from 'antd'
import frendslinkConfig from '@/config/frendslink.config'
import { message, notification } from 'antd'
import useRequest from '@/hooks/useRequest'
import useCopied from '@/hooks/useCopied'

export default () => {
  let [count, setCount] = useState(1)
  let [visible, setVisible] = useState(false)
  const [ReceiverAddress, setReceiverAddress] = useState('')
  const [state, setState] = useState({
    minMintCount: 1,
    maxMintCount: 10000,
    mintinscription: '0.0003264',
    payValue: '',
    payAddress: '',
    orderId: ''
  })

  const { mint, supply } = useRequest()

  const hooks = {
    calcCount: (isAdd: 0|1) => {
      if (isAdd) {
        count ++
        count = count > state.maxMintCount ? state.maxMintCount : count
        setCount(count)
      } else {
        count --
        count = count < state.minMintCount ? state.minMintCount : count
        setCount(count)
      }
    },
    async mint() {
      return window.location.href = 'https://inscribenow.io/collections/5d555deda5b2f24a'

      if (!ReceiverAddress) return message.error('Please Input Your Receiver Address!')

      message.open({duration: 0, type: 'loading', content: 'minting...'})
      const res = await mint(count, ReceiverAddress)

      state.payValue = (res.data.value / 1000000000).toString().slice(0, 9)
      state.payAddress = res.data.payAddress
      state.orderId = res.data.id
      setState({...state})

      message.destroy()

      setVisible(true)
    },
    confirmPaid() {
      setVisible(false)

      notification.open({
        type: 'info', message: 'Tips', description: `请妥善保管您的订单号码：${state.orderId}`,
        onClick: () => {
          useCopied()(state.orderId);
          message.success('Copied Successed!')
        }
      })
    },
    supply() {
      supply().then(res => {
        console.log(res);
      })
    }
  }

  return <div className="homeV2">
    <div className={cx('container base-page', visible && 'hide')}>
      <div className="title">
        <span>BIT PIXEL CAT</span>
        <img src={svg_twitter_v2} alt="" className="twitter" onClick={() => window.open(frendslinkConfig.twitter)} />
      </div>

      <div className="tags">
        <span>#BITCOINNFT</span>
        <span>#ORDINALS INSCRIPTIONS</span>
      </div>

      <div className="card">
        <video className="cat" src="/logo.mp4" muted autoPlay loop></video>
        <div className="mint" onClick={hooks.mint}>MINT NOW</div>

        <div className="row">
          <span className="label">Supply:</span>
          <span className="value">{state.maxMintCount}/10000</span>
        </div>
        {/* <div className="row">
          <span className="label">Mint Price + Inscription Fee:</span>
          <span className="value">~{state.mintinscription} BTC</span>
        </div> */}

        <div className="desc">
          You can now easily inscribe your Bit Pixel Cats on https://inscribenow.io/collections/5d555deda5b2f24a<br />
          The process is very simple.<br />
          <br />
          1️⃣ Go to https://inscribenow.io/collections/5d555deda5b2f24a<br />
          2️⃣ Choose desired quantity and hit the MINT button.<br />
          3️⃣ Send the mint payment (in the amount and to the address shown in the next step).<br />
          4️⃣ Then for each minted item add unique wallet address to receive the inscription and send the inscription fee payment.<br />
          That’s it!<br />
          Upon inscription confirmation, your Bit Pixel Cats will be revealed to you right away!<br />
        </div>
        {/* <div className="row col">
          <span className="label">Receiver Address: </span>
          <input
            type="text"
            className="input"
            placeholder='Address must be ord wallet !!'
            onInput={e => setReceiverAddress((e.target as any).value)}
          />
        </div>

        <div className="num">
          <img src={svg_min} alt="" className="icon" onClick={() => hooks.calcCount(0)} />
          {count}
          <img src={svg_add} alt="" className="icon" onClick={() => hooks.calcCount(1)} />
        </div> */}
      </div>
    </div>

    <div className={cx('container mint-page', !visible && 'hide')} onClick={() => setVisible(false)}>
      <div className="title">Bit Pixel Cat</div>

      <div className="card" onClick={ev => ev.stopPropagation()}>
        <div className="h1">Mint Price</div>
        <div className="h2">FREE + Gas: 0.00163 BTC</div>
        <div className="desc">The following items are awaiting mint payment. They are reserved for you for 60 minutes. To proceed to inscribing, please pay the mint price for your reserved items.   Send exactly {state.payValue} BTC to the following address:</div>
        <div className="qrcode">
          <QRCode value={state.payAddress} color='#000c' icon={svg_cat} size={180} />
        </div>
        <div className="qrcode-val">{state.payAddress}</div>

        <div className="confirm" onClick={hooks.confirmPaid}>I have paid</div>
      </div>
    </div>
  </div>
}