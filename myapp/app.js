// 引入 Express 模組
const express = require('express');
const app = express();
const port = 3000;

// --- 輔助函式：生成指定範圍的隨機整數 (保持不變) ---
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --- 角色基礎資料（固定不變） ---
const baseCharacters = [
  { id: 1, name: "戰神奎托斯" },
  { id: 2, name: "女武神布倫希爾德" },
  { id: 3, name: "吟遊詩人奧德賽" },
  { id: 4, name: "巨龍殺手多瓦金" }
];

// 設定戰鬥力的隨機範圍
const MIN_POWER = 5000;
const MAX_POWER = 15000;


// --- 定義 API 路由 (Endpoint) ---

// 1. 獲取所有角色資料的 API (GET /api/characters)
app.get('/api/characters', (req, res) => {
  
  // 核心變動：將資料生成/計算邏輯放在這裡 (路由函式內部)
  const charactersWithRandomPower = baseCharacters.map(char => ({
    ...char, // 複製原本的 id 和 name
    // 每次執行這個函式 (每次收到前端請求)，都會調用 getRandomInt
    combatPower: getRandomInt(MIN_POWER, MAX_POWER) 
  }));

  // 將新生成的資料以 JSON 格式回傳給前端
  res.json(charactersWithRandomPower);
  
  console.log(`[${new Date().toLocaleTimeString()}] API 被調用，生成了一組新的戰鬥力。`);
});


// 2. 根據 ID 獲取單一角色資料的 API (GET /api/characters/:id)
// 注意：這個單一查詢也需要重新計算戰鬥力
app.get('/api/characters/:id', (req, res) => {
  const characterId = parseInt(req.params.id);

  // 1. 找出基礎角色資料
  const baseCharacter = baseCharacters.find(c => c.id === characterId);

  if (baseCharacter) {
    // 2. 找到後，立即為其生成隨機戰鬥力
    const character = {
        ...baseCharacter,
        combatPower: getRandomInt(MIN_POWER, MAX_POWER) 
    };
    res.json(character);
    console.log(`[${new Date().toLocaleTimeString()}] API 調用單一角色 ID:${characterId}，生成了新的戰鬥力。`);
  } else {
    res.status(404).json({ message: 'Character not found' });
  }
});


// --- 啟動伺服器 ---
app.listen(port, () => {
  console.log(`🚀 遊戲 API 伺服器正在 http://localhost:${port} 運行`);
});