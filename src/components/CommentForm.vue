<template>
  <div class="post_layout">
    <div class="posts_list">
      <div class="post">
        <form>
          <div class="form_name">
            <label for="post_name" class="post_name_label"
              >Название поста:</label
            >
            <textarea
              type="text"
              placeholder="введите название поста"
              class="post_name_input"
              v-model="newPost.name"
              @input="handleTextareaInput('name')"
            ></textarea>
            <span class="character_count">
              Максимум {{ characters_value.name }} символов
            </span>
          </div>
          <hr class="hr" />
          <div class="form_intro">
            <label for="post_introducion" class="post_description_label"
              >Краткое описание:</label
            >
            <textarea
              type="text"
              placeholder="Введите краткое описание поста"
              class="post_intro_input"
              v-model="newPost.intro"
              @input="handleTextareaInput('intro')"
            ></textarea>
            <span class="character_count">
              Максимум {{ characters_value.intro }} символов
            </span>
          </div>
          <hr class="hr" />
          <div class="form_description">
            <label for="post_description" class="post_description_label"
              >Описание поста:</label
            >
            <textarea
              type="text"
              placeholder="Введите описание поста"
              class="post_descr_input"
              v-model="newPost.description"
              @input="handleTextareaInput('description')"
            ></textarea>
            <span class="character_count">
              Максимум {{ characters_value.description }} символов
            </span>
          </div>
          <hr class="hr" />
        </form>

        <div class="post_footer">
          <p class="adding_date"></p>
          <p class="commentaries_value"></p>
          <button class="save_post" @click="save_post">Сохранить</button>
          <router-link :to="{ name: 'blog-list' }">
            <button class="back_to_blog">Вернуться к постам</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPost: {
        name: "",
        intro: "",
        description: "",
        id: Math.floor(Math.random() * 10000),
      },

      characters_value: {
        name: 50,
        intro: 100,
        description: 255,
      },
    };
  },

  computed: {
    currentDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    },
  },

  methods: {
    handleTextareaInput(fieldName) {
      const maxCharacters = this.characters_value[fieldName];
      if (this.newPost[fieldName].length > maxCharacters) {
        this.newPost[fieldName] = this.newPost[fieldName].substring(
          0,
          maxCharacters
        );
      }
    },
    save_post() {
      this.newPost.date = this.currentDate;
      this.$store.commit("addPost", this.newPost);
      this.$router.push({ name: "blog-list" });
      this.newPost = {
        name: "",
        intro: "",
        description: "",
        id: "",
        date: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.post_layout {
  display: flex;
  height: 100%;
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
      form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .form_name,
        .form_intro,
        .form_description {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;

          .post_name_label,
          .post_description_label {
            width: 10em;
            height: 1em;
            color: #082e8f;
            font-family: PT Sans;
            font-size: 1.5rem;
            font-style: normal;
            font-weight: 700;
          }
          .post_name_input {
            width: 35%;
            height: 3rem;
          }

          .post_intro_input {
            width: 50%;
            height: 5rem;
          }

          .post_descr_input {
            width: 50%;
            height: 8rem;
          }

          .character_count {
            font-size: 1rem;
            color: #999;
          }
        }
      }
      .post_footer {
        display: flex;
        justify-content: space-between;
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
