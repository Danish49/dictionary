import "./App.css";
import book from "./assets/book.svg";
import sun from "./assets/sun.svg";
import moon from "./assets/moon.svg";
export default function Header() {
  const toggleTheme = () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector("#root").classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      document.querySelector(".theme-switch").src = sun;
    } else {
      document.querySelector(".theme-switch").src = moon;
    }
  };
  return (
    <header className="header">
      <div className="logo">
        <img src={book} alt="" width={"48px"} />
      </div>
      <div onClick={toggleTheme} className="theme-toggler">
        <img className="theme-switch" src={moon} alt="" width={"42px"} />
      </div>
    </header>
  );
}
