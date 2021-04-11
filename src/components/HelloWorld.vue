<template>
  <div>
    <button class="btn btn-primary" @click="change({by:3,du:5})">increments</button>
  </div>
</template>
<script>
import {mapMutations} from 'vuex';
import {mapActions} from 'vuex';
  export default {
    name: 'btn',
    methods:{
      //one way
      // increment(){
      //   //one way
      //   //this.$store.state.auth++;
      //   //another way
      //   this.$store.commit('authChange');
      // }

      //second way
      ...mapMutations([
          //'increment',
        ]),
      //thired way
       ...mapActions({
          change: 'increment'
       }),

    }
  }
</script>