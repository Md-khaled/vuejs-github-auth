<template>
  <div class="container">
      {{auth}}
      <clickbtn></clickbtn>
      <button class="btn btn-info" @click="getdata">click</button>
      <router-view></router-view>
      </div>
</template>

<script>
import {mapGetters} from 'vuex'
import clickbtn from './components/HelloWorld.vue';
  export default {
    name:'MasterPage',
    components:{clickbtn},
    methods:{
      getdata(){
        var username = 'Md-khaled'
        var password = 'ujj@l12345'

        let auth = btoa(username + ":" + password);
         this.axios.get('https://api.github.com/users/Md-khaled',{
            headers: {
                'Accept' : 'application/vnd.github.v3+json'
            }
        })
      .then(response => response.json())
      .then(data =>{
        console.log(data);
      })
      .catch((errors)=>{console.log(errors);})
      }
      
    },
    mounted(){
      console.log(this.$store.state.auth);
     
    },
    computed:{
      ...mapGetters([
          'auth',
      ]),
    }
  }
</script>

<style>
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
