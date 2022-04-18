import {Link} from 'react-router-dom'; //similar to a tag but works with "Router"

function Header(){
    return (
        <header>
            <nav className="navbar navbar-default navCustom ">
                <div className="container">
                    <div className="navbar-header">
                        <p className="navbar-brand"><b>Anniversary Blog</b></p>
                    </div>
                    <ul className="nav navbar-nav">
                        {/* Instead of using a tag <a href="/about">About</a> we use react Link*/}
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