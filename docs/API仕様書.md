# API 仕様書 (生成 AI と共に作成)

## **API 仕様書（API Specification）**

本ドキュメントは技術記事投稿プラットフォーム **myBlog** の API 仕様を定義する。

Supabase（PostgreSQL + Auth + Storage）を利用し、アプリ側では Supabase JS Client を使用する。

---

## **1. 前提**

- 認証：Supabase Auth（Email/Password）
- 通信方式：HTTPS / JSON
- DB：PostgreSQL
- エンドポイント：Supabase JS Client による操作（REST API 機能も併用可能）
- 認証必須 API と認証不要 API を明確化

---

## **2. 使用テーブル**

- users
- articles
- tags
- article_tag

---

## **3. API 一覧**

| カテゴリ | API                  | 説明             |
| -------- | -------------------- | ---------------- |
| 認証     | POST /auth/login     | ログイン         |
| 認証     | POST /auth/logout    | ログアウト       |
| ユーザー | GET /users/:id       | プロフィール取得 |
| 記事     | GET /articles        | 公開記事一覧     |
| 記事     | GET /articles/:id    | 記事詳細取得     |
| 記事     | POST /articles       | 新規記事投稿     |
| 記事     | PATCH /articles/:id  | 記事更新         |
| 記事     | DELETE /articles/:id | 記事削除         |
| タグ     | GET /tags            | タグ一覧         |
| タグ     | GET /tags/:tag       | タグ別記事取得   |

※ Supabase では `/rest/v1/...` が実際の REST エンドポイントだが、

本書では **アプリ側 API の仕様書** として記述。

---

---

## **4. 認証系 API**

---

### **4-1. ログイン**

### ● Endpoint

`POST /auth/login`

### ● Description

Email / Password を使用してログインする。

### ● Request Body

```json
{
  "email": "string",
  "password": "string"
}
```

### ● Response (Success)

```json
{
  "user": {
    "id": "uuid",
    "email": "string"
  },
  "session": {
    "access_token": "string",
    "refresh_token": "string"
  }
}
```

### ● Notes

- Supabase `signInWithPassword()` を使用。

---

### **4-2. ログアウト**

### ● Endpoint

`POST /auth/logout`

### ● Description

現在のセッションを破棄。

### ● Response

```json
{ "message": "logout success" }
```

---

---

## **5. ユーザー API**

---

### **5-1. プロフィール取得**

### ● Endpoint

`GET /users/:id`

### ● Description

ユーザー情報と、そのユーザーの公開記事一覧を取得する。

### ● Response Example

```json
{
  "id": "uuid",
  "name": "string",
  "bio": "string",
  "articles": [
    {
      "id": "uuid",
      "title": "string",
      "created_at": "timestamp"
    }
  ]
}
```

### ● Notes

- articles は `is_public = true` のみ返す。

---

---

## **6. 記事 API**

---

### **6-1. 公開記事一覧取得**

### ● Endpoint

`GET /articles`

### ● Query Parameters

| Name  | Type   | Description          |
| ----- | ------ | -------------------- |
| tag   | string | タグ絞り込み（任意） |
| limit | number | 表示件数             |
| order | string | `"desc"` (default)   |

### ● Response Example

```json
[
  {
    "id": "uuid",
    "title": "string",
    "tags": ["React", "Supabase"],
    "author": {
      "id": "uuid",
      "name": "string"
    },
    "created_at": "timestamp"
  }
]
```

### ● Behavior

- `is_public = true` の記事のみ返す
- タグ指定時は `article_tag` を JOIN

---

### **6-2. 記事詳細取得**

### ● Endpoint

`GET /articles/:id`

### ● Response Example

```json
{
  "id": "uuid",
  "title": "string",
  "content": "Markdown text",
  "tags": ["React", "Supabase"],
  "user": {
    "id": "uuid",
    "name": "string"
  },
  "is_public": true,
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### ● Notes

- `is_public = false` の記事は投稿者本人のみアクセス可能
- RLS により自動制御される

---

### **6-3. 新規記事投稿**

### ● Endpoint

`POST /articles`

### ● Auth

Required（ログイン必須）

### ● Request Body

```json
{
  "title": "string",
  "content": "string",
  "tags": ["React", "Supabase"],
  "is_public": true
}
```

### ● Response

```json
{
  "id": "uuid",
  "message": "created"
}
```

### ● Notes

- 既存タグがない場合は tags に INSERT
- article_tag に紐づけを作成

---

### **6-4. 記事更新**

### ● Endpoint

`PATCH /articles/:id`

### ● Auth

投稿者本人のみ

### ● Request Body

```json
{
  "title": "string",
  "content": "string",
  "tags": ["React"],
  "is_public": false
}
```

### ● Notes

- article_tag を一度削除 → 再 INSERT
- RLS により本人のみ更新可

---

### **6-5. 記事削除**

### ● Endpoint

`DELETE /articles/:id`

### ● Auth

投稿者本人のみ

### ● Response

```json
{ "message": "deleted" }
```

---

---

## **7. タグ API**

---

### **7-1. タグ一覧取得**

### ● Endpoint

`GET /tags`

### ● Response Example

```json
[
  { "id": "uuid", "name": "React" },
  { "id": "uuid", "name": "Supabase" }
]
```

---

### **7-2. タグ別記事一覧**

### ● Endpoint

`GET /tags/:tag`

### ● Description

指定タグの公開記事を返す。

### ● Response Example

```json
[
  {
    "id": "uuid",
    "title": "string",
    "author": "string",
    "created_at": "timestamp"
  }
]
```

---

---

## **8. エラーレスポンス（共通仕様）**

### ● エラー形式

```json
{
  "error": {
    "message": "string",
    "status": 400
  }
}
```

### 主なエラー一覧

| エラー名        | 状態 | 説明                       |
| --------------- | ---- | -------------------------- |
| Unauthorized    | 401  | ログインが必要             |
| Forbidden       | 403  | 記事の編集権限なし         |
| NotFound        | 404  | 記事・ユーザーが存在しない |
| ValidationError | 422  | 入力値エラー               |
| ServerError     | 500  | 想定外エラー               |

---

---

## **9. 今後の拡張（Phase2）**

| 機能     | API 追加案                  |
| -------- | --------------------------- |
| いいね   | POST /articles/:id/like     |
| コメント | POST /articles/:id/comments |
| 記事検索 | GET /articles?search=xxx    |
| OGP      | GET /ogp/:article_id        |
