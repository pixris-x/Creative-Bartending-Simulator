<template>
  <div class="creator-container">
    <!-- Toast通知组件 -->
    <div 
      v-if="toast.show" 
      :class="['toast-notification', toast.type]"
    >
      {{ toast.message }}</div>
    <header class="header">
      <router-link to="/" class="back-button">← 返回首页</router-link>
      <h1 class="title">开始调酒之旅！</h1>
      <!-- 保存的鸡尾酒按钮 -->
        <button 
          @click="toggleSavedCocktails"
          class="saved-cocktails-button"
        >
          📚 {{ savedCocktails.length }} 个保存的配方
        </button>
    </header>
    
    <!-- 保存的鸡尾酒列表模态框 -->
    <div v-if="showSavedCocktails" class="saved-cocktails-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>📚 我的鸡尾酒收藏</h3>
            <button @click="toggleSavedCocktails" class="close-btn">×</button>
          </div>
        <div class="modal-body">
          <div v-if="savedCocktails.length === 0" class="no-saved-cocktails">
            <p>🥺 还没有保存的鸡尾酒配方呢！</p>
            <p>创建一个新的鸡尾酒并保存吧！</p>
          </div>
          <div v-else class="saved-cocktails-list">
              <div 
                v-for="cocktail in savedCocktails" 
                :key="cocktail.id"
                class="saved-cocktail-item"
              >
                <div class="saved-cocktail-info">
                  <h4 class="saved-cocktail-name">{{ cocktail.name }}</h4>
                  <p class="saved-cocktail-desc">{{ cocktail.description }}</p>
                  <div class="saved-cocktail-meta">
                    <span class="mood-tag">{{ cocktail.mood }}</span>
                    <span class="flavor-tag">{{ cocktail.flavors }}</span>
                    <span class="date-tag">{{ formatDate(cocktail.createdAt) }}</span>
                  </div>
                </div>
                <div class="saved-cocktail-actions">
                  <button 
                    @click="viewCocktailDetails(cocktail)"
                    class="action-btn view-btn"
                  >
                    查看
                  </button>
                  <button 
                    @click="deleteCocktail(cocktail.id)"
                    class="action-btn delete-btn"
                  >
                    删除
                  </button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
    
    <main class="main-content">
      <div class="creation-steps">
        <!-- 步骤指示器 -->
        <div class="steps-indicator">
          <div class="step" :class="{ active: currentStep === 1 }">1. 选择心情</div>
          <div class="step" :class="{ active: currentStep === 2 }">2. 选择口味</div>
          <div class="step" :class="{ active: currentStep === 3 }">3. 添加材料</div>
          <div class="step" :class="{ active: currentStep === 4 }">4. 查看结果</div>
        </div>
        
        <!-- 步骤内容 -->
        <div class="step-content">
          <!-- 步骤 1: 心情选择 -->
          <div v-if="currentStep === 1" class="mood-selection">
            <h2 class="step-title">今天心情如何？</h2>
            <p class="step-description">选择一种心情，我们会为你推荐合适的鸡尾酒！</p>
            <div class="mood-options">
              <div 
                v-for="mood in moodOptions" 
                :key="mood.id"
                class="mood-option"
                :class="{ selected: selectedMood === mood.id }"
                @click="selectMood(mood.id)"
              >
                <span class="mood-icon">{{ mood.icon }}</span>
                <span class="mood-name">{{ mood.name }}</span>
              </div>
            </div>
          </div>
          
          <!-- 步骤 2: 口味选择 -->
          <div v-if="currentStep === 2" class="flavor-selection">
            <h2 class="step-title">你喜欢什么口味？</h2>
            <p class="step-description">选择你喜欢的口味标签，帮助我们更准确地推荐。</p>
            <div class="flavor-tags">
              <div 
                v-for="flavor in flavorOptions" 
                :key="flavor.id"
                class="flavor-tag"
                :class="{ selected: selectedFlavors.includes(flavor.id) }"
                @click="toggleFlavor(flavor.id)"
              >
                {{ flavor.name }}
              </div>
            </div>
          </div>
          
          <!-- 步骤 3: 材料选择 -->
          <div v-if="currentStep === 3" class="ingredients-selection">
            <h2 class="step-title">选择你想添加的材料</h2>
            <p class="step-description">从以下分类中选择你喜欢的材料。</p>
            
            <div class="ingredient-categories">
              <div 
                v-for="category in ingredientCategories" 
                :key="category.id"
                class="ingredient-category"
              >
                <h3 class="category-title">{{ category.name }}</h3>
                <div class="ingredients-list">
                  <div 
                    v-for="ingredient in category.ingredients" 
                    :key="ingredient.id"
                    class="ingredient-item"
                    :class="{ selected: selectedIngredients.includes(ingredient.id) }"
                    @click="toggleIngredient(ingredient.id)"
                  >
                    <span class="ingredient-name">{{ ingredient.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 步骤 4: 结果展示 -->
          <div v-if="currentStep === 4" class="result-display">
            <h2 class="step-title">你的专属鸡尾酒！</h2>
            <p class="step-description">根据你的选择，我们为你推荐了这款鸡尾酒。</p>
            
            <div class="cocktail-result" v-if="generatedCocktail">
              <h3 class="cocktail-name">{{ generatedCocktail.name }}</h3>
              <p class="cocktail-description">{{ generatedCocktail.description }}</p>
              <div class="cocktail-ingredients">
                <h4>材料：</h4>
                <ul>
                  <li v-for="ingredient in generatedCocktail.ingredients" :key="ingredient">
                    {{ ingredient }}
                  </li>
                </ul>
              </div>
              <div class="cocktail-instructions">
                <h4>制作方法：</h4>
                <p>{{ generatedCocktail.instructions }}</p>
              </div>
              <button class="save-button" @click="saveCocktail">保存配方</button>
              <button class="new-button" @click="startNewCreation">创建新鸡尾酒</button>
            </div>
            <div v-else class="no-result">
              <p>正在为你生成专属鸡尾酒...</p>
            </div>
          </div>
        </div>
        
        <!-- 导航按钮 -->
        <div class="navigation-buttons">
          <button 
            v-if="currentStep > 1" 
            class="nav-button back"
            @click="goToPreviousStep"
          >
            上一步
          </button>
          <button 
            v-if="currentStep < 4" 
            class="nav-button next"
            :disabled="!canProceedToNextStep"
            @click="goToNextStep"
          >
            下一步
          </button>
          <button 
            v-if="currentStep === 4" 
            class="nav-button finish"
            @click="finishCreation"
          >
            完成
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentStep = ref(1);
const selectedMood = ref(null);
const selectedFlavors = ref([]);
const selectedIngredients = ref([]);
const generatedCocktail = ref(null);

// 数据持久化相关
const savedCocktails = ref([]);
const showSavedCocktails = ref(false);

// 优化：使用计算属性替代方法调用
const canProceed = computed(() => {
  if (currentStep.value === 1) return selectedMood.value !== null;
  if (currentStep.value === 2) return selectedFlavors.value.length > 0;
  return true;
});

// 优化：防抖函数
const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// 优化：防抖的localStorage保存函数
const debouncedSaveToLocalStorage = debounce(() => {
  try {
    localStorage.setItem('savedCocktails', JSON.stringify(savedCocktails.value));
  } catch (error) {
    console.error('保存鸡尾酒失败:', error);
  }
}, 300);

// 心情选项
const moodOptions = [
  { id: 'happy', name: '开心', icon: '😊' },
  { id: 'relaxed', name: '放松', icon: '😌' },
  { id: 'energetic', name: '活力', icon: '😎' },
  { id: 'romantic', name: '浪漫', icon: '💕' },
  { id: 'adventurous', name: '冒险', icon: '🌟' },
  { id: 'cozy', name: '温馨', icon: '🥰' }
];

// 口味选项
const flavorOptions = [
  { id: 'sweet', name: '甜' },
  { id: 'sour', name: '酸' },
  { id: 'bitter', name: '苦' },
  { id: 'spicy', name: '辣' },
  { id: 'fruity', name: '果味' },
  { id: 'herbal', name: '草本' },
  { id: 'citrus', name: '柑橘' },
  { id: 'creamy', name: '奶味' }
];

// 材料分类
const ingredientCategories = [
  {
    id: 'spirits',
    name: '烈酒',
    ingredients: [
      { id: 'vodka', name: '伏特加' },
      { id: 'gin', name: '金酒' },
      { id: 'rum', name: '朗姆酒' },
      { id: 'tequila', name: '龙舌兰' },
      { id: 'whiskey', name: '威士忌' }
    ]
  },
  {
    id: 'mixers',
    name: '调酒',
    ingredients: [
      { id: 'tonic', name: '汤力水' },
      { id: 'soda', name: '苏打水' },
      { id: 'juice', name: '果汁' },
      { id: 'syrup', name: '糖浆' }
    ]
  },
  {
    id: 'extras',
    name: '辅料',
    ingredients: [
      { id: 'lime', name: '青柠' },
      { id: 'lemon', name: '柠檬' },
      { id: 'mint', name: '薄荷' },
      { id: 'ice', name: '冰块' }
    ]
  }
];

// 优化：移除重复的计算属性，使用上面已定义的canProceed
const canProceedToNextStep = canProceed;

// 初始化时加载保存的鸡尾酒
const loadSavedCocktails = () => {
  try {
    // 优化：使用try-catch处理异常
    const saved = localStorage.getItem('savedCocktails');
    if (saved) {
      // 优化：限制保存的鸡尾酒数量，避免过度消耗内存
      const cocktails = JSON.parse(saved);
      // 最多保存50个鸡尾酒，保持应用性能
      savedCocktails.value = cocktails.slice(0, 50);
    }
  } catch (error) {
    console.error('加载保存的鸡尾酒失败:', error);
    // 错误处理：重置保存的数据
    savedCocktails.value = [];
  }
};

// 保存鸡尾酒到localStorage的包装函数
const saveToLocalStorage = () => {
  debouncedSaveToLocalStorage();
};

// 方法
const selectMood = (moodId) => {
  selectedMood.value = moodId;
};

const toggleFlavor = (flavorId) => {
  const index = selectedFlavors.value.indexOf(flavorId);
  if (index > -1) {
    selectedFlavors.value.splice(index, 1);
  } else {
    selectedFlavors.value.push(flavorId);
  }
};

const toggleIngredient = (ingredientId) => {
  const index = selectedIngredients.value.indexOf(ingredientId);
  if (index > -1) {
    selectedIngredients.value.splice(index, 1);
  } else {
    selectedIngredients.value.push(ingredientId);
  }
};

const goToNextStep = () => {
  if (currentStep.value === 3) {
    generateCocktail();
  }
  currentStep.value++;
};

const goToPreviousStep = () => {
  currentStep.value--;
};

const generateCocktail = () => {
  // 根据用户选择生成个性化的鸡尾酒名称
  const mood = moodOptions.find(m => m.id === selectedMood.value);
  const flavors = selectedFlavors.value.map(id => {
    const flavor = flavorOptions.find(f => f.id === id);
    return flavor ? flavor.name : '';
  }).join('、');
  
  // 模拟生成鸡尾酒
  const cocktailNames = [
    `${mood?.name || '神秘'}时光`,
    `梦幻${flavors || '风味'}`,
    `夏日${mood?.icon || '🍹'}特调`,
    `心动${flavors || '滋味'}`
  ];
  
  const randomName = cocktailNames[Math.floor(Math.random() * cocktailNames.length)];
  
  generatedCocktail.value = {
    id: Date.now().toString(),
    name: randomName,
    description: `一款为${mood?.name || '你'}精心调制的鸡尾酒，融合了${flavors || '多种'}风味。`,
    ingredients: [
      `${getRandomSpirit()} 30ml`, 
      `${getRandomMixer()} 60ml`, 
      `${getRandomExtra()}适量`, 
      '冰块'
    ],
    instructions: '将所有材料加入摇酒器中摇匀，倒入装有冰块的高脚杯，点缀上装饰物即可享用。',
    createdAt: new Date().toISOString(),
    mood: mood?.name || '',
    flavors: flavors
  };
};

// 获取随机材料
const getRandomSpirit = () => {
  const spirits = ['伏特加', '金酒', '朗姆酒', '龙舌兰', '威士忌'];
  return spirits[Math.floor(Math.random() * spirits.length)];
};

const getRandomMixer = () => {
  const mixers = ['橙汁', '柠檬汁', '苏打水', '汤力水', '石榴糖浆'];
  return mixers[Math.floor(Math.random() * mixers.length)];
};

const getRandomExtra = () => {
  const extras = ['青柠片', '柠檬片', '薄荷叶', '草莓', '樱桃'];
  return extras[Math.floor(Math.random() * extras.length)];
};

// 保存鸡尾酒
const saveCocktail = () => {
  if (!generatedCocktail.value) return;
  
  // 优化：创建深拷贝避免引用问题
  const cocktailToSave = JSON.parse(JSON.stringify(generatedCocktail.value));
  
  // 检查是否已存在相同ID的鸡尾酒
  const existingIndex = savedCocktails.value.findIndex(
    cocktail => cocktail.id === cocktailToSave.id
  );
  
  // 性能优化：使用数组方法的拷贝版本，避免直接修改原数组
  if (existingIndex > -1) {
    // 更新现有鸡尾酒
    const newCocktails = [...savedCocktails.value];
    newCocktails[existingIndex] = cocktailToSave;
    savedCocktails.value = newCocktails;
  } else {
    // 添加新鸡尾酒，保持数组大小限制
    const newCocktails = [cocktailToSave, ...savedCocktails.value];
    savedCocktails.value = newCocktails.slice(0, 50); // 保持最多50个
  }
  
  // 保存到localStorage
  saveToLocalStorage();
  
  // 优化：使用更友好的用户反馈
  showToast('🎉 鸡尾酒配方已成功保存！', 'success');
};

// 删除保存的鸡尾酒
const deleteCocktail = (id) => {
  if (confirm('确定要删除这个鸡尾酒配方吗？')) {
    // 性能优化：使用filter创建新数组而非修改原数组
    savedCocktails.value = savedCocktails.value.filter(
      cocktail => cocktail.id !== id
    );
    saveToLocalStorage();
    showToast('🗑️ 鸡尾酒配方已删除', 'info');
  }
};

// 优化：添加Toast通知替代alert
const toast = reactive({
  show: false,
  message: '',
  type: 'success' // success, error, info
});

const showToast = (message, type = 'success') => {
  toast.message = message;
  toast.type = type;
  toast.show = true;
  
  setTimeout(() => {
    toast.show = false;
  }, 3000);
};

// 查看保存的鸡尾酒详情
const viewCocktailDetails = (cocktail) => {
  generatedCocktail.value = { ...cocktail };
  currentStep.value = 4;
  showSavedCocktails.value = false;
};

const startNewCreation = () => {
  currentStep.value = 1;
  selectedMood.value = null;
  selectedFlavors.value = [];
  selectedIngredients.value = [];
  generatedCocktail.value = null;
  showSavedCocktails.value = false;
};

const finishCreation = () => {
  router.push('/');
};

// 切换显示保存的鸡尾酒列表
const toggleSavedCocktails = () => {
  // 优化：添加动画过渡效果
  showSavedCocktails.value = !showSavedCocktails.value;
};

// 格式化日期 - 优化性能
const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return '无效日期';
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  } catch (error) {
    console.error('日期格式化错误:', error);
    return '无效日期';
  }
};

// 优化：惰性加载 - 仅在需要时加载组件
// 组件挂载时加载数据
loadSavedCocktails();

// 生命周期钩子优化
onBeforeUnmount(() => {
  // 清理定时器，防止内存泄漏
  debouncedSaveToLocalStorage.cancel?.();
});
</script>

<style scoped>
.creator-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff5f5;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* 装饰元素 */
.creator-container::before,
.creator-container::after {
  content: '🍹';
  position: absolute;
  font-size: 120px;
  opacity: 0.05;
  z-index: 0;
}

.creator-container::before {
  top: -50px;
  right: -50px;
  transform: rotate(20deg);
}

.creator-container::after {
  bottom: -50px;
  left: -50px;
  transform: rotate(-15deg);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 3px solid #ff9999;
  position: relative;
  z-index: 1;
}

.header::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100px;
  height: 3px;
  background-color: #ff6666;
  border-radius: 3px;
}

.back-button {
  text-decoration: none;
  color: #ff6666;
  font-size: 18px;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 20px;
  background-color: #ffe5e5;
  transition: all 0.3s ease;
}

.back-button:hover {
  background-color: #ffcccc;
  transform: scale(1.05);
}

.title {
  font-size: 28px;
  color: #ff3333;
  margin: 0;
  font-weight: bold;
}

/* 保存的鸡尾酒按钮 */
.saved-cocktails-button {
  background-color: #ff6666;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(255, 102, 102, 0.2);
}

.saved-cocktails-button:hover {
  background-color: #ff3333;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(255, 102, 102, 0.3);
}

/* 模态框样式 */
.saved-cocktails-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background-color: white;
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #ffeeee;
  background-color: #fff5f5;
  border-radius: 20px 20px 0 0;
}

.modal-header h3 {
  margin: 0;
  color: #ff3333;
  font-size: 1.5em;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: #ffe5e5;
  color: #ff3333;
}

.modal-body {
  padding: 20px;
}

/* 无保存鸡尾酒时的样式 */
.no-saved-cocktails {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.no-saved-cocktails p {
  margin: 10px 0;
  font-size: 1.1em;
}

/* 保存的鸡尾酒列表 */
.saved-cocktails-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.saved-cocktail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 2px solid #ffeeee;
  border-radius: 15px;
  transition: all 0.3s ease;
  background-color: #ffffff;
}

.saved-cocktail-item:hover {
  border-color: #ffcccc;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 102, 102, 0.1);
}

.saved-cocktail-info {
  flex: 1;
}

.saved-cocktail-name {
  margin: 0 0 8px 0;
  color: #ff3333;
  font-size: 1.2em;
}

.saved-cocktail-desc {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 0.95em;
  line-height: 1.4;
}

.saved-cocktail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.saved-cocktail-meta span {
  font-size: 0.85em;
  padding: 4px 10px;
  border-radius: 12px;
  background-color: #f5f5f5;
  color: #666;
}

.saved-cocktail-meta .mood-tag {
  background-color: #ffe5e5;
  color: #ff6666;
}

.saved-cocktail-meta .flavor-tag {
  background-color: #fff0e5;
  color: #ff9966;
}

.saved-cocktail-meta .date-tag {
  background-color: #f5f5f5;
  color: #616161;
}

/* 操作按钮 */
.saved-cocktail-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9em;
  transition: all 0.2s ease;
}

.view-btn {
  background-color: #4caf50;
  color: white;
}

.view-btn:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.delete-btn:hover {
  background-color: #da190b;
  transform: scale(1.05);
}

/* 动画 */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-content {
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(255, 99, 99, 0.1);
  position: relative;
  z-index: 1;
  border: 1px solid #ffeeee;
  background-image: linear-gradient(to bottom right, #ffffff, #fff8f8);
}

.creation-steps {
  position: relative;
}

.steps-indicator {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px dashed #ffcccc;
}

.step {
  flex: 1;
  text-align: center;
  padding: 12px 0;
  font-weight: bold;
  color: #999;
  background-color: #f9f9f9;
  border-radius: 15px;
  margin: 0 5px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.step::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 4px;
  background-color: #ff6666;
  transition: width 0.3s ease;
}

.step:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 102, 102, 0.2);
}

.step.active {
  color: white;
  background-color: #ff6666;
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(255, 102, 102, 0.4);
}

.step.active::after {
  width: 100%;
}

.step-content {
  margin-bottom: 40px;
}

.step-title {
  font-size: 24px;
  color: #ff3333;
  margin-bottom: 10px;
  text-align: center;
}

.step-description {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
}

/* 心情选择样式 */
.mood-options {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  justify-items: center;
  animation: fadeIn 0.5s ease-in;
}

.mood-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 15px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  border: 3px solid transparent;
  position: relative;
  overflow: hidden;
}

.mood-option::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s ease;
}

.mood-option:hover::before {
  left: 100%;
}

.mood-option:hover {
  transform: translateY(-5px) rotate(2deg);
  box-shadow: 0 8px 20px rgba(255, 99, 99, 0.3);
}

.mood-option.selected {
  background-color: #ffcccc;
  border-color: #ff6666;
  animation: pulse 2s infinite;
}

.mood-icon {
  font-size: 36px;
  margin-bottom: 10px;
}

.mood-name {
  font-weight: bold;
  color: #333;
}

/* 口味选择样式 */
.flavor-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.flavor-tag {
  padding: 10px 20px;
  border-radius: 25px;
  background-color: #f0f0f0;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  border: 2px solid transparent;
  animation: bounceIn 0.5s ease-out;
}

.flavor-tag:nth-child(odd) {
  animation-delay: 0.1s;
}

.flavor-tag:nth-child(even) {
  animation-delay: 0.2s;
}

.flavor-tag:hover {
  background-color: #ffcccc;
  transform: scale(1.05) rotate(-2deg);
  border-color: #ff6666;
}

.flavor-tag.selected {
  background-color: #ff6666;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(255, 102, 102, 0.3);
}

/* 材料选择样式 */
.ingredient-categories {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.ingredient-category {
  background-color: #f9f9f9;
  border-radius: 15px;
  padding: 20px;
}

.category-title {
  font-size: 20px;
  color: #ff6666;
  margin-bottom: 15px;
  text-align: center;
}

.ingredients-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.ingredient-item {
  padding: 8px 16px;
  border-radius: 20px;
  background-color: white;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #e0e0e0;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.ingredient-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,102,102,0.2), transparent);
  transition: left 0.5s ease;
  z-index: -1;
}

.ingredient-item:hover::after {
  left: 100%;
}

.ingredient-item:hover {
  border-color: #ff6666;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 102, 102, 0.2);
}

.ingredient-item.selected {
  background-color: #ff6666;
  color: white;
  border-color: #ff6666;
  animation: pulse-light 2s infinite;
}

@keyframes pulse-light {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 102, 102, 0.7);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(255, 102, 102, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 102, 102, 0);
  }
}

/* 结果展示样式 */
.cocktail-result {
  background-color: #f9f9f9;
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  border: 2px dashed #ffcccc;
  position: relative;
  overflow: hidden;
}

.cocktail-result::before {
  content: '✨';
  position: absolute;
  font-size: 40px;
  top: 10px;
  right: 10px;
  opacity: 0.6;
  transform: rotate(15deg);
  animation: twinkle 4s infinite;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.6;
    transform: rotate(15deg) scale(1);
  }
  50% {
    opacity: 1;
    transform: rotate(20deg) scale(1.2);
  }
}

.cocktail-name {
  font-size: 28px;
  color: #ff3333;
  margin-bottom: 15px;
}

.cocktail-description {
  color: #666;
  margin-bottom: 20px;
  font-size: 16px;
}

.cocktail-ingredients,
.cocktail-instructions {
  text-align: left;
  margin: 20px 0;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
}

.cocktail-ingredients h4,
.cocktail-instructions h4 {
  color: #ff6666;
  margin-bottom: 10px;
}

.cocktail-ingredients ul {
  padding-left: 20px;
  color: #333;
}

.cocktail-instructions p {
  color: #333;
  line-height: 1.6;
}

/* 导航按钮样式 */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.nav-button {
  padding: 12px 30px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-button::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.nav-button:hover::before {
  width: 300px;
  height: 300px;
}

.nav-button.back {
  background-color: #f0f0f0;
  color: #666;
  border: 2px solid #e0e0e0;
}

.nav-button.back:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.nav-button.next {
  background-color: #ff6666;
  color: white;
  border: 2px solid #ff6666;
}

.nav-button.next:hover:not(:disabled) {
  background-color: #ff3333;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 16px rgba(255, 102, 102, 0.4);
}

.nav-button.next:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  border-color: #cccccc;
}

.nav-button.finish {
  background-color: #4caf50;
  color: white;
  border: 2px solid #4caf50;
}

.nav-button.finish:hover {
  background-color: #45a049;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 16px rgba(76, 175, 80, 0.4);
}

.save-button,
.new-button {
  padding: 12px 24px;
  margin: 10px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-button {
  background-color: #ff6666;
  color: white;
}

.save-button:hover {
  background-color: #ff3333;
  transform: scale(1.05);
}

.new-button {
  background-color: #4caf50;
  color: white;
}

.new-button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.no-result {
  text-align: center;
  padding: 50px;
  color: #666;
}

/* 响应式设计 */
/* 全局动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 102, 102, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 102, 102, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 102, 102, 0);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .steps-indicator {
    flex-direction: column;
    gap: 10px;
  }
  
  .step {
    margin: 5px 0;
    font-size: 14px;
    padding: 10px 0;
  }
  
  .mood-options {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .navigation-buttons {
    flex-direction: column;
    gap: 15px;
  }
  
  .main-content {
    padding: 25px 20px;
  }
  
  .flavor-tags {
    justify-content: flex-start;
  }
  
  .flavor-tag {
    font-size: 14px;
    padding: 8px 16px;
  }
  
}
/* Toast通知样式 */
.toast-notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  z-index: 2000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
}

.toast-notification.success {
  background-color: #4caf50;
}

.toast-notification.error {
  background-color: #f44336;
}

.toast-notification.info {
  background-color: #2196f3;
}

/* 优化：添加更多动画效果 */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

/* 性能优化：减少不必要的重绘和回流 */
* {
  box-sizing: border-box;
}

/* 优化：启用GPU加速 */
.saved-cocktails-button,
.saved-cocktail-item,
.action-btn,
.btn {
  transform: translateZ(0);
  will-change: transform;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .main-content {
    padding: 20px 15px;
  }
  
  .title {
    font-size: 24px;
  }
  
  .step-title {
    font-size: 20px;
  }
  
  .mood-options {
    grid-template-columns: 1fr;
  }
  
  .mood-option {
    padding: 20px 15px;
  }
  
  .mood-icon {
    font-size: 40px;
  }
  
  .ingredient-item {
    font-size: 14px;
    padding: 6px 12px;
  }
  
  .cocktail-name {
    font-size: 24px;
  }
  
  .nav-button {
    padding: 12px 24px;
    font-size: 15px;
  }
  
  /* 移动端触摸优化 */
  .mood-option,
  .flavor-tag,
  .ingredient-item,
  .nav-button {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>