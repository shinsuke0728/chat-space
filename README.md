# README

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group<br>
- belongs_to :user<br>

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|e-mail|string|null: false|
|password|string|null: false|

### Association
- has_many :messages<br>
- has_many :members<br>
- has_many :groups, through: :members<br>

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages<br>
- has_many :members<br>
- has_many :users, through: :members<br>

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
belongs_to :user<br>
belongs_to :group<br>






