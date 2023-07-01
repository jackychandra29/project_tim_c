// di store.js
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  plugins: [
    createPersistedState({
      paths: ['loggedIn', 'user'],
    }),
  ],
  state: {
    loggedIn: false,
    user: [],
  },
  mutations: {
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    setUser(state, user) {
      state.user = user;
    },
    logout(state) {
      state.loggedIn = false;
      state.user = null;
    },
  },
  getters: {
    user: state => state.user,
  },
});

export default store;
