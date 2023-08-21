<template>
  <div class="single_post_layout">
    <div class="post" v-if="!editing">
      <section class="header_section">
        <h1 class="post_header">Заголовок:</h1>
        <h3 class="post_name_header">
          {{ post.name }}
        </h3>
      </section>
      <hr class="hr" />
      <section class="intro_section">
        <h2 class="post_description_header">Краткое описание:</h2>
        <p class="post_description_text">
          {{ post.intro }}
        </p>
      </section>
      <hr class="hr" />
      <section class="description_section">
        <h2 class="post_full_header">Описание поста:</h2>
        <p class="post_full_description">
          {{ post.description }}
        </p>
      </section>
      <hr class="hr" />

      <div class="post_footer">
        <p class="adding_date">
          {{ reverseDate(post.date) }}
        </p>
        <button class="edit_btn" @click="editPost">Редактировать пост</button>
        <p class="commentaries_value"></p>
        <router-link :to="{ name: 'blog-list' }">
          <button class="back_to_blog">Вернуться к постам</button>
        </router-link>
      </div>
    </div>
    <!-- <div class="edit_post" v-if="editing">
      <h2 class="edit_header">Редактирование поста</h2>
      <form class="edit_form" @submit.prevent="saveEdit">
        <div class="edit_name_section">
          <label class="">Заголовок:</label>
          <input v-model="editedPost.name" required />
        </div>
        <div class="edit_intro_section">
          <label>Краткое описание:</label>
          <textarea v-model="editedPost.intro" required></textarea>
        </div>
        <div class="edit_description_section">
          <label>Описание поста:</label>
          <textarea v-model="editedPost.description" required></textarea>
        </div>
        <button type="submit">Сохранить изменения</button>
      </form>
    </div> -->
    <updatePost
      v-if="editing"
      :edited-post="editedPost"
      @save-edit="handleSaveEdit"
    >
    </updatePost>
  </div>
</template>

<script>
import updatePost from "../components/updatePost.vue";

export default {
  components: { updatePost },
  data() {
    return {
      posts: JSON.parse(localStorage.getItem("posts")),
      post: {},
      editing: false,
      editedPost: {},
    };
  },
  created() {
    const postId = this.$route.params.id;
    this.post = this.posts.find((el) => el.id == postId);
  },

  methods: {
    reverseDate(date) {
      const parts = date.split("-");
      return `${parts[2]}.${parts[1]}.${parts[0]}`;
    },
    editPost() {
      this.editing = true;
      this.editedPost = { ...this.post };
    },

    handleSaveEdit(editedPost) {
      this.post = { ...editedPost };
      this.editing = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.single_post_layout {
  display: flex;
  background: #fff;
  border: 3px solid #0772ffc4;
  border-radius: 1rem;
  padding: 20px;

  .post {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;

    .header_section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .post_header {
        color: #082e8f;
        font-family: PT Sans;
        font-size: 2rem;
        font-style: normal;
        font-weight: 700;
      }
      .post_name_header {
        color: #082e8fc4;
        font-family: PT Sans;
        font-size: 1.3em;
        font-style: normal;
        font-weight: 500;
      }
    }

    .intro_section {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      p {
        color: #082e8f;
        font-family: PT Sans;
        font-size: 1.3rem;
        font-style: normal;
        font-weight: 500;
        word-break: break-all;
      }
    }

    .description_section {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      p {
        color: #062164;
        font-family: PT Sans;
        font-size: 1.3rem;
        font-style: normal;
        font-weight: 500;
        word-break: break-all;
      }
    }
    .post_description_header,
    .post_full_header {
      color: #082e8f;
      font-family: PT Sans;
      font-size: 2rem;
      font-style: normal;
      font-weight: 700;
    }
    .post_footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .adding_date {
        color: #082e8f;
        font-family: PT Sans;
        font-size: 1.2rem;
        font-style: normal;
        font-weight: 600;
      }
      button {
        background: none;
        border: none;
        color: #7397f5;
        font-family: PT Sans;
        font-size: 1rem;
        font-style: normal;
        font-weight: 600;
        transition: transform 0.2s ease-in;
        &:hover {
          transform: scale(1.05);
          color: #7398f59d;
        }
      }
    }
  }
}
</style>
