

function AboutProject() {
  return(
    <div className="aboutproject" id="aboutproject">
      <div className="aboutproject__container">
        <div className="aboutproject__header-container">
          <h2 className="aboutproject__header">О проекте</h2>
        </div>
        <div className="aboutproject__two-columns">
          <div className="aboutproject__column">
            <h3 className="aboutproject__subheader">Дипломный проект включал 5 этапов</h3>
            <p className="aboutproject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="aboutproject__column">
            <h3 className="aboutproject__subheader">На выполнение диплома ушло 5 недель</h3>
            <p className="aboutproject__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="aboutproject__timeline">
          <div className="aboutproject__timeline_color_black">
            <p className="aboutproject__timeline__text aboutproject__timeline__text_color_white">1 неделя</p>
          </div>
          <div className="aboutproject__timeline_color_gray">
            <p className="aboutproject__timeline__text aboutproject__timeline__text_color_black">4 недели</p>
          </div>
        </div>
        <div className="aboutproject__dev">
          <p className="aboutproject__dev_back">Back-end</p>
          <p className="aboutproject__dev_front">Front-end</p>
        </div>
      </div>
    </div>
  );
}

export default AboutProject;