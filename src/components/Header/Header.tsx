import { NavLink } from 'react-router-dom'

import './Header.scss'

import logoImg from 'assets/logo.svg'
import arrowDownIcon from 'assets/arrow-down.svg'

const Header: React.FC = () => {
    return (
        <div id="header">
                <div className='wrapper'>
                    <div className='logo'>
                        <img src={logoImg} alt="Logo Image" />
                        <h1>Finance<span>Control</span></h1>
                    </div>
                    <div className='links'>
                        <NavLink to='/dashboard'>Dashboard</NavLink>
                        <NavLink to='/transactions'>Transações</NavLink>
                    </div>
                </div>
                <div className='profile'>
                    <img src='https://avatars.githubusercontent.com/lucasgvr' alt="Profile Image" className='profilePicture'/>
                    <img src={arrowDownIcon} alt="Arrow Down Icon" className='icon' />
                </div>
        </div>
    )
}

export default Header