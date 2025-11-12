// 调酒服务 - 处理鸡尾酒生成算法

// 根据心情获取推荐的基酒
const getBaseSpiritByMood = (moodId) => {
  const moodSpirits = {
    happy: ['vodka', 'rum'],
    sad: ['whiskey', 'brandy'],
    excited: ['tequila', 'gin'],
    calm: ['gin', 'vodka'],
    romantic: ['rum', 'brandy'],
    energetic: ['tequila', 'whiskey']
  }
  return moodSpirits[moodId] || ['vodka']
}

// 根据口味偏好获取推荐的果汁
const getJuiceByFlavor = (flavorPreferences) => {
  const juices = []
  
  // 根据甜度偏好
  if (flavorPreferences.sweetness > 3) {
    juices.push('pineapple_juice', 'orange_juice')
  } else if (flavorPreferences.sweetness < 3) {
    juices.push('lemon_juice', 'lime_juice')
  } else {
    juices.push('cranberry_juice', 'grapefruit_juice')
  }
  
  // 根据酸度偏好
  if (flavorPreferences.sourness > 3) {
    juices.push('lemon_juice', 'lime_juice')
  }
  
  return [...new Set(juices)]
}

// 根据口味标签获取推荐的辅料
const getExtrasByTags = (tags) => {
  const tagExtras = {
    '果味': ['berries'],
    '花香': ['basil'],
    '香草': ['spices'],
    '柑橘': ['cucumber'],
    '热带': ['berries'],
    '辛辣': ['ginger', 'spices'],
    '奶油': [],
    '薄荷': ['mint']
  }
  
  const extras = []
  tags.forEach(tag => {
    if (tagExtras[tag]) {
      extras.push(...tagExtras[tag])
    }
  })
  
  return [...new Set(extras)]
}

// 根据酒精浓度偏好获取甜味剂推荐
const getSweetenerByAlcohol = (alcoholContent) => {
  if (alcoholContent > 3) {
    return ['simple_syrup', 'grenadine'] // 高酒精含量需要更多甜味平衡
  } else if (alcoholContent < 3) {
    return ['agave', 'honey'] // 低酒精可以使用更复杂的甜味
  }
  return ['simple_syrup'] // 中等酒精使用标准糖浆
}

// 生成鸡尾酒名称
const generateCocktailName = (moodId, flavorPreferences, selectedTags) => {
  // 心情词汇
  const moodWords = {
    happy: ['阳光', '欢乐', '微笑', '愉快', '开心'],
    sad: ['星空', '回忆', '宁静', '忧郁', '沉思'],
    excited: ['活力', '跳跃', '激情', '狂热', '兴奋'],
    calm: ['微风', '舒缓', '宁静', '平和', '放松'],
    romantic: ['爱情', '心动', '甜蜜', '浪漫', '温柔'],
    energetic: ['能量', '动力', '冲刺', '活力', '热情']
  }
  
  // 口味词汇
  let flavorWords = []
  
  // 根据甜度和酸度
  if (flavorPreferences.sweetness > 3) {
    flavorWords.push('甜蜜', '梦幻', '糖果', '香甜')
  } else if (flavorPreferences.sourness > 3) {
    flavorWords.push('酸爽', '清新', '活力', '醒脑')
  } else if (flavorPreferences.sweetness === 3 && flavorPreferences.sourness === 3) {
    flavorWords.push('和谐', '完美', '经典', '平衡')
  }
  
  // 根据酒精含量
  if (flavorPreferences.alcoholContent > 3) {
    flavorWords.push('浓烈', '醇厚', '强劲')
  } else if (flavorPreferences.alcoholContent < 3) {
    flavorWords.push('轻盈', '清爽', '淡雅')
  }
  
  // 根据标签添加特色词汇
  const tagWords = {
    '果味': '果香',
    '花香': '花香',
    '香草': '香草',
    '柑橘': '柑橘',
    '热带': '热带',
    '辛辣': '辛辣',
    '奶油': '丝滑',
    '薄荷': '清凉'
  }
  
  selectedTags.forEach(tag => {
    if (tagWords[tag]) {
      flavorWords.push(tagWords[tag])
    }
  })
  
  // 如果没有口味词汇，添加默认词汇
  if (flavorWords.length === 0) {
    flavorWords = ['特调', '风味', '创意', '经典']
  }
  
  // 随机选择词汇组合
  const randomMoodWord = moodWords[moodId][Math.floor(Math.random() * moodWords[moodId].length)]
  const randomFlavorWord = flavorWords[Math.floor(Math.random() * flavorWords.length)]
  
  return `${randomMoodWord}${randomFlavorWord}`
}

// 生成鸡尾酒描述
const generateCocktailDescription = (moodId, flavorPreferences, selectedTags) => {
  const moodDescriptions = {
    happy: ['这款鸡尾酒充满阳光般的活力', '每一口都带来愉悦的感受', '让人心情瞬间变好'],
    sad: ['这款鸡尾酒带有一丝忧郁的美感', '醇厚的口感让人沉浸在回忆中', '宁静而深沉的味道'],
    excited: ['强烈的风味让人热血沸腾', '充满激情的口感体验', '活力四射的味觉盛宴'],
    calm: ['平和的风味带来心灵的宁静', '舒缓压力的完美选择', '淡雅的味道让人放松'],
    romantic: ['浪漫的气息在口中绽放', '甜蜜的味道如同爱情', '温柔的口感让人沉醉'],
    energetic: ['强劲的口感让人充满能量', '活力十足的味觉冲击', '提神醒脑的完美选择']
  }
  
  const flavorDescriptions = []
  
  // 根据甜度
  if (flavorPreferences.sweetness > 3) {
    flavorDescriptions.push('甜度适中，回味无穷', '甜蜜的味道让人难以忘怀')
  } else if (flavorPreferences.sweetness < 3) {
    flavorDescriptions.push('低糖健康，清爽不腻', '淡雅的甜味恰到好处')
  }
  
  // 根据酸度
  if (flavorPreferences.sourness > 3) {
    flavorDescriptions.push('酸爽可口，提神醒脑', '清新的酸度让人胃口大开')
  } else if (flavorPreferences.sourness < 3) {
    flavorDescriptions.push('温和圆润，口感顺滑', '不会过于刺激的酸度')
  }
  
  // 根据酒精含量
  if (flavorPreferences.alcoholContent > 3) {
    flavorDescriptions.push('酒精浓度较高，适合慢慢品味', '醇厚的酒精口感')
  } else if (flavorPreferences.alcoholContent < 3) {
    flavorDescriptions.push('低酒精含量，轻松畅饮', '适合不胜酒力的朋友')
  }
  
  // 根据标签
  const tagDescriptions = {
    '果味': '浓郁的水果香气',
    '花香': '优雅的花香气息',
    '香草': '迷人的香草风味',
    '柑橘': '清新的柑橘香气',
    '热带': '仿佛置身热带岛屿',
    '辛辣': '独特的辛辣风味',
    '奶油': '丝滑如奶油般的口感',
    '薄荷': '清凉的薄荷风味'
  }
  
  selectedTags.forEach(tag => {
    if (tagDescriptions[tag]) {
      flavorDescriptions.push(tagDescriptions[tag])
    }
  })
  
  // 随机组合描述
  const randomMoodDesc = moodDescriptions[moodId][Math.floor(Math.random() * moodDescriptions[moodId].length)]
  
  let randomFlavorDesc = ''
  if (flavorDescriptions.length > 0) {
    const randomIndex = Math.floor(Math.random() * flavorDescriptions.length)
    randomFlavorDesc = flavorDescriptions[randomIndex]
  }
  
  const endings = [
    '，是您不容错过的美味佳饮。',
    '，为您的生活增添一抹亮色。',
    '，让每一刻都变得特别。',
    '，是派对和聚会的完美选择。',
    '，适合在各种场合享用。'
  ]
  
  const randomEnding = endings[Math.floor(Math.random() * endings.length)]
  
  if (randomFlavorDesc) {
    return `${randomMoodDesc}，${randomFlavorDesc}${randomEnding}`
  } else {
    return `${randomMoodDesc}${randomEnding}`
  }
}

// 生成制作步骤
const generateInstructions = (ingredients, alcoholContent) => {
  const baseInstructions = [
    '将所有材料加入摇酒器中，加入冰块摇匀',
    '在调酒器中加入冰块，依次加入所有材料',
    '先加入液体材料，再放入固体配料和冰块'
  ]
  
  const midInstructions = [
    '充分摇匀约30秒',
    '快速摇匀至外部结霜',
    '轻轻搅拌至材料充分混合'
  ]
  
  const endInstructions = [
    '然后倒入事先冰镇的鸡尾酒杯中，点缀装饰即可享用',
    '滤入冰镇的高脚杯中，用新鲜水果装饰',
    '倒入装满冰块的高球杯中，轻轻搅拌后享用'
  ]
  
  // 根据酒精含量调整步骤
  let shakeIntensity = '轻轻'
  if (alcoholContent > 3) {
    shakeIntensity = '用力'
  } else if (alcoholContent === 3) {
    shakeIntensity = '充分'
  }
  
  const randomBase = baseInstructions[Math.floor(Math.random() * baseInstructions.length)]
  const randomMid = midInstructions[Math.floor(Math.random() * midInstructions.length)]
  const randomEnd = endInstructions[Math.floor(Math.random() * endInstructions.length)]
  
  // 替换通用步骤中的强度描述
  const personalizedMid = randomMid.replace('充分', shakeIntensity).replace('快速', shakeIntensity)
  
  return `${randomBase}，${personalizedMid}，${randomEnd}`
}

// 根据用户选择生成鸡尾酒配方
const generateCocktail = (moodId, flavorPreferences, selectedTags, selectedIngredients, allIngredients) => {
  // 获取用户已选材料的详细信息
  const getUserSelectedIngredients = () => {
    const selected = []
    allIngredients.forEach(category => {
      category.items.forEach(item => {
        if (selectedIngredients.includes(item.id)) {
          selected.push(item)
        }
      })
    })
    return selected
  }
  
  // 检查是否已有基酒，如果没有则根据心情推荐
  const hasBaseSpirit = getUserSelectedIngredients().some(ing => 
    ['vodka', 'rum', 'gin', 'tequila', 'whiskey', 'brandy'].includes(ing.id)
  )
  
  // 生成鸡尾酒名称
  const name = generateCocktailName(moodId, flavorPreferences, selectedTags)
  
  // 生成鸡尾酒描述
  const description = generateCocktailDescription(moodId, flavorPreferences, selectedTags)
  
  // 获取材料列表（带数量建议）
  const getUserIngredientsWithAmount = () => {
    const userIngredients = getUserSelectedIngredients()
    const ingredientsWithAmount = []
    
    userIngredients.forEach(ingredient => {
      let amount = ''
      
      // 根据材料类型添加适量建议
      if (['vodka', 'rum', 'gin', 'tequila', 'whiskey', 'brandy'].includes(ingredient.id)) {
        if (flavorPreferences.alcoholContent > 3) {
          amount = '60ml'
        } else if (flavorPreferences.alcoholContent < 3) {
          amount = '30ml'
        } else {
          amount = '45ml'
        }
      } else if (['orange_juice', 'lemon_juice', 'lime_juice', 'pineapple_juice', 'grapefruit_juice', 'cranberry_juice'].includes(ingredient.id)) {
        amount = '30-60ml'
      } else if (['simple_syrup', 'honey', 'maple_syrup', 'agave', 'grenadine'].includes(ingredient.id)) {
        if (flavorPreferences.sweetness > 3) {
          amount = '20ml'
        } else {
          amount = '10ml'
        }
      } else {
        amount = '适量'
      }
      
      ingredientsWithAmount.push(`${ingredient.emoji} ${ingredient.name} ${amount}`)
    })
    
    return ingredientsWithAmount
  }
  
  // 生成制作步骤
  const instructions = generateInstructions(selectedIngredients, flavorPreferences.alcoholContent)
  
  return {
    name,
    description,
    image: '/cocktail-placeholder.png',
    ingredients: getUserIngredientsWithAmount(),
    instructions
  }
}

// 导出服务方法
export default {
  getBaseSpiritByMood,
  getJuiceByFlavor,
  getExtrasByTags,
  getSweetenerByAlcohol,
  generateCocktailName,
  generateCocktailDescription,
  generateInstructions,
  generateCocktail
}