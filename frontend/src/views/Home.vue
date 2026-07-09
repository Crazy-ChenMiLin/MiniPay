<template>
  <div class="home">
    <div class="hero">
      <h1>MiniPay</h1>
      <p class="subtitle">轻量级订单支付系统</p>
    </div>
    <div class="card-grid">
      <router-link to="/create" class="home-card">
        <div class="card-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
        </div>
        <h2>创建订单</h2>
        <p>新建一笔支付订单，填写金额和描述后发起支付</p>
      </router-link>
      <router-link to="/query" class="home-card">
        <div class="card-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
          </svg>
        </div>
        <h2>结果查询</h2>
        <p>按订单号查询订单状态和支付结果，浏览历史记录</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  padding: 3rem 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #FFB800 0%, #FF69B4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #888;
  font-size: 1.1rem;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.home-card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-align: center;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  border: 2px solid transparent;
}

.home-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  border-color: #FFB800;
}

.card-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FFB800 0%, #FF69B4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
}

.home-card h2 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.75rem;
}

.home-card p {
  color: #888;
  font-size: 0.9rem;
  line-height: 1.5;
}
</style>
