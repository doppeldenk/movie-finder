<template>
  <div
    class="spinner-border text-primary"
    role="status"
  >
    <span
      class="visually-hidden"
    >
      Loading...
    </span>
  </div>
</template>

<script>
  export default {
    name: 'LoadingStatus',
  }
</script>

<style scoped>
  div {
    left: 1rem;
    position: fixed;
    top: 1rem;
  }
</style>