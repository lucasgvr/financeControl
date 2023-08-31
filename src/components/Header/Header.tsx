import logoImg from 'assets/logo.svg'
import profileImg from 'assets/profile.jpeg'
import arrowDownIcon from 'assets/arrow-down.svg'

import { NavLink } from 'react-router-dom'

import './Header.scss'

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
                        <NavLink to='/transactions'>Transactions</NavLink>
                    </div>
                </div>
                <div className='profile'>
                    <img src={profileImg} alt="Profile Image" className='profilePicture'/>
                    <img src={arrowDownIcon} alt="Arrow Down Icon" className='icon' />
                </div>
        </div>
    )
}

export default Header