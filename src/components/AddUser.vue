<template>
  <div class="container py-3">
    <div class="col-md-6 offset-md-3">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">
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
            <Field
              type="text"
              name="name"
              placeholder="Enter Name"
              required
              v-model.trim="user.name"
              class="form-control"
              :class="{ 'is-invalid': errors.name }"
            />
            <div class="invalid-feedback">{{ errors.name }}</div>
          </div>
          <div class="form-group">
            <label for="name">Surname</label>
            <Field
              type="text"
              name="surname"
              placeholder="Enter Surname"
              required
              v-model.trim="user.surname"
              class="form-control"
              :class="{ 'is-invalid': errors.surname }"
            />
            <div class="invalid-feedback">{{ errors.surname }}</div>
          </div>
          <div class="form-group">
            <label for="name">Email</label>
            <Field
              type="text"
              name="email"
              placeholder="Enter email"
              v-model.trim="user.email"
              class="form-control"
              :class="{ 'is-invalid': errors.email }"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
            <div class="invalid-feedback">{{ errors.email }}</div>
          </div>
          <div class="form-group">
            <label for="name">Phone</label>
            <Field
              type="tel"
              name="phone"
              placeholder="0672345566"
              v-model.trim="user.phone"
              class="form-control"
              :class="{ 'is-invalid': errors.phone }"
            />
            <div class="invalid-feedback">{{ errors.phone }}</div>
          </div>
          <div class="form-group">
            <label for="address">Address</label>
            <Field
              as="textarea"
              class="form-control"
              id="address"
              name="address"
              rows="3"
              v-model.trim="user.address"
              :class="{ 'is-invalid': errors.address }"
            ></Field>
            <div class="invalid-feedback">{{ errors.address }}</div>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
          {{ '  ' }}
          <router-link class="btn btn-secondary" to="/">
            GO BACK
          </router-link>
        </fieldset>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.form-control.is-invalid,
.was-validated .form-control:invalid {
  border: solid #d9534f !important;
}
</style>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { API_URL } from '../constants/constants';

export default {
  components: {
    Form,
    Field,
  },

  setup() {
    let msg = ref('');
    let success = ref(false);
    let error = ref(false);

    const user = ref({
      name: '',
      surname: '',
      email: '',
      phone: '',
      address: '',
    });

    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      surname: Yup.string().required('Surname is required'),
      email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      phone: Yup.string()
        .min(10, 'Phone must be 10 characters')
        .max(10, 'Phone must be 10 characters')
        .required('Phone is required'),
      address: Yup.string().required('Address is required'),
    });

    const onSubmit = async (values, { resetForm }) => {
      try {
        const response = await axios.post(`${API_URL}/api/users`, values);

        const { message } = response.data;

        resetForm();
        success.value = true;
        msg.value = message;
        setTimeout(() => {
          success.value = false;
        }, 3000);
      } catch (err) {
        const {
          status,
          data: { success, message },
        } = err.response;
        error.value = true;
        msg.value = message;
        setTimeout(() => {
          error.value = false;
        }, 3000);
        console.log(`Error ${JSON.stringify(message)}`);
      }
    };

    return {
      user,
      msg,
      success,
      error,
      schema,
      onSubmit,
    };
  },
};
</script>
