import Vue from "vue";
import VueRouter from "vue-router";
import BlogList from "../components/BlogList.vue";
import BlogPosts from "../components/BlogPosts.vue";
import EditForm from "../components/EditForm.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    { path: "/", component: BlogList, name: "blog-list" },
    { path: "/edit", component: EditForm, name: "edit-post" },
    { path: "/post/:id", component: BlogPosts, name: "post", props: true },
  ],
});

export default router;
