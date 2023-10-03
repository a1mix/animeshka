<template>
    <nav>
      <router-link to="/">
        <h1>anistream.</h1>
      </router-link> 
      <div>
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link> 
          <router-link to="/login">Login</router-link>
      </div>
    </nav>
</template>

<style scoped>
nav {
  padding: 10px 50px ;
  position: fixed;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  width: 100vw;
  background: rgba(0, 0, 0, 0.731);
  backdrop-filter: blur(4px);
}


div {
    display: flex;
    gap: 20px;

}
nav a {
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #9142b9;
}

@media screen and (max-width: 768px) {
  a {
    font-size: 14px;
  }
  nav {
    padding: 10px;
  }
}
</style>