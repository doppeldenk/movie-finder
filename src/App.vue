<template>
  <div class="container-md">
    <router-view/>
  </div>
</template>

<style lang="scss">
  body {
    background-color: #fafafa;
  }
  .container-md {
    margin-top: 1rem;
  }
  @media (min-width: 992px) {
    .container-md {
      max-width: 50vw;
    }
  }
</style>