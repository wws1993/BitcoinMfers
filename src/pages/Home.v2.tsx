import svg_twitter_v2 from '@/assets/svg/twitter.v2.svg'
import svg_cat from '@/assets/svg/cat.svg'
import svg_min from '@/assets/svg/utils.min.svg'
import svg_add from '@/assets/svg/utils.add.svg'
import { useState } from 'react'
import cx from 'classnames'
import { QRCode } from 'antd'
import frendslinkConfig from '@/config/frendslink.config'
import { message } from 'antd'
import useRequest from '@/hooks/useRequest'

export default () => {
  let [count, setCount] = useState(1)
  let [visible, setVisible] = useState(false)
  const [ReceiverAddress, setReceiverAddress] = useState('')
  const [state, setState] = useState({
    minMintCount: 1,
    maxMintCount: 10000,
    mintinscription: '0.0003264',
    payValue: '',
    payAddress: ''
  })

  const { mint } = useRequest()

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
      if (!ReceiverAddress) return message.error('Please Input Your Receiver Address!')

      message.loading('')
      const res = await mint(count, ReceiverAddress)

      state.payValue = res.data.value
      state.payAddress = res.data.payAddress || 'bc1qxeh9rjlspyz6hdkdetsxkeuc3cfs2tr4j06exw'
      setState({...state})

      console.log(res);
      setVisible(true)
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
        <video className="cat" src="/logo.mp4" muted autoPlay></video>

        <div className="row">
          <span className="label">SUPPLY:</span>
          <span className="value">{state.maxMintCount}/10000</span>
        </div>
        <div className="row">
          <span className="label">Mint Price + Inscription Fee:</span>
          <span className="value">~{state.mintinscription} BTC</span>
        </div>
        <div className="row col">
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
        </div>


        <div className="mint" onClick={hooks.mint}>MINT NOW</div>
      </div>
    </div>

    <div className={cx('container mint-page', !visible && 'hide')} onClick={() => setVisible(false)}>
      <div className="title">Bit Pixel Cat</div>

      <div className="card">
        <div className="h1">Mint Price</div>
        <div className="h2">FREE + Gas: 0.00163 BTC</div>
        <div className="desc">The following items are awaiting mint payment. They are reserved for you for 60 minutes. To proceed to inscribing, please pay the mint price for your reserved items.   Send exactly {state.payValue} BTC to the following address:</div>
        <div className="qrcode">
          <QRCode value={state.payAddress} color='#000c' icon={svg_cat} size={180} />
        </div>
        <div className="qrcode-val">{state.payAddress}</div>

        <div className="confirm">I have paid</div>
      </div>
    </div>
  </div>
}