import { FoodItem } from './../types/food';

function foodItemSortFunc(first: FoodItem, second: FoodItem) {

  return first.name.localeCompare(second.name);
}
