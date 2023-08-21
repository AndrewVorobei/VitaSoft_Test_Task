<template>
  <div class="post_layout">
    <div class="posts_list">
      <div class="post">
        <h2 class="edit_header">Редактирование поста</h2>
        <form class="edit_form" @submit.prevent="saveEdit">
          <div class="edit_name_section">
            <label class="">Заголовок:</label>
            <textarea v-model="localEditedPost.name" required></textarea>
          </div>
          <div class="edit_intro_section">
            <label>Краткое описание:</label>
            <textarea v-model="localEditedPost.intro" required></textarea>
          </div>
          <div class="edit_description_section">
            <label>Описание поста:</label>
            <textarea v-model="localEditedPost.description" required></textarea>
          </div>
          <button type="submit" @click="saveEdit">Сохранить изменения</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editedPost: Object,
  },
  data() {
    return {
      posts: JSON.parse(localStorage.getItem("posts")),
      post: {},
      localEditedPost: { ...this.editedPost },

      characters_value: {
        name: 50,
        intro: 100,
        description: 255,
      },
    };
  },

  methods: {
    saveEdit() {
      const postIndex = this.posts.findIndex(
        (el) => el.id === this.editedPost.id
      );
      if (postIndex !== -1) {
        this.posts[postIndex] = { ...this.localEditedPost };
      }
      this.post = { ...this.localEditedPost };
      localStorage.setItem("posts", JSON.stringify(this.posts));

      this.editing = false;
      this.$emit("save-edit", this.localEditedPost);
    },
  },
};
</script>

<style lang="scss" scoped>
.post_layout {
  display: flex;
  height: 100%;
  width: 50%;
  background: #fff;
  border: 3px solid #0772ffc4;
  border-radius: 1rem;
  padding: 20px;

  .posts_list {
    display: flex;
    width: 100%;
    flex-direction: column;

    .post {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .edit_header {
        width: 10em;
        height: 1em;
        color: #082e8f;
        font-family: PT Sans;
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 700;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .edit_name_section,
        .edit_intro_section,
        .edit_description_section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;

          label {
            width: 10em;
            height: 1em;
            color: #082e8f77;
            font-family: PT Sans;
            font-size: 1.5rem;
            font-style: normal;
            font-weight: 700;
          }
        }
        button {
          background: none;
          border: none;
          color: #7397f5;
          font-family: PT Sans;
          font-size: 1rem;
          font-style: normal;
          font-weight: 700;
          &:hover {
            color: #7398f59d;
          }
        }
      }
    }
  }
}

textarea {
  display: flex;
  padding: 10px 12px;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  resize: none;
  border-radius: 4px;
  border: 2px solid #0754e2;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.06);
  outline: 0;
  font-family: PT Sans;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: linear-gradient(0.5turn, #0cb6d4, #0e5894, #0e35e46c);
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.404);
    border-radius: 10px;
    background: linear-gradient(0.25turn, #9dadb4, #ebf8e1, #f69c3c6c);
  }
  &::-webkit-scrollbar:horizontal {
    display: none;
  }
}

textarea::placeholder {
  padding-left: 6px;
  font-size: 18px;
}

textarea:focus {
  border-color: #7397f5;
  outline: 0;
  font-family: PT Sans;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
}
:focus::-webkit-input-placeholder {
  color: transparent;
  background: none;
}
</style>
