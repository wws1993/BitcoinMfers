import svg_twitter_v2 from '@/assets/svg/twitter.v2.svg'
import svg_cat from '@/assets/svg/cat.svg'

export default () => <div className="homeV2">
  <div className="title">
    <span>BIT PIXEL CAT</span>
    <img src={svg_twitter_v2} alt="" className="twitter" />
  </div>

  <div className="tags">
    <span>#BITCOINNFT</span>
    <span>#ORDINALS INSCRIPTIONS</span>
  </div>

  <div className="card">
    <img src={svg_cat} alt="" className="cat" />

    <div className="row">
      <span className="label">SUPPLY:</span>
      <span className="value">666/10,000</span>
    </div>
    <div className="row">
      <span className="label">MINT PRICE:</span>
      <span className="value">~0.0009 BTC</span>
    </div>
    <div className="row">
      <span className="label">INSCRIPTION:</span>
      <span className="value">~0.0003264 BTC</span>
    </div>


  </div>
</div>