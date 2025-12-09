// 引入 Express 模組
const express = require('express');
const app = express();
const port = 3000; // API 監聽的埠號

// --- 模擬資料庫或資料來源 ---
// 這裡我們直接使用一個 JavaScript 陣列來儲存遊戲角色資料
const characters = [
  { id: 1, name: "戰神奎托斯", combatPower: 9500 },
  { id: 2, name: "女武神布倫希爾德", combatPower: 12000 },
  { id: 3, name: "吟遊詩人奧德賽", combatPower: 6800 },
  { id: 4, name: "巨龍殺手多瓦金", combatPower: 15000 }
];

// --- 定義 API 路由 (Endpoint) ---

// 1. 獲取所有角色資料的 API (GET /api/characters)
app.get('/api/characters', (req, res) => {
  // 將資料以 JSON 格式回傳給前端
  res.json(characters);
});

// 2. 根據 ID 獲取單一角色資料的 API (GET /api/characters/:id)
app.get('/api/characters/:id', (req, res) => {
  // 從 URL 參數中取得 id (注意: req.params.id 取得的是字串)
  const characterId = parseInt(req.params.id);

  // 在資料陣列中尋找符合 ID 的角色
  const character = characters.find(c => c.id === characterId);

  if (character) {
    // 找到角色，回傳 JSON 資料
    res.json(character);
  } else {
    // 找不到角色，回傳 404 Not Found 狀態碼
    res.status(404).json({ message: 'Character not found' });
  }
});


// --- 啟動伺服器 ---
app.listen(port, () => {
  console.log(`🚀 遊戲 API 伺服器正在 http://localhost:${port} 運行`);
  console.log(`✨ 測試所有角色：http://localhost:${port}/api/characters`);
  console.log(`✨ 測試單一角色：http://localhost:${port}/api/characters/1`);
});