function AboutProject() {
  return (
    <div className="about-project" id="about-project">
      <div className="about-project__container">
        <h2 className="about-project__header">О проекте</h2>
        <div className="about-project__two-columns">
          <div className="about-project__column">
            <h3 className="about-project__subheader">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__column">
            <h3 className="about-project__subheader">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__timeline">
          <div className="about-project__timeline-part about-project__timeline-part_color_black">
            <p className="about-project__timeline-text about-project__timeline-text_color_white">
              1 неделя
            </p>
          </div>
          <div className="about-project__timeline-part about-project__timeline-part_color_gray">
            <p className="about-project__timeline-text about-project__timeline-text_color_black">
              4 недели
            </p>
          </div>
        </div>
        <div className="about-project__timeline-description">
          <p className="about-project__description about-project__description_back">
            Back-end
          </p>
          <p className="about-project__description about-project__description_front">
            Front-end
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutProject;
