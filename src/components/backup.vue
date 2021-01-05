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
              v-model.trim="$v.user.name.$model"
              :class="{
                'is-invalid': $v.user.name.$error,
                'is-valid': !$v.user.name.$invalid,
              }"
              class="form-control"
              @blur="$v.user.name.$touch()"
            />
            <div class="invalid-feedback">
              <span v-if="!$v.user.name.required">Name is required</span><br />
              <span v-if="!$v.user.name.minLength"
                >Name should have a minimum length of 3 letters</span
              >
            </div>
          </div>
          <div class="form-group">
            <label for="surname">Surname</label>
            <input
              type="text"
              class="form-control"
              id="surname"
              placeholder="Enter Surname"
              v-model="user.surname"
            />
          </div>
          <div class="form-group">
            <label for="emailAddress">Email address</label>
            <input
              type="email"
              class="form-control"
              id="emailAddress"
              placeholder="Enter email"
              v-model="user.email"
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
              placeholder="Enter phone"
              v-model="user.phone"
            />
          </div>
          <div class="form-group">
            <label for="address">Address</label>
            <textarea
              class="form-control"
              id="address"
              rows="3"
              v-model="user.address"
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
import { required, minLength, maxLength, between } from '@vuelidate/validators';

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
  validations() {
    return {
      user: {
        name: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(15),
        },
      },
    };
  },
  methods: {
    async addUser(e) {
      e.preventDefault();
      try {
        const response = await axios.post(
          `http://localhost:5000/api/users`,
          this.user
        );

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
