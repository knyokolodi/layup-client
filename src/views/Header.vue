<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        Layup assessment
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/" exact>
              Users
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about" exact>
              About
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-exact-active {
  color: #ffffff;
}
</style>
