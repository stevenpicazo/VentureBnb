import './Footer.css'

const Footer = () => {

    return (
        <div className='footer'>
            <div className='footer-trademark'>
                © 2023 Steven Picazo
            </div>
            <div className='footer-trademark'>
                <i onClick={() => window.open("https://github.com/stevenpicazo", "_blank")} class="fa-brands fa-github footer-icons"></i>
                <i onClick={() => window.open("https://www.linkedin.com/in/steven-picazo-994042225", "_blank")} class="fa-brands fa-linkedin footer-icons"></i>
                <i onClick={() => window.open("https://wellfound.com/u/steven-picazo", "_blank")} class="fa-brands fa-angellist footer-icons"></i>
                <i onClick={() => window.open("https://stevenpicazo.com", "_blank")} class="fa-solid fa-folder-open footer-icons"></i>
            </div>
        </div>
    )
}

export default Footer;