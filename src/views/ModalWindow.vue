<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <slot name="footer">
            <button class="close_btn" @click="$emit('close')">
              <i class="material-icons">clear</i>
            </button>
          </slot>
          <form class="edit_form" @submit.prevent="addComment">
            <div class="edit_name_section">
              <label class="">Имя пользователя:</label>
              <textarea
                v-model="newComment.name"
                @input="handleTextareaInput('name')"
              ></textarea>
              <span class="character_count">
                Максимум {{ characters_value.name }} символов
              </span>
            </div>
            <div class="edit_intro_section">
              <label>EMAIL:</label>
              <textarea
                v-model="newComment.email"
                @input="handleTextareaInput('email')"
              ></textarea>
              <span class="character_count">
                Максимум {{ characters_value.email }} символов
              </span>
            </div>
            <div class="edit_description_section">
              <label>Комментарий:</label>
              <textarea
                v-model="newComment.comment"
                @input="handleTextareaInput('comment')"
              ></textarea>
              <span class="character_count">
                Максимум {{ characters_value.comment }} символов
              </span>
            </div>
          </form>

          <button class="add_comment" @click="addComment">
            Добавить комментарий
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export default {
  data: () => ({
    newComment: {
      name: "",
      email: "1@mail.ru",
      comment: "",
    },
    characters_value: {
      name: 50,
      email: 50,
      comment: 255,
    },
  }),

  methods: {
    closeModal() {
      this.$emit("close");
    },
    handleTextareaInput(fieldName) {
      const maxCharacters = this.characters_value[fieldName];
      if (this.newComment[fieldName].length > maxCharacters) {
        this.newComment[fieldName] = this.newComment[fieldName].substring(
          0,
          maxCharacters
        );
      }
    },

    addComment() {
      if (
        this.newComment.name.trim() === "" ||
        this.newComment.comment.trim() === "" ||
        !emailRe.test(this.newComment.email)
      ) {
        return;
      }

      const newCommentObject = {
        name: this.newComment.name,
        email: this.newComment.email,
        comment: this.newComment.comment,
      };

      this.$emit("comment-added", newCommentObject);

      this.newComment = {
        name: "",
        email: "",
        comment: "",
      };

      this.closeModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;

    .modal-container {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 40%;
      margin: 0px auto;
      padding: 20px 30px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all 0.3s ease;
      font-family: Helvetica, Arial, sans-serif;

      .close_btn {
        display: flex;
        justify-content: end;
        border: none;
        background: none;

        i {
          transition: transform 0.1s ease-in-out;
          &:hover {
            transform: scale(1.2);
          }
        }
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
          .character_count {
            font-size: 1rem;
            color: #999;
          }
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

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
