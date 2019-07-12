<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import { Ingredient } from '../types/food';

  @Component
  export default class IngredientList extends Vue {
    @Prop({ default: () => [] }) ingredients!: Ingredient[];

    ingredientsFilterText = '';

    get filteredIngredients(): Ingredient[] {
        console.log('filteredIngredients');
        const filterText = this.ingredientsFilterText.toLocaleLowerCase().trim();

        if (!filterText.length) {
            return this.ingredients;
        }

        return this.ingredients.filter((ingr) => ingr.name.includes(filterText));
    }
  }
</script>

<template>
  <div>
    <div class="field">
      <div class="control">
        <input
          v-model="ingredientsFilterText"
          class="input"
          type="text"
          placeholder="Filtrar ingredientes..."
        />
      </div>
    </div>

    <div class="panel scrollable">
      <div class="panel-block" v-for="ingr of filteredIngredients" :key="ingr.name">
        <span
          class="panel-icon ingredient-btn"
          :class="{ 'has-text-success': ingr.status === 'like' }"
          @click="$emit('status-change', ingr, 'like')"
        >
          <i class="fas fa-thumbs-up"></i>
        </span>
        <span
          class="panel-icon ingredient-btn"
          :class="{ 'has-text-danger': ingr.status === 'dislike' }"
          @click="$emit('status-change', ingr, 'dislike')"
        >
          <i class="fas fa-thumbs-down"></i>
        </span>
        <span class="ingredient-name" :title="ingr.name">{{ ingr.name }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .ingredient-btn {
    cursor: pointer;
  }

  .ingredient-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>

