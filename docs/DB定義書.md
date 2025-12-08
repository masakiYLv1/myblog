# DB 定義書 (生成 AI と共に作成)

## **DB 定義書（Database Definition Document）**

本書は、技術記事投稿プラットフォーム **myBlog** に使用するデータベースのテーブル仕様を定義する。

ER 図を基に、各テーブルの **カラム名・データ型・制約・用途** を明確にする。

DB：Supabase（PostgreSQL）

文字コード：UTF-8

管理方式：GitHub リポジトリ内でバージョン管理

---

---

## **1. テーブル一覧**

| テーブル名  | 用途                               |
| ----------- | ---------------------------------- |
| users       | ユーザー情報                       |
| articles    | 記事データ                         |
| tags        | タグ情報                           |
| article_tag | 記事とタグの中間テーブル（多対多） |

---

---

## **2. users テーブル**

## ■ テーブル概要

ユーザー情報を管理する。

Supabase Auth の uid と紐づく。

## ■ カラム仕様

| カラム名   | データ型  | NOT NULL | デフォルト        | 主キー | 説明                        |
| ---------- | --------- | -------- | ----------------- | ------ | --------------------------- |
| id         | uuid      | YES      | gen_random_uuid() | PK     | Auth の uid、ユーザー識別子 |
| name       | text      | YES      | なし              |        | ユーザー表示名              |
| bio        | text      | NO       | なし              |        | 自己紹介文                  |
| created_at | timestamp | YES      | now()             |        | 登録日時                    |

## ■ インデックス

| 種類  | 対象カラム | 説明               |
| ----- | ---------- | ------------------ |
| PK    | id         | 主キー             |
| INDEX | name       | 検索高速化（任意） |

---

---

## **3. articles テーブル**

## ■ テーブル概要

ユーザーが投稿した記事。

Markdown 形式で保存される。

## ■ カラム仕様

| カラム名   | データ型  | NOT NULL | デフォルト        | 主キー       | 説明          |
| ---------- | --------- | -------- | ----------------- | ------------ | ------------- |
| id         | uuid      | YES      | gen_random_uuid() | PK           | 記事 ID       |
| user_id    | uuid      | YES      | なし              | FK(users.id) | 著者 ID       |
| title      | text      | YES      | なし              |              | 記事タイトル  |
| content    | text      | YES      | なし              |              | Markdown 本文 |
| is_public  | boolean   | YES      | true              |              | 公開/下書き   |
| created_at | timestamp | YES      | now()             |              | 投稿日時      |
| updated_at | timestamp | YES      | now()             |              | 更新日時      |

## ■ 外部キー制約

| カラム  | 参照先    | ON DELETE                  | ON UPDATE |
| ------- | --------- | -------------------------- | --------- |
| user_id | users(id) | CASCADE（または RESTRICT） | CASCADE   |

## ■ インデックス

| 種類  | 対象カラム | 説明               |
| ----- | ---------- | ------------------ |
| PK    | id         | 主キー             |
| INDEX | user_id    | 著者での検索高速化 |
| INDEX | is_public  | 公開記事一覧用     |

---

---

## **4. tags テーブル**

## ■ テーブル概要

記事に付けるタグ。

## ■ カラム仕様

| カラム名 | データ型 | NOT NULL | デフォルト        | 主キー | 説明               |
| -------- | -------- | -------- | ----------------- | ------ | ------------------ |
| id       | uuid     | YES      | gen_random_uuid() | PK     | タグ ID            |
| name     | text     | YES      | なし              | UNIQUE | タグ名（ユニーク） |

## ■ インデックス

| 種類   | 対象カラム | 説明           |
| ------ | ---------- | -------------- |
| UNIQUE | name       | 重複タグの防止 |

---

---

## **5. article_tag テーブル（多対多）**

## ■ テーブル概要

articles と tags をつなぐ中間テーブル。

1 記事に複数タグ、1 タグに複数記事を実現。

## ■ カラム仕様

| カラム名   | データ型 | NOT NULL | デフォルト | 主キー   | 説明    |
| ---------- | -------- | -------- | ---------- | -------- | ------- |
| article_id | uuid     | YES      | なし       | PK(複合) | 記事 ID |
| tag_id     | uuid     | YES      | なし       | PK(複合) | タグ ID |

## ■ 外部キー制約

| カラム     | 参照先       | ON DELETE | ON UPDATE |
| ---------- | ------------ | --------- | --------- |
| article_id | articles(id) | CASCADE   | CASCADE   |
| tag_id     | tags(id)     | CASCADE   | CASCADE   |

## ■ 複合主キー

```
PRIMARY KEY (article_id, tag_id)

```

## ■ インデックス

| 種類  | 対象カラム | 説明                   |
| ----- | ---------- | ---------------------- |
| INDEX | tag_id     | タグ別記事一覧の高速化 |

---

---

## **6. RLS（Row Level Security）ポリシー案**

※ Supabase 用。要件定義に基づく。

### articles

| ポリシー名     | 内容                                  |
| -------------- | ------------------------------------- |
| 公開記事の閲覧 | is_public = true の記事は全員閲覧可能 |
| 自分の記事閲覧 | user_id = auth.uid() の記事は閲覧可能 |
| 自分の記事編集 | user_id = auth.uid() のみ UPDATE 可能 |
| 自分の記事削除 | user_id = auth.uid() のみ DELETE 可能 |

### article_tag

- 記事編集権限を持つユーザーのみ INSERT/DELETE 可能

### tags

- 誰でも SELECT 可能
- tag 追加はログインユーザーのみ（または記事投稿時自動生成）

---

---

## **7. テーブル間関係まとめ**

| 親テーブル | 子テーブル  | 関係                      |
| ---------- | ----------- | ------------------------- |
| users      | articles    | 1:N                       |
| articles   | article_tag | 1:N                       |
| tags       | article_tag | 1:N                       |
| articles   | tags        | N:N（中間テーブルで実現） |

---

---

## **8. 今後の拡張（任意）**

| 機能         | 追加テーブル案                           |
| ------------ | ---------------------------------------- |
| いいね機能   | likes（article_id, user_id）             |
| コメント     | comments（article_id, user_id, content） |
| ブックマーク | bookmarks（article_id, user_id）         |
| フォロー     | follows（follower_id, following_id）     |
