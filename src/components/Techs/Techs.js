

function Techs() {
  return(
    <div className="techs" id="techs">
      <div className="techs__container">
        <h2 className="techs__header">Технологии</h2>
        <h3 className="techs__subheader">7 технологий</h3>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className="techs__list">
          <div className="techs__tech-container">
            <p className="techs__tech-name">HTML</p>
          </div>
          <div className="techs__tech-container">
            <p className="techs__tech-name">CSS</p>
          </div>
          <div className="techs__tech-container">
            <p className="techs__tech-name">JS</p>
          </div>
          <div className="techs__tech-container">
            <p className="techs__tech-name">React</p>
          </div>
          <div className="techs__tech-container">
            <p className="techs__tech-name">Git</p>
          </div>
          <div className="techs__tech-container">
            <p className="techs__tech-name">Express.js</p>
          </div>
          <div className="techs__tech-container">
            <p className="techs__tech-name">mongoDB</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Techs;