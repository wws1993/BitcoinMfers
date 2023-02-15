import frendslinkConfig from '@/config/frendslink.config'
import classNames from 'classnames'

export default (props: {light?: boolean}) => {

  return <div className={classNames('layout-header', props.light && 'light')}>
    <div className="left">
      <div className='logo'>
        LOGO
        {/* <img src={logo} width="100%" /> */}
      </div>
      <span className="link">CONTENTS</span>
    </div>

    <div className="right">
      <span className="link" onClick={() => window.open(frendslinkConfig.document)}>What is SNS?</span>
      <span className="link" onClick={() => window.open(frendslinkConfig.faqs)}>FAQS</span>
      <span className="link" onClick={() => window.open(frendslinkConfig.document)}>Docs</span>
    </div>
  </div>
}
