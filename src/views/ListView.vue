<template>
  <div class="list-container">
    <img src="../assets/banner.png" alt="Home banner" />
    <LoadingStatus v-if="loading" />
    <SearchBox @handle-search="handleSearch" />
    <br />
    <p v-if="notFound">
      No movies found.
    </p>
    <ul
      class="list-group"
      v-if="movies.length"
    >
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
      <button
        class="btn btn-link"
        @click="() => handlePageChange(page - 1)"
        :disabled="page < 2"
      >
        Previous
      </button>
      <button
        class="btn btn-link"
        @click="() => handlePageChange(page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { searchMoviesByTitle } from '../client';
  import LoadingStatus from '@/components/LoadingStatus.vue';
  import SearchBox from '@/components/SearchBox.vue';

  const loading = ref(false);
  const notFound = ref(false);
  const page = ref(1);
  const movies = ref([]);
  const s = ref('');

  async function handleSearch(query) {
    if (query) {
      s.value = query;
    }
    
    if (s.value) {
      movies.value = [];
      loading.value = true;
      notFound.value = false;

      const { Search, Error } = await searchMoviesByTitle(s.value, page.value);

      if (Search) {
        movies.value = Search;
      }

      if (Error) {
        notFound.value = true;
      }

      // TODO: good place to consider using vuex - along with loading status
      // localStorage.setItem('movies', JSON.stringify(movies.value));
      // localStorage.setItem('page', page.value);
      // localStorage.setItem('query', query);
      
      loading.value = false;
    } else {
      // TODO: show some error when user tries to search an empty string
    }
  }

  function handlePageChange(pageNumber) {
    page.value = pageNumber;
    handleSearch();
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