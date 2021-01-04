import {createElement} from "../utils.js";


const createFormPhotosTemplate = ({destionationInfo}) => {
  return `<div class="event__photos-container">
  <div class="event__photos-tape">
  ${destionationInfo.photos.map((photo)=>{
    return `<img class="event__photo" src="${photo}" alt="Event photo"></img>`;
  })}
  </div>
</div>`;
};

export default class FormPhotosView {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate() {
    return createFormPhotosTemplate(this._event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
