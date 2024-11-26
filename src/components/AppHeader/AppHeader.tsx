import appLogo from "../../assets/images/icons/logo.svg"
import "./app-header.scss"

const AppHerader = () => {
  return (
    <header className="app-header">
      <img src={appLogo} className="app-header__logo" alt="App logo"/>
    </header>
  );
}

export default AppHerader;
