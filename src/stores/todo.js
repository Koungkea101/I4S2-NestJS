import { defineStore } from "pinia";
import axios from "axios";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),
  getters: {
    countTodos: (state) => state.todos.length,
  },
  actions: {
    async fetchTodos() {
      // await new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve([
      //       {
      //         id: 1,
      //         title: "Clean house",
      //         description: "cleaning house in detail .....",
      //         userId: 1,
      //         createdAt: "2024-15-07 07:50:00",
      //         completedAt: null,
      //       },
      //       {
      //         id: 2,
      //         title: "Do homework",
      //         userId: 2,
      //         description: "Instruction on doing homework ....",
      //         createdAt: "2024-05-07 08:00:00",
      //         completedAt: "2024-05-07 08:10:00",
      //       },
      //     ]);
      //   }, 1000);
      // }).then((todos) => (this.todos = todos));
      try {
        const response = await axios.get("/api/tasks/getAllTasks");
        this.todos = response.data;
        // console.log("Todos fetched successfully:", this.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },
    toggleStatus(id) {
      const foundIndex = this.todos.findIndex((t) => t.id == id);
      if (foundIndex >= 0) {
        if (this.todos[foundIndex].completedAt != null) {
          this.todos[foundIndex].completedAt = null;
        } else {
          this.todos[foundIndex].completedAt = new Date().toISOString();
        }
      }
    },
    // addTodo(todo) {
    //   this.todos.push({
    //     id: this.todos.length + 1,
    //     name: todo,
    //     description: "description",
    //     createdAt: new Date().toISOString(),
    //     completedAt: null,
    //   });
    //   this.todos = JSON.parse(JSON.stringify(this.todos));
    // },
    AddTodo(todo) {
      console.log("All todos:", this.todos);
      const newTodo = {
        id: this.todos.length + 1,
        title: todo.title,
        description: todo.description,
        userId: 1, // Assuming a static userId for now
        createdAt: new Date().toISOString(),
        completedAt: null,
      };
      this.todos.push(newTodo);
      this.todos = JSON.parse(JSON.stringify(this.todos)); // Ensure reactivity
      // Optionally, you can also send the new todo to the server
      axios.post("/api/tasks", newTodo)
        .then(response => {
          console.log("Todo added successfully:", response.data);
        })
        .catch(error => {
          console.error("Error adding todo:", error);
        });
    },
    clearAll() {
      this.todos = [];
    },
  },
});
