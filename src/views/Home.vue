<template>
  <div>
      <a href="https://github.com/login/oauth/authorize?client_id=72e81c274317139cdc6c&redirect_uri=http://localhost:8080">
    Login with github
  </a>
  <button @click="authenticate('github')">auth Github</button>

  </div>
</template>

<script>
/* @ is an alias to /src
// import ProductList from '@/components/ProductList.vue'
// research
// https://www.storyblok.com/tp/how-to-auth0-vuejs-authentication#auth0-callback-route
 http://thecodebarbarian.com/github-oauth-login-with-node-js.html
    https://www.sohamkamani.com/blog/javascript/2018-06-24-oauth-with-node-js/
    https://www.loginradius.com/blog/async/oAuth-implemenation-using-node/
*/

export default {
  name: 'MasterPage',
  data(){
  	return {
  		clientID:'72e81c274317139cdc6c',
  		// clientSecret:'74d1912664b7afd8d1db5a6253633b6ebffbf926',
  		clientSecret:'7c85daf97febcfb6aa216042e2ef12d151f15338',
  	}
  },
  methods: {
    // authenticate: function (provider) {
    //   this.$auth.authenticate(provider).then(function (response) {
    //     // Execute application logic after successful social authentication
    //     console.log(response);

    //   })
    // }
  },
  mounted(){
  	console.log(this.$route.query.code)
  	this.axios.post(`https://github.com/login/oauth/access_token?client_id=${this.clientID}&client_secret=${this.clientSecret}&code=${this.$route.query.code}`
  	)
  	.then(data=>{
  		console.log(data);
  	})
  	.catch((error)=>{console.log(error);})
  }
  
}
</script>
