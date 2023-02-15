import frendslinkConfig from '@/config/frendslink.config'
import cx from 'classnames'

export default (props: {light?: boolean}) => {
  return <div className={cx('layout-footer', props.light && 'light')}>
    <div className="left">
      © Scroll Name Service, Inc. All rights reserved.
    </div>
  </div>
}
