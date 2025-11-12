<template>
  <div class="home-container">
    <header class="header">
      <h1 class="title">✨ 创意调酒模拟器 ✨</h1>
      <p class="subtitle">根据你的心情和口味，创造专属鸡尾酒</p>
    </header>
    
    <main class="main-content">
      <img src="/cocktail-icon.png" alt="鸡尾酒图标" class="hero-image" />
      
      <div class="features">
        <div class="feature">
          <div class="feature-icon">🧪</div>
          <h3>自由搭配</h3>
          <p>选择你喜欢的调酒材料</p>
        </div>
        <div class="feature">
          <div class="feature-icon">😊</div>
          <h3>心情定制</h3>
          <p>根据心情推荐专属配方</p>
        </div>
        <div class="feature">
          <div class="feature-icon">🍹</div>
          <h3>口味偏好</h3>
          <p>调整甜度、酸度和风味</p>
        </div>
      </div>
      
      <router-link to="/create" class="create-button">开始调酒</router-link>
      <router-link to="/my-creations" class="creations-button">我的作品</router-link>
    </main>
    
    <footer class="footer">
      <p>&copy; 2025 Pixris | Creative Bartending Simulator</p>
    </footer>
  </div>
</template>

<script setup>
// 首页逻辑
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
}

.header {
  text-align: center;
  padding: 2rem 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0 0 30px 30px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2.5rem;
  color: #ff6b6b;
  margin-bottom: 0.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 1.2rem;
  color: #6c757d;
  margin: 0;
}

.main-content {
  flex: 1;
  padding: 0 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.hero-image {
  width: 180px;
  height: 180px;
  object-fit: contain;
  animation: bounce 3s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

.features {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  width: 100%;
  max-width: 800px;
}

.feature {
  background-color: white;
  padding: 1.5rem;
  border-radius: 20px;
  text-align: center;
  flex: 1;
  min-width: 200px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature h3 {
  color: #4ecdc4;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.feature p {
  color: #6c757d;
  margin: 0;
}

.create-button, .creations-button {
  background-color: #ff6b6b;
  color: white;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  transition: all 0.3s ease;
  display: inline-block;
  margin-top: 1rem;
}

.create-button:hover {
  background-color: #ff5252;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}

.creations-button {
  background-color: #4ecdc4;
  box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
}

.creations-button:hover {
  background-color: #3eb2a9;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(78, 205, 196, 0.4);
}

.footer {
  text-align: center;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.8);
  color: #6c757d;
  margin-top: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .hero-image {
    width: 150px;
    height: 150px;
  }
  
  .features {
    flex-direction: column;
    align-items: center;
  }
  
  .feature {
    width: 100%;
    max-width: 300px;
  }
}
</style>