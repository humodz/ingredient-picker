<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Tabs extends Vue {

}
</script>

<template>
  <div class="tabs is-fullwidth">
    <ul>
      <li>
        <a>
          <!-- <span class="icon">
            <i class="fas fa-angle-left" aria-hidden="true"></i>
          </span> -->
          <span>Início</span>
        </a>
      </li>
      <li>
        <a>
          <!-- <span class="icon">
            <i class="fas fa-angle-up" aria-hidden="true"></i>
          </span> -->
          <span>Filtrar</span>
        </a>
      </li>
      <li>
        <a>
          <span>Sobre</span>
          <!-- <span class="icon">
            <i class="fas fa-angle-right" aria-hidden="true"></i>
          </span> -->
        </a>
      </li>
    </ul>
  </div>
</template>
