import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import router from "./router";
import "../src/assets/main.scss";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    posts: [],
  },
  mutations: {
    addPost(state, post) {
      state.posts.push(post);
      const posts_arr = localStorage.getItem("posts");
      const existing_posts = posts_arr ? JSON.parse(posts_arr) : [];

      existing_posts.push(post);
      localStorage.setItem("posts", JSON.stringify(existing_posts));
    },
  },
});

new Vue({
  store: store,
  router,
  render: (h) => h(App),
}).$mount("#app");
