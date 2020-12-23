export const createTabsTemplate = (tabs) => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${tabs.map((tab)=>{
    return `<a class="trip-tabs__btn  ${tab.isActive ? `trip-tabs__btn--active` : ``}" href="#">${tab.name}</a>`;
  }).join(``)}
</nav>`;
};
