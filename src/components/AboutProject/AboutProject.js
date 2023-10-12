

function AboutProject() {
  return(
    <div className="aboutProject" id="aboutProject">
      <div className="aboutProject__container">
        <h2 className="aboutProject__header">О проекте</h2>
        <div className="aboutProject__two-columns">
          <div className="aboutProject__column">
            <h3 className="aboutProject__subheader">Дипломный проект включал 5 этапов</h3>
            <p className="aboutProject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="aboutProject__column">
            <h3 className="aboutProject__subheader">На выполнение диплома ушло 5 недель</h3>
            <p className="aboutProject__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="aboutProject__timeline">
          <div className="aboutProject__timeline-part aboutProject__timeline-part_color_black">
            <p className="aboutProject__timeline-text aboutProject__timeline-text_color_white">1 неделя</p>
          </div>
          <div className="aboutProject__timeline-part aboutProject__timeline-part_color_gray">
            <p className="aboutProject__timeline-text aboutProject__timeline-text_color_black">4 недели</p>
          </div>
        </div>
        <div className="aboutProject__timeline-description">
          <p className="aboutProject__description aboutProject__description_back">Back-end</p>
          <p className="aboutProject__description aboutProject__description_front">Front-end</p>
        </div>
      </div>
    </div>
  );
}

export default AboutProject;