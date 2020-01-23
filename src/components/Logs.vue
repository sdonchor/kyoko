<template>
  <div>
    <v-container fluid fill-height>
      <v-overlay :value="loading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
      <v-card width="100%" v-if="categories && logs">
        <v-select label="Filter by category" class="pa-5" :items="categories" v-model="category"> </v-select>
        <v-simple-table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Message</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(log, idx) in filteredLogs" :key="idx + 'log'">
              <td>{{ log.id }}</td>
              <td>{{ log.category }}</td>
              <td>{{ log.content }}</td>
              <td>{{ log.time }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Logs",
  components: {},
  data: function() {
    return {
      loading:true,
      categoriesReady: false,
      logsReady: false,
      categories: null,
      category: "all",
      logs:null,
      filteredLogs: null
    };
  },
  methods: {
    getCategories(){
      axios.get('/api/logcategories').then(response=>{
        this.categories=["all"];
        response.data.forEach((x)=>{
          this.categories.push(x.category);
        })
        this.categoriesReady=true;
        if(this.logsReady){
          this.loading=false;
        }
      })
    },
    getLogs(){
      axios.get('/api/logs').then(response=>{
        this.logs = response.data;
        this.logsReady=true;
        if(this.categoriesReady){
          this.loading=false;
        }
      })
    }
  },
  created() {},
  mounted() {
    this.getCategories();
    this.getLogs();
  },
  watch:{
    category: function(){
      if(this.category=="all")
      {
        this.filteredLogs=this.logs;
      }
      else{
        this.filteredLogs = this.logs.filter((x)=>{
          return x.category==this.category
        })
      }
    }
  }
};
</script>

<style scoped></style>
