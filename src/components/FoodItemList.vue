<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FoodItem, Ingredient } from '../types/food';

function ingredientHighlight(ingr: Ingredient) {
  return {
    'has-text-success': ingr.status === 'like',
    'has-text-danger': ingr.status === 'dislike',
  };
}

function muteIfDisliked(item: FoodItem) {
  let hasLike = false;
  let hasDislike = false;

  for (const ingr of item.ingredients) {
    if (ingr.status === 'like') {
      hasLike = true;
    } else if (ingr.status === 'dislike') {
      hasDislike = true;
    }
  }

  return { muted: hasDislike && !hasLike };
}

@Component({
  filters: {
    ingredientHighlight,
    muteIfDisliked,
  },
})
export default class FoodItemList extends Vue {
  @Prop({ default: () => [] }) foodItems!: FoodItem[];

  foodItemFilterText = '';

  get filteredFoodItems() {
    if (this.$refs.foodItemList) {
      (this.$refs.foodItemList as Element).scrollTo(0, 0);
    }

    if (!this.foodItemFilterText) {
      return this.foodItems;
    }

    function normalize(text: string) {
      return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    }

    const searchTerms = normalize(this.foodItemFilterText).split(/\s/).filter(Boolean);

    return this.foodItems.filter(item => {
      const name = normalize(item.name);
      return searchTerms.every(searchTerm => name.includes(searchTerm));
    });
  }
}
</script>

<template>
  <div class="food-item-list">
    <div class="field">
      <div class="control">
        <input
          v-model="foodItemFilterText"
          class="input"
          type="text"
          placeholder="Filtrar itens..."
        />
      </div>
    </div>

    <div class="scrollable" ref="foodItemList">
      <p>Exibindo {{ filteredFoodItems.length }} de {{ foodItems.length }} resultados</p>

      <div v-for="food of filteredFoodItems" v-bind:key="food.name" class="food-item" :class="food | muteIfDisliked">
        <h1 class="title is-5">{{ food.name }} ({{ food.price }})</h1>
        <p class="subtitle">
          <span
              v-for="ingr of food.ingredients"
              :key="ingr.name" class="food-ingredient">
            <span :class="ingr | ingredientHighlight">{{ ingr.name }}</span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .muted {
    opacity: 0.5;
  }

  .food-item-list .scrollable {
    max-height: calc(100vh - 8rem - 4rem - 1px);
  }

  .food-item {
    padding: 0.25rem;
    margin-bottom: 0.5rem;

    &:hover {
      background-color: #f4f4f4;
    }

    .subtitle::first-letter {
      text-transform: uppercase;
    }

    .food-ingredient {
      .has-text-success {
        text-decoration: underline;
      }

      .has-text-danger {
        text-decoration: underline;
      }

      &:not(:first-child) {
        &::before {
          content: ", ";
        }

        &:last-child::before {
          content: " e ";
        }
      }
    }
  }
</style>
