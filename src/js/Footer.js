import React from 'react';

const socialLinks = [{
    id: 'github',
    url: 'https://github.com/windcoinplatform/'
}, {
    id: 'twitter',
    url: 'https://github.com/windcoinplatform'
}, {
    id: 'facebook',
    url: 'https://github.com/windcoinplatform/'
}, {
    id: 'discord',
    url: 'https://github.com/windcoinplatform'
}, {
    id: 'telegram',
    url: 'https://github.com/windcoinplatform'
}, {
    id: 'reddit',
    url: 'https://github.com/windcoinplatform/'
}];

const Footer = ({version}) => {
    return (
        <div className="menu-footer">
            <div>Version</div>
            <div>WIND Team</div>
            <div>
                {socialLinks.map(item =>
                    (<a key={item.id} className={`social ${item.id}`} href={item.url} target="_blank"></a>))}
            </div>
            <div>
                <a className="fade" href="http://144.91.84.27/:60863" target="_blank">WINDWALLET</a>
            </div>
        </div>
    );
}

export default Footer;
