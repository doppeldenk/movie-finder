<template>
  <div>
    <div class="d-flex">
      <input
        type="text"
        class="form-control"
        placeholder="Find movies by title..."
        v-model="query"
      />
  
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  
      <button
        class="btn btn-primary"
        @click="$emit('handleSearch', query)"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const query = ref('');
</script>