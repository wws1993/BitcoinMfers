import svg_dc from '@/assets/svg/dc.svg'
import svg_twitter from '@/assets/svg/twitter.svg'
import svg_search from '@/assets/svg/search.svg'
import svg_arrowDown from '@/assets/svg/arrowDown.svg'

import frendslinkConfig from '@/config/frendslink.config'
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'

type NFT = {
  id: string;
  color: string;
  link: string;
  ReportInaccuracyLink: string;
  activeSteps: 1|2|0
}

export default () => {
  const [lists, setLists] = useState<NFT[]>([])
  const [states, setStates] = useState<{sortBy: string; isShowId: boolean; activeNFT?: NFT}>({
    sortBy: 'Random',
    isShowId: false,
    activeNFT: undefined,
  })
  const [steps, setSteps] = useState<{t: React.ReactNode, d: React.ReactNode}[]>([
    {t: 'Minted', d: <>View inscription #20407<br />The first byte-perfect upload of this punk.</>},
    {t: 'Missed', d: <>View inscription #20407<br />The first byte-perfect upload of this punk.</>},
    {t: 'No additional mint attempts', d: <>Recent mint attempts may take time to appear</>},
  ])

  const queryNext = () => {
    setLists([...lists, ...new Array(60).fill(null).map(() => {
      const id = Math.random().toString().slice(3, 9)
      const nft: NFT = {
        id,
        color: `#${id}`,
        link: frendslinkConfig.faqs,
        ReportInaccuracyLink: 'www.hao123.com',
        activeSteps: Math.floor(Math.random() * 2) as 1
      }

      return nft
    })])
  }

  useEffect(() => {
    queryNext()
  }, [])

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
      <span className='lable'>Short By:</span>
      <div className="select">
        <span>{ states.sortBy }</span>
        <img src={svg_arrowDown} alt="" />
        <p className="options">
          <span onClick={() => setStates({...states, sortBy: 'Random'})}>Random</span>
          <span onClick={() => setStates({...states, sortBy: 'Random1'})}>Random1</span>
          <span onClick={() => setStates({...states, sortBy: 'Random2'})}>Random2</span>
        </p>
      </div>
      <div className="input">
        <img src={svg_search} alt=""/>
        <input type="text" placeholder='Search mfers ID' />
      </div>
      <span className='lable'>Show IDs</span>
      <span
        className={classNames('switch', states.isShowId && 'active')}
        onClick={() => setStates({...states, isShowId: !states.isShowId})}
      ></span>
    </div>
    <div className='icons'>
      {lists.map((item, idx) => <div
        key={idx}
        className='icons-item'
        style={{background: item.color}}
        data-id={item.id}
      >
        <span className='id'>#{item.id}</span>
        <span className='footer'>
          <span onClick={() => setStates({...states, activeNFT: item})}>ORDS</span>
          <span onClick={() => window.open(item.link)}>PFP</span>
        </span>
      </div>)}
    </div>
    {/* dialog */}
    <div className={classNames('dialog', !!states.activeNFT && 'active')} onClick={() => setStates({...states, activeNFT: undefined})}>
      <div className="dialog-body" onClick={ev => ev.stopPropagation()}>
        <section className="header">
          <span className="id">#{states.activeNFT?.id}</span>
          <span className='button'>Report Inaccuracy</span>
        </section>

        <section className="body">
          <div className="nft" style={{background: states.activeNFT?.color}}></div>

          <div className="steps">
            {steps.map((item, idx) => <div
              key={idx}
              className={classNames(
                'steps-item',
                (states.activeNFT?.activeSteps || 0) >= idx && 'active',
                (states.activeNFT?.activeSteps || 0) == idx && 'current',
              )}
            >
              <p className="steps-item-title">{item.t}</p>
              <p className="steps-item-desc">{item.d}</p>
            </div>)}
          </div>
        </section>
      </div>
    </div>
  </div>
}