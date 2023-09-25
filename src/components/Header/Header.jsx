import './Header.css';
import HeaderLeft from './HeaderLeft';
import HeaderMid from './HeaderMid';
import HeaderRight from './HeaderRight';

const Header=()=> {
  return <header className='header'>
    <HeaderLeft/>
    <HeaderMid/>
    <HeaderRight/>
  </header>
}

export default Header;