import AbstractView from "./abstract.js";

const createFormPhotosTemplate = ({destination}) => {
  return `<div class="event__photos-container">
  <div class="event__photos-tape">
  ${destination.info.photos.map((photo)=>{
    return `<img class="event__photo" src="${photo}" alt="Event photo"></img>`;
  })}
  </div>
</div>`;
};

export default class FormPhotosView extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    return createFormPhotosTemplate(this._event);
  }
}
