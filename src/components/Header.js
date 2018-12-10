import React from 'react';
import { Link } from  'react-router-dom'
import logo from '../assets/images/logos/logo-top@2x.png'
import menuIcon from '../assets/images/icons/icon-menu.svg'
import menuOpenIcon from '../assets/images/icons/icon-close.svg'
import { Wallet } from './Wallet'
import { DailyQuotaModal } from './DailyQuotaModal'
import { inject, observer } from 'mobx-react/index'
import yn from 'yn'

const getMobileMenuLinks = (onMenuToggle, withoutEvents) =>
  (<div className="links_container_mobile">
    {withoutEvents ? null :
      <Link to='/events' className="link" onClick={onMenuToggle}>
        <i className="icon_events" /><span className='link_text'>Events</span>
      </Link>
    }
    <Link to='/status' className="link" onClick={onMenuToggle}>
      <i className="icon_status" /><span className='link_text'>Status</span>
    </Link>
    <Link to='/statistics' className="link" onClick={onMenuToggle}>
      <i className="icon_statistics" /><span className='link_text'>Statistics</span>
    </Link>
  </div>)


@inject("RootStore")
@observer
export class Header  extends React.Component {
  render () {
    const { showMobileMenu, onMenuToggle, RootStore: { alertStore, web3Store } } = this.props
    const { REACT_APP_HOME_WITHOUT_EVENTS: HOME, REACT_APP_FOREIGN_WITHOUT_EVENTS: FOREIGN } = process.env
    const withoutEvents = web3Store.metamaskNet.id === web3Store.homeNet.id.toString() ? yn(HOME) : yn(FOREIGN)
    return (
      <header className="header">
        {showMobileMenu && (<div className="header-mobile-menu-container">{getMobileMenuLinks(onMenuToggle, withoutEvents)}</div>)}
        <div className="container">
          <Link to="/" onClick={showMobileMenu ? onMenuToggle : null}><img className="header-logo" src={logo}
                                                                           alt=""/></Link>
          <div className="links_container">
            {withoutEvents ? null :
              <Link to='/events' className="link">
                <i className="icon_events"/><span className='link_text'>Events</span>
              </Link>
            }
            <Link to='/status' className="link">
              <i className="icon_status"/><span className='link_text'>Status</span>
            </Link>
            <Link to='/statistics' className="link">
              <i className="icon_statistics"/><span className='link_text'>Statistics</span>
            </Link>
            <Wallet/>
          </div>
          <div className="mobile-menu">
            <img onClick={onMenuToggle} className={showMobileMenu ? 'mobile-menu-open-icon' : 'mobile-menu-icon'}
                 src={showMobileMenu ? menuOpenIcon : menuIcon} alt=""/>
          </div>
        </div>
        {alertStore && alertStore.showDailyQuotaInfo && <DailyQuotaModal/>}
      </header>
    )
  }
}
