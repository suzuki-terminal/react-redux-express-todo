# React Todo Example

## 主要ライブラリ

- react
- redux

## セットアップ

```
npm install
npm start
```

open [http://localhost:8080](http://localhost:8080)


## redux 導入のメリット

### メリット

- Fluxにより, viewの更新フローを一方向に限定することができる
    - action → reducer → view

- データのバケツリレーが少なくて済む


## 課題

- reducer内で非同期処理を扱うことができない.
    - Containerもしくはactionの関数内で処理を行うことになり, 見通しが悪い
    
- reducerでデータ更新は参照を変更する必要があり, Object.assignによる更新をしなければならない
    - ネストの深いデータの更新がかなりやりづらい

## TODO

次は, 非同期処理まわりのためredux-sagaを導入してみます。

[react-redux-saga-express-todo](https://github.com/suzuki-terminal/react-redux-saga-express-todo)