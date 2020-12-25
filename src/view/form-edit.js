import {createAvailableOfferTemplate} from "./available-offers";
import {createFormHeaderTemplate} from "./form-header";

export const createFormEditTemplate = ({type, destionation, startTime, endTime, cost, options, destionationInfo}) => {
  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
    ${createFormHeaderTemplate(type, destionation, cost, startTime, endTime)}
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createAvailableOfferTemplate(options)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destionationInfo.description}</p>
      </section>
    </section>
  </form>
</li>`;
};
