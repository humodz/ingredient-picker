<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';
  import { Ingredient } from '../types/food';
  import ResetLikesButtonGroup from './ResetLikesButtonGroup.vue';

  @Component({
    components: { ResetLikesButtonGroup },
  })
  export default class IngredientList extends Vue {
    @Prop({ default: () => [] }) ingredients!: Ingredient[];
    @Prop({ default: 0}) likes!: number;
    @Prop({ default: 0 }) dislikes!: number;

    ingredientsFilterText = '';

    get filteredIngredients(): Ingredient[] {
        const filterText = this.ingredientsFilterText.toLocaleLowerCase().trim();

        if (!filterText.length) {
            return this.ingredients;
        }

        return this.ingredients.filter((ingr) => ingr.name.includes(filterText));
    }
  }
</script>

<template>
  <div class="ingredient-list">
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

    <ResetLikesButtonGroup
      :likes="likes"
      :dislikes="dislikes"
      @reset-likes="$emit('reset-likes')"
      @reset-dislikes="$emit('reset-dislikes')"
    ></ResetLikesButtonGroup>

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
        <span class="food-count">({{ ingr.foodCount }})</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import "bulma/sass/utilities/initial-variables.sass";

  .ingredient-list .scrollable {
    max-height: calc(100vh - 8rem - 4rem - 1px - 3rem);
  }

  .ingredient-btn {
    cursor: pointer;
  }

  .ingredient-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &::first-letter {
      text-transform: uppercase;
    }
  }

  .food-count {
    white-space: nowrap;
    margin-left: auto;
    color: hsl(0, 0%, 40%);
    font-size: 0.75rem;
  }
</style>

