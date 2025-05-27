<template>
  <li class="list pending" @click="toggleStatus(todo.id)">
    <input type="checkbox" :checked="todo.completedAt != null" />
    <span class="task">{{ todo.title }}</span>
    <span class="userid">userID: {{ todo.userId }}</span>
    <i class="uil" :class="icon"></i>
  </li>
</template>
<style scoped>
.list {
  position: relative;
}
.userid {
  position: absolute;
  right: 50px;
}
</style>
<script>
import { useTodoStore } from "../stores/todo";
export default {
  setup() {
    const todoStore = useTodoStore();
    return { todoStore };
  },
  props: ["todo", "icon"],
  methods: {
    toggleStatus(todoId) {
      this.todoStore.toggleStatus(todoId);
    },
  },
};
</script>
