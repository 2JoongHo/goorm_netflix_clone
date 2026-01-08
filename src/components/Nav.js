import React, { useEffect, useState } from 'react';
import './Nav.css';

export default function Nav() {

    const [show, setShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            console.log('window.scrollY', window.scrollY);
            if(window.scrollY > 50) {
                setShow(true);
            } else {
                setShow(false);
            }
        });

        return () => {
            window.removeEventListener("scroll", () => {});
        };
    }, [])

    return(
        <nav className={`nav ${show && "nav_black"}`}>
            <img
                alt='Netflix logo'
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                className="nav_logo"
                onClick={() => window.location.reload()}
            />
            <img
                alt="User logged"
                src="https://occ-0-3683-993.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
                className="nav_avatar"
            />
        </nav>
    )
}