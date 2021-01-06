<template>
  <div class="container py-3">
    <Loader v-if="loading" />
    <div class="row" v-else>
      <div class="col-md-6">
        <legend>USERS</legend>
      </div>
      <div class="col-md-6 text-right">
        <router-link class="btn btn-primary" to="/add-user">
          Add User
        </router-link>
      </div>
      <div class="col-md-12 py-3" v-if="users.length < 1">
        <h3>No records found!</h3>
      </div>
      <div class="col-md-12 py-3" v-else>
        <table class="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id">
              <td>{{ user.name }}</td>
              <td>{{ user.surname }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.address }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Loader from '../components/Loader';
import { API_URL } from '../constants/constants';

export default {
  data() {
    return {
      users: [],
      loading: false,
      error: '',
    };
  },
  components: {
    Loader,
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        this.loading = true;
        const response = await axios.get(`${API_URL}/api/users`);

        this.users = response.data.users;
        this.loading = false;
      } catch (error) {
        console.log(`Error ${JSON.stringify(error)}`);
      }
    },
  },
};
</script>
