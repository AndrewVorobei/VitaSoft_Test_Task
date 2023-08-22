<template>
  <div class="comment_layout">
    <button class="add_comment" @click="showModal = true">
      Добавить комментарий
    </button>
    <div class="comments" v-for="post in posts" :key="post.id">
      <div class="comment" v-for="comment in post.comments" :key="comment.name">
        <section class="comment_header">
          <h1 class="comment_name">
            {{ comment.name }}
          </h1>
          <h3 class="comment_email">
            {{ comment.email }}
          </h3>
        </section>
        <p class="comment_text">
          {{ comment.comment }}
        </p>
        <button @click="removeComment(comment)">Удалить комментарий</button>
      </div>
    </div>

    <modal-window
      v-if="showModal"
      @close="showModal = false"
      @comment-added="handleCommentAdded"
    ></modal-window>
  </div>
</template>

<script>
import ModalWindow from "./ModalWindow.vue";

export default {
  components: { ModalWindow },
  props: {
    postId: Number,
  },
  data() {
    return {
      showModal: false,
      posts: JSON.parse(localStorage.getItem("posts")),
    };
  },

  methods: {
    handleCommentAdded(newComment) {
      const post = this.posts.find((p) => p.id === this.postId);

      if (post !== -1) {
        post.comments.push(newComment);

        localStorage.setItem("posts", JSON.stringify(this.posts));
      }
    },

    removeComment(commentToRemove) {
      const post = this.posts.find((p) => p.id === this.postId);

      post.comments = post.comments.filter(
        (comment) => comment.name !== commentToRemove.name
      );

      localStorage.setItem("posts", JSON.stringify(this.posts));
    },
  },
};
</script>

<style lang="scss" scoped>
.comment_layout {
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 1rem;
  box-shadow: inset 0 -1em 1em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255),
    0.3em 0.3em 0.5em rgba(0, 0, 0, 0.3);

  .add_comment {
    display: flex;
    justify-content: center;
    background: none;
    border: none;
    color: #7397f5;
    font-family: PT Sans;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 700;
    &:hover {
      color: #7398f59d;
    }
  }
  .comments {
    display: flex;
    height: 90%;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    overflow: scroll;

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
    .comment {
      display: flex;
      flex-direction: column;
      width: 70%;
      border: 1px solid #04427c9c;
      border-radius: 10px;
      gap: 0.5rem;

      .comment_header {
        display: flex;
        flex-direction: column;
        .comment_name {
          color: #082e8fc4;
          font-family: PT Sans;
          font-size: 1.3em;
          font-style: normal;
          font-weight: 500;
        }

        .comment_email {
          color: #082e8fc4;
          font-family: PT Sans;
          font-size: 1.1em;
          font-style: normal;
          font-weight: 500;
        }
      }

      .comment_text {
        color: #000000c4;
        font-family: PT Sans;
        font-size: 1em;
        font-style: normal;
        font-weight: 500;
      }

      button {
        background: none;
        border: none;
        color: #7397f5;
        font-family: PT Sans;
        font-size: 1rem;
        font-style: normal;
        font-weight: 600;
        transition: transform 0.1s ease-in;
        &:hover {
          transform: scale(1.01);
          color: #7398f5dc;
        }
      }
    }
  }
}
</style>
