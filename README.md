# README

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group  
- belongs_to :user  

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|e-mail|string|null: false|
|password|string|null: false|

### Association
- has_many :messages  
- has_many :members  
- has_many :groups, through: :members  

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :members
- has_many :users, through: :members

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group






