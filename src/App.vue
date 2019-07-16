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

  sortedFoodItems: FoodItem[] = [];

  constructor() {
    super();
    this.ingredients = data.ingredients.sort().map<Ingredient>((ingr) => ({
      name: ingr,
      status: 'neutral',
      foodCount: 0,
    }));

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

    for (const item of this.foodItems) {
      for (const ingr of item.ingredients) {
        ingr.foodCount++;
      }
    }

    this.sortedFoodItems = this.foodItems;
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

    ingr.status = (ingr.status === what) ? 'neutral' : what;
    this.sortedFoodItems = this.sortFoodItems();
  }

  resetStatus(what: 'like' | 'dislike') {
    if (what === 'like') {
      this.likedIngredientCount = 0;
    } else {
      this.dislikedIngredientCount = 0;
    }

    for (const ingr of this.ingredients) {
      if (ingr.status === what) {
        ingr.status = 'neutral';
      }
    }

    this.sortedFoodItems = this.sortFoodItems();
  }

  public sortFoodItems(): FoodItem[] {
    function countStatuses(item: FoodItem) {
      const r = { like: 0, dislike: 0, neutral: 0};

      for (const ingr of item.ingredients) {
        r[ingr.status]++;
      }

      return r;
    }

    const strCmpOptions = { numeric: true, sensitivity: 'base' };

    return Array.from(this.foodItems).sort((first, second) => {
        const firstCount = countStatuses(first);
        const secondCount = countStatuses(second);

        const noDislikesFirst = +(firstCount.dislike > 0) - +(secondCount.dislike > 0);
        const moreLikesFirst = secondCount.like - firstCount.like;
        const lessDislikesFirst = firstCount.dislike - secondCount.dislike;
        const orderAtoZ = first.name.localeCompare(second.name, undefined, strCmpOptions);

        return noDislikesFirst || moreLikesFirst || lessDislikesFirst || orderAtoZ;
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
              :likes="likedIngredientCount"
              :dislikes="dislikedIngredientCount"
              @status-change="(ingr, status) => toggleStatus(ingr, status)"
              @reset-likes="resetStatus('like')"
              @reset-dislikes="resetStatus('dislike')"
            ></IngredientList>
          </div>
          <div class="column">
            <FoodItemList
              :foodItems="sortedFoodItems"
            ></FoodItemList>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
</style>
