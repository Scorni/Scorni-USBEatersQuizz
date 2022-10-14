<template>
  <nav>
    <router-link to="/">Home</router-link>
  </nav>
  <router-view/>
</template>
<style>
@import './assets/style/app.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}
/* body{
  background-color:    #6C924C;
  margin: 0%;
} */
nav {
  margin: 0%;
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color:  #ebb563;
  text-decoration: none;
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
