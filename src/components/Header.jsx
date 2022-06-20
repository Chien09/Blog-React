import {Link} from 'react-router-dom'; //similar to <a></a> tag but works with "Router"
import lines from '../assets/lines.png'; //import image

function Header(){
    return (
        <header>
            <nav className="navbar navbar-default navCustom ">
                <div className="container">
                    <div className="navbar-header">
                        <p className="navbar-brand cursive-font"><b>Daily Blog</b></p>
                    </div>
                    <img className="nav-linesimage" src={lines} alt="Lines"/>
                    <ul className="nav navbar-nav">
                        {/* Instead of using a tag <a href="/about"></a> use react Link, styles appiled on <a> will be appiled on <Link>*/}
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/postblog">POST</Link></li>
                        <li><Link to="/about">ABOUT</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header; 