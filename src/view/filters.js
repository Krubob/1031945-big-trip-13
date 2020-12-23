export const createFiltersTemplate = (filters) => {
  return `<form class="trip-filters" action="#" method="get">
    ${filters.map((filter)=>{
    return `<div class="trip-filters__filter">
      <input id="filter-${filter.name.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.name}" ${filter.isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${filter.name.toLowerCase()}">${filter.name}</label>
    </div>`;
  }).join(``)}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
};
