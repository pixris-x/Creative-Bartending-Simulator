<template>
  <div class="creations-container">
    <header class="header">
      <router-link to="/" class="back-button">← 返回首页</router-link>
      <h1 class="title">我的鸡尾酒作品 🍹</h1>
    </header>
    
    <main class="main-content">
      <div v-if="savedCocktails.length === 0" class="empty-state">
        <div class="empty-icon">📝</div>
        <h2>你还没有保存任何鸡尾酒配方</h2>
        <p>去创造一些美味的鸡尾酒吧！</p>
        <router-link to="/create" class="create-button">开始创作</router-link>
      </div>
      <div v-else class="cocktails-grid">
        <div 
          v-for="cocktail in savedCocktails" 
          :key="cocktail.id"
          class="cocktail-card"
        >
          <div class="card-header">
            <h3 class="cocktail-name">{{ cocktail.name }}</h3>
            <button @click="deleteCocktail(cocktail.id)" class="delete-button">×</button>
          </div>
          <div class="cocktail-image">
            <img :src="cocktail.image" alt="鸡尾酒图片" />
          </div>
          <div class="cocktail-info">
            <p class="cocktail-date">创建于: {{ cocktail.date }}</p>
            <p class="cocktail-description">{{ truncateText(cocktail.description, 50) }}</p>
            <button @click="viewDetails(cocktail)" class="details-button">查看详情</button>
          </div>
        </div>
      </div>
    </main>
    
    <!-- 详情弹窗 --</!-->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">{{ selectedCocktail.name }}</h2>
          <button @click="closeModal" class="close-button">×</button>
        </div>
        <div class="modal-body">
          <div class="modal-image">
            <img :src="selectedCocktail.image" alt="鸡尾酒图片" />
          </div>
          <p class="modal-description">{{ selectedCocktail.description }}</p>
          <div class="modal-ingredients">
            <h3>材料:</h3>
            <ul>
              <li v-for="(ingredient, index) in selectedCocktail.ingredients" :key="index">
                {{ ingredient }}</li>
              </ul>
            </div>
            <div class="modal-instructions">
              <h3>制作步骤:</h3>
              <p>{{ selectedCocktail.instructions }}</p>
            </div>
          <div class="modal-footer">
            <p class="creation-date">创建于: {{ selectedCocktail.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const savedCocktails = ref([])
const showModal = ref(false)
const selectedCocktail = ref(null)

// 加载保存的鸡尾酒
const loadCocktails = () => {
  const saved = localStorage.getItem('savedCocktails')
  if (saved) {
    savedCocktails.value = JSON.parse(saved)
  }
}

// 查看鸡尾酒详情
const viewDetails = (cocktail) => {
  selectedCocktail.value = cocktail
  showModal.value = true
}

// 关闭详情弹窗
const closeModal = () => {
  showModal.value = false
  selectedCocktail.value = null
}

// 删除鸡尾酒
const deleteCocktail = (id) => {
  if (confirm('确定要删除这个鸡尾酒配方吗？')) {
    savedCocktails.value = savedCocktails.value.filter(cocktail => cocktail.id !== id)
    localStorage.setItem('savedCocktails', JSON.stringify(savedCocktails.value))
  }
}

// 截断文本
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// 页面加载时获取数据
onMounted(() => {
  loadCocktails()
})
</script>

<style scoped>
.creations-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.header {
  display: flex;
  align-items: center;
  padding: 1.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 0 0 30px 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.back-button {
  color: #6c757d;
  text-decoration: none;
  margin-right: 1rem;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  transition: all 0.3s ease;
}

.back-button:hover {
  background-color: rgba(255, 255, 255, 1);
  color: #495057;
}

.title {
  flex: 1;
  text-align: center;
  margin: 0;
  color: #833ab4;
  font-size: 1.8rem;
  font-weight: bold;
}

.main-content {
  flex: 1;
  padding: 0 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* 空状态样式 */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
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

.empty-state h2 {
  color: #833ab4;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
}

.empty-state p {
  color: #6c757d;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.create-button {
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
}

.create-button:hover {
  background-color: #ff5252;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}

/* 鸡尾酒卡片网格 */
.cocktails-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.cocktail-card {
  background-color: white;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: fadeIn 0.5s ease-in;
}

.cocktail-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.card-header {
  position: relative;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.cocktail-name {
  margin: 0;
  color: #833ab4;
  font-size: 1.4rem;
  text-align: center;
}

.delete-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.delete-button:hover {
  background-color: #ff5252;
  transform: scale(1.1);
}

.cocktail-image {
  padding: 1rem;
  text-align: center;
  background-color: #fff5f5;
}

.cocktail-image img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 15px;
  background-color: white;
  padding: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.cocktail-info {
  padding: 1.5rem;
}

.cocktail-date {
  color: #6c757d;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.cocktail-description {
  color: #495057;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.details-button {
  width: 100%;
  padding: 0.8rem;
  background-color: #833ab4;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.details-button:hover {
  background-color: #6d28d9;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(131, 58, 180, 0.3);
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background-color: white;
  border-radius: 30px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e9ecef;
  background-color: #f8f9fa;
  border-radius: 30px 30px 0 0;
}

.modal-title {
  margin: 0;
  color: #833ab4;
  font-size: 1.8rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.8rem;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.close-button:hover {
  background-color: #e9ecef;
  color: #495057;
}

.modal-body {
  padding: 2rem;
}

.modal-image {
  text-align: center;
  margin-bottom: 2rem;
}

.modal-image img {
  width: 150px;
  height: 150px;
  object-fit: contain;
  border-radius: 15px;
  background-color: #fff5f5;
  padding: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.modal-description {
  color: #495057;
  margin-bottom: 2rem;
  font-style: italic;
  line-height: 1.6;
}

.modal-ingredients,
.modal-instructions {
  margin-bottom: 2rem;
}

.modal-ingredients h3,
.modal-instructions h3 {
  color: #833ab4;
  margin-bottom: 1rem;
  border-bottom: 2px solid #f0e6ff;
  padding-bottom: 0.5rem;
}

.modal-ingredients ul {
  list-style-type: none;
  padding: 0;
}

.modal-ingredients li {
  padding: 0.5rem 0;
  color: #6c757d;
  display: flex;
  align-items: center;
}

.modal-ingredients li:before {
  content: '•';
  color: #833ab4;
  font-weight: bold;
  margin-right: 0.8rem;
}

.modal-instructions p {
  color: #6c757d;
  line-height: 1.6;
}

.modal-footer {
  padding: 1.5rem 2rem;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  border-radius: 0 0 30px 30px;
  text-align: center;
}

.creation-date {
  color: #6c757d;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
  
  .back-button {
    align-self: flex-start;
    margin-right: 0;
  }
  
  .title {
    text-align: center;
    font-size: 1.5rem;
  }
  
  .cocktails-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .modal-content {
    margin: 0 1rem;
  }
  
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 1.5rem 1rem;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
}
</style>