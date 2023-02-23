<template>
  <div>
    <LoadingStatus v-if="!movie.Title" />
    <div class="container" v-if="movie.Title">
      <div class="row align-items-start">
        <div class="col text-center">
          <img
            :src="movie.Poster"
            :alt="movie.Title"
          />
        </div>
        <div class="col">
          <h1>{{ movie.Title }}</h1>
          <p>{{ movie.Year }}</p>
          <p>{{ movie.Runtime }}</p>
          <p>{{ movie.Genre }}</p>
        </div>
      </div>
      <br />
      <p>
        {{ movie.Plot }}
      </p>
      <button class="btn btn-secondary" @click="$router.back()">Go back</button>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router'
  import LoadingStatus from '@/components/LoadingStatus.vue';

  import { getMovieById } from '../client';

  const route = useRoute();

  const movie = ref({});

  onMounted(async () => {
    const imdbID = route.params.imdbID;
    const response = await getMovieById(imdbID);
    movie.value = response;
  });
</script>

<style lang="scss" scoped>
  img {
    max-height: 15rem;
  }
</style>