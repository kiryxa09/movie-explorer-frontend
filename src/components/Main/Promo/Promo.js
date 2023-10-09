import React from "react";
import landingLogoPath from "../../../images/landing_logo.svg"

function Promo(props) {
  return(
    <div className="promo">
      <img className="promo__image" src={landingLogoPath} alt="практикум лого" />
      <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
    </div>
  );
}

export default Promo;