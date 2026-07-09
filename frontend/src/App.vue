<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/" class="navbar-brand">
        <h1>MiniPay</h1>
      </router-link>
      <router-link v-if="$route.name !== 'Home'" to="/" class="back-home">
        ← 返回首页
      </router-link>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', Arial, sans-serif;
  background: #f5f5f5;
  color: #333;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #FFB800 0%, #FF69B4 100%);
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.navbar-brand {
  text-decoration: none;
  color: white;
}

.navbar-brand h1 {
  font-size: 1.5rem;
  font-weight: 600;
}

.back-home {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s;
}

.back-home:hover {
  background: rgba(255,255,255,0.2);
}

.main-content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>