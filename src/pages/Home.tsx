import svg_dc from '@/assets/svg/dc.svg'
import svg_twitter from '@/assets/svg/twitter.svg'
import frendslinkConfig from '@/config/frendslink.config'

export default () => {

  return <div className="Home">
    <div className="logo"></div>
    <div className="title">
      <span>mfers</span>
      <img className='icon' src={svg_dc} alt="svg_dc" onClick={() => window.open(frendslinkConfig.discord)} />
      <img className='icon' src={svg_twitter} alt="svg_twitter" onClick={() => window.open(frendslinkConfig.twitter)} />
    </div>
    <p className='subtitle'>The first 10k NFT collection on Bitcoin</p>
    <button className='btn'>Verified Listings</button>
    <p className='minte'>10000 / 10000 minted!</p>
    <div className='explain'>
      <p>Bitcoin Punks are the first byte-perfect uploads of the <a href="https://www.larvalabs.com/cryptopunks">original Ethereum CryptoPunks</a> onto the Bitcoin Blockchain using <a href="https://ordinals.com/">Ordinals</a>.</p>
      <p>To make this site, we are checking the hash of every image uploaded to Ordinals and comparing it against the original 10k punk images. The links to Bitcoin Punks are the first-seen inscriptions (lowest ID) that contain these hashes on Ordinals.</p>
    </div>
    <div className='filters'>
      <div className='filter-item'>
        <span className='lable'>Short By:</span>
        <select className='select'>
          <option value="1">Randam</option>
        </select>
      </div>
      <input type="text" placeholder='Search mfers ID' />
      <div className='filter-item'>
        <span className='lable'>Show IDs</span>
        <span className='my-switch'></span>
      </div>
    </div>
    <div className='icons-grid'>
      <div className='grid'>1</div>
      <div className='grid'>2</div>
      <div className='grid'>3</div>
      <div className='grid'>3</div>
      <div className='grid'>3</div>
      <div className='grid'>1</div>
      <div className='grid'>2</div>
      <div className='grid'>3</div>
      <div className='grid'>3</div>
      <div className='grid'>3</div>
      <div className='grid'>1</div>
      <div className='grid'>2</div>
      <div className='grid'>3</div>
      <div className='grid'>3</div>
      <div className='grid'>3</div>
    </div>
  </div>
}