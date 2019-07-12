<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { FoodItem } from '../types/food';

@Component
export default class FoodItemList extends Vue {
  @Prop({ default: () => [] }) foodItems!: FoodItem[];
  @Prop({ default: 0 }) total!: number;
}
</script>

<template>
  <div>
    <div class="field">
      <div class="control">
        <input class="input" type="text" placeholder="Filtrar itens..." />
      </div>
    </div>

    <div class="scrollable">
      <p>Exibindo {{ foodItems.length }} de {{ total }} resultados</p>

      <div v-for="food of foodItems" v-bind:key="food.name" class="food-item">
        <h1 class="title is-5">{{ food.name }} ({{ food.price }})</h1>
        <p class="subtitle">
          <span
              v-for="ingr of food.ingredients"
              :key="ingr.name" class="food-ingredient">
            <span :class="{ 'has-text-success': ingr.status === 'like' }">{{ ingr.name }}</span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .food-item {
    padding: 0.25rem;
    margin-bottom: 0.5rem;

    &:hover {
      background-color: #f4f4f4;
    }
  }

  .food-ingredient {
    .has-text-success {
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
</style>
