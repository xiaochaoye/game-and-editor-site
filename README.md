# game-and-editor-site

vercel部署网页需要翻墙才可访问，附上[cloudflare部署版本链接](https://game-and-editor-site.pages.dev/) 

## 在cloudflare D1 数据库内创建两张表
```sql
CREATE TABLE IF NOT EXISTS user (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 username TEXT NOT NULL,
 timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 username TEXT NOT NULL,
 message TEXT NOT NULL,
 photo_message blob,
 timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

```
