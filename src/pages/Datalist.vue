<!-- eslint-disable vue/valid-v-slot -->
<template>
  <v-app>
    <v-main>
      <v-container>
        <v-data-table
          :headers="headers"
          :items="todos"
          :items-per-page="5"
          class="elevation-1"
          ref="myTable"
        >
          <template v-slot:item.actions="{ item }">

            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template></v-data-table>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "DatalistPage",
  data() {
    return {
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Title", value: "title" },
        { text: "Completed", value: "completed" },
        { text: "User ID", value: "userId" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      todos: [],
    };
  },
  methods: {
    async fetchTodos() {
      try {
        const todo = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_start=0&_limit=8"
        );
        const response = await todo.json();

        this.todos = response;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        const deleteItem = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${item.id}`,
          {
            method: "DELETE",
          }
        );
        const response = await deleteItem.json();
        this.todos = this.todos.filter((data) => data.id !== item.id);
        // this.$nextTick(() => {
        //   setTimeout(() => {
        //     this.fetchTodos();
        //   }, 3000);
        // });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.fetchTodos();
  },
};
</script>