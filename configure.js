/*
📝 | Created By King Caesar
🖥️ | Dexter-MD WhatsApp Bot 
📌 | Credits: King Caesar
📱 | WhatsApp: +2348078112891
👑 | Github: (your_github_if_any)
✉️ | Email: (your_email_if_any)
*/

const fs = require('fs');
const chalk = require('chalk');

//=================================================//
// Bot Settings
global.owner = ['2348078112891'] // Your number
global.ownernomer = "2348078112891" // Backup owner number
global.ownername = "King Caesar" // Your name
global.botname = "Dexter-MD" // Bot name
global.ytname = "YT: (your_YT_name)" // Optional
global.socialm = "IG: (your_IG)" // Optional 
global.location = "Nigeria" // Your country
global.website = "https://whatsapp.com/channel/0029VautBuL7NoZwPcAxlJ1a" // Your channel link
global.themeemoji = "⚡" // Bot theme emoji

// Bot Features
global.xprefix = ['.', '#', '!', '&'] // Prefix symbols
global.autostatus = true // Auto-status change
global.Public = true // Public/Private bot
global.sessionName = 'session' // Session file name
global.codeInvite = "" // Group invite code (if any)

// API Keys (Fill if needed)
global.openai_key = "your_openai_key" // For AI features
global.capikey = "" // Remove if unused
global.deepseek = {
  apiKey: process.env.DEEPSEEK_API_KEY || "your-deepseek-api-key", // DeepSeek API key (use env variable for security)
  endpoint: "https://api.deepseek.com/v1/chat/completions", // DeepSeek API endpoint
  model: "deepseek-chat" // DeepSeek model (e.g., deepseek-chat for DeepSeek-V3)
};

// Media
global.thumb = { url: 'https://i.imgur.com/your_thumb.jpg' } // Thumbnail
global.defaultpp = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' // Default profile pic

// Messages
global.mess = {
  owner: '🔒 *Command reserved for owner only!*',
  admin: '🔒 *Admins only!*',
  group: '🚫 *Group-only feature!*',
  private: '📩 *Use this in private chat.*',
  done: '✅ *Done!*',
  error: '❌ *Error!*',
  wait: '⏳ *Loading...*',
  success: '✨ *Success!*'
}

// Limits (Free/Premium users)
global.limit = {
  free: 10, // Free user limits
  premium: 'Infinity' // Premium user limits
}

// Channel/Link Settings
global.linkchannel = {
  id: "120363372633282419@newsletter", // Channel ID (if any)
  name: "𝙃𝙄𝙈 ⸙ 𝙎𝙃𝙊𝙋 متجر له🛍", // Channel name
  link: "https://whatsapp.com/channel/0029VautBuL7NoZwPcAxlJ1a" // Your link
}
