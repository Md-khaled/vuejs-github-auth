<template>
  <div id="nav">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'Home'}">Home</router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item" v-if="!access_token">
              <router-link class="nav-link" :to="{name: 'Login'}">Login <i class="fas fa-sign-in-alt"></i></router-link>
            </li>
            <li class="nav-item" v-else>
              <a class="nav-link" @click="logout" style="cursor: pointer;">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Navbar',
  data() {
    return {
      access_token: false,
    }
  },
  methods: {
    logout() {
      if (localStorage.getItem('access_token') == undefined) {
        console.log(localStorage.getItem('access_token'));
        this.$router.push({name: 'Login'}, () => {
        });
        window.iziToast.error({
          title: 'Error',
          position: 'topRight',
          message: 'Something went wrong.Please try again',
        });
      } else {

        this.axios.delete('api/logout')
            .then((response) => {
              console.log(response);
              localStorage.removeItem('access_token');
              localStorage.removeItem('user');
              this.$router.push({name: 'Login'});
              this.access_token = false;
            })
            .catch(() => {

            })
      }
    }
  },
  mounted() {
    //check auth status
    if (localStorage.getItem('access_token')) {
      this.access_token = true;
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
    } else {
      this.$router.push({name: 'Login'});
    }
    //update auth status
    window.bus.$on('authStatus', (status) => {
      this.access_token = status;
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
    });

  }
}
</script>