<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/leaderboard">Leaderboard</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
  background-color:    #6C924C;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color:  #ebb563;
}
.routerLink{
  text-decoration: none;
  margin: 5px;
}
.routerLink:hover{
  text-decoration: none;
}
.routerLink:visited{
  color: rgb(0, 0, 0);
}
.box-card{
  background-color: #ebb563;
}
</style>
