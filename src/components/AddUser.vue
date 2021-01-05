<template>
  <div class="container py-3">
    <div class="col-md-6 offset-md-3">
      <form @submit="addUser">
        <fieldset>
          <legend>ADD USER</legend>
          <div class="alert alert-dismissible alert-success" v-if="success">
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
            {{ msg }}
          </div>
          <div class="alert alert-dismissible alert-danger" v-if="error">
            <button type="button" class="close" data-dismiss="alert">
              &times;
            </button>
            {{ msg }}
          </div>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Name"
              required
              v-model.trim="user.name"
              class="form-control"
            />
          </div>
          <div class="form-group">
            <label for="surname">Surname</label>
            <input
              type="text"
              class="form-control"
              id="surname"
              placeholder="Enter Surname"
              required
              v-model.trim="user.surname"
            />
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Enter email"
              v-model.trim="user.email"
              required
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <div class="form-group">
            <label for="phone">Phone</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              placeholder="067-458-6788"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              v-model.trim="user.phone"
              required
            />
          </div>
          <div class="form-group">
            <label for="address">Address</label>
            <textarea
              class="form-control"
              id="address"
              rows="3"
              v-model.trim="user.address"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
          {{ '  ' }}
          <router-link class="btn btn-secondary" to="/">
            GO BACK
          </router-link>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '../constants/constants';

export default {
  data() {
    return {
      user: {
        name: '',
        surname: '',
        email: '',
        phone: '',
        address: '',
      },
      loading: false,
      success: false,
      error: '',
      msg: '',
    };
  },
  methods: {
    async addUser(e) {
      e.preventDefault();
      try {
        const response = await axios.post(`/api/users`, this.user);

        const { message } = response.data;
        this.user = {
          name: '',
          surname: '',
          email: '',
          phone: '',
          address: '',
        };

        this.success = true;
        this.msg = message;
        setTimeout(() => {
          this.success = false;
        }, 3000);
      } catch (err) {
        const {
          status,
          data: { success, message },
        } = err.response;
        this.error = true;
        this.msg = message;
        setTimeout(() => {
          this.error = false;
        }, 3000);
        console.log(`Error ${JSON.stringify(message)}`);
      }
    },
  },
};
</script>
