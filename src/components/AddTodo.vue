<template>
  <div class="input-field">
    <textarea
      @keydown.enter.prevent="AddTodo"
      ref="input"
      placeholder="Enter your new todo"
    ></textarea>
    <i class="uil uil-notes note-icon"></i>
  </div>
</template>
<script>
import { useTodoStore } from "../stores/todo.js";
export default {
  setup() {
    const todoStore = useTodoStore();
    return { todoStore };
  },
  methods: {
    AddTodo(e) {
      console.log('adding todo');
      const todoText = e.target.value.trim();
      
      if (todoText) {
        // Call the store's AddTodo function with proper todo object structure
        this.todoStore.AddTodo({
          title: todoText,
          // description: ""
        });
        
        // Clear the input
        this.$refs.input.value = "";
        
        // Still emit for parent components that might be listening
        this.$emit("added", todoText);
      }
    },
  },
};
</script>
