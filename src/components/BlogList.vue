<!-- eslint-disable prettier/prettier -->
<template>
  <div class="layout">
    <header class="header">
      <h1 class="list_label">Список постов:</h1>

      <router-link class="add_post" :to="{ name: 'edit-post' }">
        <button>Добавить запись</button>
      </router-link>
    </header>
    <p class="empty_list" v-if="!posts || !posts.length">
      Здесь пока пусто, добавьте запись
    </p>
    <main class="main">
      <div class="posts_list">
        <div
          class="new_post"
          v-for="post in posts"
          :key="post.id"
          @click="open_post(post)"
        >
          <router-link :to="'/post/' + post.id" class="post_info">
            <h1 class="post_header">
              {{ post.name }}
            </h1>
            <p class="post_intro">
              {{ post.intro }}
            </p>
            <div class="post_footer">
              <p class="post_date">
                {{ reverseDate(post.date) }}
              </p>
              <p class="comments_value">
                {{ "1" }}
              </p>
            </div>
          </router-link>
          <button class="remove_post" @click="remove_post(post)">
            Удалить пост
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: JSON.parse(localStorage.getItem("posts")),
    };
  },

  methods: {
    remove_post(post) {
      this.posts = this.posts.filter((el) => el.id !== post.id);
      localStorage.setItem("posts", JSON.stringify(this.posts));
    },
    open_post(post) {
      this.$router.push({ name: "post", params: { id: post.id } });
    },

    reverseDate(date) {
      const parts = date.split("-");
      return `${parts[2]}.${parts[1]}.${parts[0]}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap");
.layout {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #fff;
  border: 2px solid rgba($color: #817f7f, $alpha: 0.75);
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgb(44, 162, 170);
  padding: 20px;
  .header {
    display: flex;
    gap: 1em;
    justify-content: space-between;
    .list_label {
      text-align: center;
      color: #7397f5;
      font-family: PT Sans;
      font-size: 2rem;
      font-style: normal;
      font-weight: 700;
    }

    .add_post {
      text-decoration: none;
      display: flex;
      justify-content: center;
      width: 20%;
      padding: 10px;
      border-radius: 4px;
      border: 2px solid #7397f5;
      background: #e2e1e18f;
      transition: transform 0.1s ease-in;

      button {
        background: none;
        border: none;
        color: #7397f5;
        font-family: PT Sans;
        font-size: 1rem;
        font-style: normal;
        font-weight: 700;
        line-height: 14px;
      }

      &:hover {
        transform: scale(1.05);
        background: #125bae;
        color: #0d2258;
      }
    }
  }

  .empty_list {
    color: #8b559cce;
    font-family: PT Sans;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 16px;
  }

  .main {
    display: flex;

    .posts_list {
      width: 100%;
      display: flex;
      gap: 1.5rem;
      flex-direction: column;

      .new_post {
        display: flex;
        width: auto;
        justify-content: space-between;

        .post_info {
          text-decoration: none;
          display: flex;
          overflow: scroll;
          flex-direction: column;
          gap: 1.5rem;
          width: auto;
          max-width: 70%;
          border: 2px solid #4175f8c0;
          border-radius: 10px;
          padding: 0.5rem;
          transition: transform 0.2s ease-in-out;
          &:hover {
            transform: scale(1.05);
          }
          &::-webkit-scrollbar {
            display: none;
          }

          &::-webkit-scrollbar:horizontal {
            height: 1rem;
          }

          .post_header {
            height: 1.5rem;
            background: linear-gradient(#7da7d1, #3fb7db, #2076c76c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-family: PT Sans;
            font-style: normal;
            font-size: 26px;
            font-weight: 700;
            line-height: 16px;
          }
          .post_intro {
            background: linear-gradient(#172430, #0e3f4e, #04427c9c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-family: PT Sans;
            font-style: normal;
            font-size: 16px;
            font-weight: 700;
            line-height: 16px;
          }

          .post_footer {
            display: flex;
            gap: 1rem;

            .post_date {
              color: #082e8f;
              font-family: PT Sans;
              font-size: 1.1rem;
              font-style: normal;
              font-weight: 500;
            }
          }
        }

        .remove_post {
          background: none;
          border: none;
          color: #7397f5;
          font-family: PT Sans;
          font-size: 1rem;
          font-style: normal;
          font-weight: 700;
          line-height: 14px;

          &:hover {
            color: #1d56e7;
          }
        }
      }
    }
  }
}
</style>
