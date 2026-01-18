import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  // 디바운스 타이머
  const debounceRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // 처음 로딩 시 상태 맞추기

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // 넷플릭스 로고 클릭 시 홈으로 이동하기
  const handleLogoClick = () => {
    navigate("/");
    setSearchValue("");
    window.scrollTo({top: 0, behavior: "smooth"}); // 맨 위로 자연스럽게 올라가기
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  
    if (debounceRef.current) clearTimeout(debounceRef.current);
  
    debounceRef.current = setTimeout(() => {
      // 검색어 비우면 홈으로 이동
      if (value.trim() === "") {
        navigate("/");
      } else {
        navigate(`/search?q=${encodeURIComponent(value)}`);
      }
    }, 200);
  };

  return (
    <nav className={`nav ${show ? "nav_black" : ""}`}>
      <div className="nav_left">
        <img
          className="nav_logo"
          alt="Netflix logo"
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          onClick={handleLogoClick}
        />
      </div>

      <div className="nav_center">
        <input
          className="nav_input"
          value={searchValue}
          onChange={handleChange}
          type="text"
          placeholder="제목, 사람, 장르"
        />
      </div>

      <div className="nav_right">
        <img
          className="nav_avatar"
          alt="User logged"
          src="https://occ-0-3683-993.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
        />
      </div>
    </nav>
  );
}
