export const createFormPhotosTemplate = (photos) => {
  return `<div class="event__photos-container">
  <div class="event__photos-tape">
  ${photos.map((photo)=>{
    return `<img class="event__photo" src="${photo}" alt="Event photo"></img>`;
  })}
  </div>
</div>`;
};
