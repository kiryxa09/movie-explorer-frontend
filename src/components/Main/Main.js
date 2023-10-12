import React from "react";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import Portfolio from "../Portfolio/Portfolio";
import NavTab from "../NavTab/NavTab";
import AboutProject from "../AboutProject/AboutProject";
import AboutMe from "../AboutMe/AboutMe";
import Header from "../Header/Header"
import Footer from "../Footer/Footer";


function Main() {
  return(
    <main className="main">
      <Header />
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </main>
  );
}

export default Main;