<script lang="ts">
import { LikeStatus, Ingredient, FoodItem } from './types/food';
import { Component, Vue, Prop } from 'vue-property-decorator';
import data from './util/monte-carlo.json';
import IngredientList from './components/IngredientList.vue';
import FoodItemList from './components/FoodItemList.vue';
import Tabs from './components/Tabs.vue';

@Component({
  components: { IngredientList, FoodItemList, Tabs },
})
export default class App extends Vue {
  ingredients: Ingredient[];
  foodItems: FoodItem[];

  likedIngredientCount = 0;
  dislikedIngredientCount = 0;

  filteredFoodItems: FoodItem[] = [];

  constructor() {
    super();
    this.ingredients = data.ingredients.sort().map<Ingredient>((ingr) => ({ name: ingr, status: 'neutral' }));

    const allIngredientsMap = new Map<string, Ingredient>();

    for (const ingr of this.ingredients) {
      allIngredientsMap.set(ingr.name, ingr);
    }

    this.foodItems = data.items
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(item => ({
        name: item.name,
        price: item.price,
        ingredients: item.ingredients.map(ingrName => allIngredientsMap.get(ingrName) as Ingredient),
      }));

    this.filteredFoodItems = this.foodItems;
    console.log(this);
  }

  toggleStatus(ingr: Ingredient, what: 'like' | 'dislike') {
    if (what === 'like' && ingr.status !== 'like') {
      this.likedIngredientCount++;
    } else if (ingr.status === 'like') {
      this.likedIngredientCount--;
    }

    if (what === 'dislike' && ingr.status !== 'dislike') {
      this.dislikedIngredientCount++;
    } else if (ingr.status === 'dislike') {
      this.dislikedIngredientCount--;
    }

    console.log('toggleStatus', this.likedIngredientCount);
    ingr.status = (ingr.status === what) ? 'neutral' : what;
    this.filteredFoodItems = this.filterFoodItems();
  }

  public filterFoodItems(): FoodItem[] {
    console.log('filterFoodItems');

    if (this.likedIngredientCount === 0 && this.dislikedIngredientCount === 0) {
      return this.foodItems;
    }

    return this.foodItems.filter((item) => {
      let shouldShow = (this.likedIngredientCount === 0);
      for (const ingr of item.ingredients) {
        if (ingr.status === 'dislike') {
          return false;
        } else if (ingr.status === 'like') {
          shouldShow = true;
        }
      }

      return shouldShow;
    });
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="box">
        <Tabs></Tabs>

        <div class="columns">
          <div class="column is-4">
            <IngredientList
              :ingredients="ingredients"
              @status-change="(ingr, status) => toggleStatus(ingr, status)"
            ></IngredientList>
          </div>
          <div class="column">
            <FoodItemList
              :foodItems="filteredFoodItems"
              :total="foodItems.length"
            ></FoodItemList>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
</style>
