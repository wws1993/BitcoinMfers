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
  </div>
}