<template>
  <div class="list-container">
    <img src="../assets/banner.png" alt="Home banner" />
    <LoadingStatus v-if="loading" />
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
        @click="handleSearch"
      >
        Search
      </button>
    </div>
    <br />
    <div
      class="alert alert-warning"
      role="alert"
      v-if="emptyError"
    >
      Oops! Make sure you input some text before hitting that Search button :)
    </div>

    <ul class="list-group">
      <li 
      class="list-group-item"
      role="button"
      v-for="movie in movies"
      v-bind:key="movie.imdbID"
      @click="$router.push(`/movies/${movie.imdbID}`)"
      >
        {{ movie.Title }}
      </li>
    </ul>
    <br />
    <div
      class="d-flex justify-content-between"
      v-if="movies.length"
    >
      <button class="btn btn-link" @click="() => handlePageChange(page - 1)">Previous</button>
      <button class="btn btn-link" @click="() => handlePageChange(page + 1)">Next</button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { searchMoviesByTitle } from '../client';
  import LoadingStatus from '@/components/LoadingStatus.vue';

  const lastStoredSearch = localStorage.getItem('movies');
  const lastStoredPage = localStorage.getItem('page');
  const lastStoredQuery = localStorage.getItem('query');

  const query = ref(lastStoredQuery);
  const loading = ref(false);
  const emptyError = ref(false);
  const page = ref(lastStoredPage);
  const movies = ref(JSON.parse(lastStoredSearch) || []);

  async function handleSearch() {
    if (query.value) {
      emptyError.value = false;
      loading.value = true;

      const response = await searchMoviesByTitle(query.value, page.value);

      movies.value = response.Search;

      // TODO: good place to consider using vuex - along with loading status
      localStorage.setItem('movies', JSON.stringify(movies.value));
      localStorage.setItem('page', page.value);
      localStorage.setItem('query', query.value);
      
      loading.value = false;
    } else {
      emptyError.value = true;
    }
  }

  function handlePageChange(pageNumber) {
    page.value = pageNumber > 0 ? pageNumber : 1;
    pageNumber > 0 && handleSearch();
  }
</script>

<style lang="scss" scoped>
  .list-container {
    margin-bottom: 3rem;
  }
  img {
    border-radius: .5rem;
    margin-bottom: 2rem;
    width: 100%;
  }
  li {
    cursor: pointer;
    &:hover {
      background-color: aliceblue;
    }
  }
</style>