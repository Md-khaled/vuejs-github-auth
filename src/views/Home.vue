<template>
  <div>
      <button @click="authenticate('github')">auth Github</button>
  </div>
</template>

<script>
// @ is an alias to /src
// import ProductList from '@/components/ProductList.vue'

export default {
  name: 'MasterPage',
methods: {
    authenticate: function (provider) {
      this.$auth.authenticate(provider).then(function (response) {
      	console.log(response);
        // Execute application logic after successful social authentication
      })
    }
  },
  mounted(){
  	this.axios.get('/github/callback', (req, res) => {
  		console.log(reg);
  	})
  }
  
}
</script>
