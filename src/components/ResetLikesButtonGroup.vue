<template>
  <div class="field has-addons reset-likes">
    <p class="control">
      <span class="button is-fullwidth" @click="$emit('reset-likes')">
        <span class="icon is-small">
          <i class="fas fa-thumbs-up"></i>
        </span>
        <span>Limpar ({{ likes }})</span>
      </span>
    </p>
    <p class="control">
      <span class="button is-fullwidth" @click="$emit('reset-dislikes')">
        <span class="icon is-small">
          <i class="fas fa-thumbs-down"></i>
        </span>
        <span>Limpar ({{ dislikes }})</span>
      </span>
    </p>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { Prop } from 'vue-property-decorator';

  @Component
  export default class ResetLikesButtonGroup extends Vue {
    @Prop({ default: 0}) likes!: number;
    @Prop({ default: 0 }) dislikes!: number;
  }
</script>
<style lang="scss">
  .reset-likes > * {
    flex-grow: 1;
  }
</style>
