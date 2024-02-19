# 簡易仕様書

### アプリ名

すぐグル

### 公開したアプリの URL

https://suguguru.vercel.app/

### 該当プロジェクトのリポジトリ URL

https://github.com/YoshitakaKyougoku/suguguru

## 開発環境

### 開発環境

vsCode

### 開発言語

TypeScript

## 動作対象端末・OS

### 動作対象 OS

Google Chrome (ver.121.0.6167.160)

## 開発期間

14 日間

## アプリケーション機能

### 機能一覧

- レストラン検索：ホットペッパーグルメサーチ API を使用して、現在地周辺の飲食店を検索する。
- レストラン情報取得：ホットペッパーグルメサーチ API を使用して、飲食店の詳細情報を取得する。
- GoogleMap 連携:：飲食店の所在地及びルートを GoogleMap で見られるようにする。

### 画面一覧

- 検索画面 ：条件を指定してレストランを検索する。
- 一覧画面 ：検索結果の飲食店を一覧表示する。
- 詳細画面 : 店の詳細情報を表示する

### フレームワーク

Next.js (ver.14.1.0)

### 設計ドキュメント

```plantuml
!include screen-transition.puml
```

[画面遷移図](./screen-transition.puml)

#### コンセプト

近くの美味しいお店がすぐ見つかる

#### こだわったポイント

- Google Map のルート検索に直接リンクするようにした
- 検索画面で TOP3 形式でおすすめを表示することで検索を介さなくても店の情報を知れるようにした

### デザイン面でこだわったポイント

- 検索画面の現在地からの距離の選択をスライダーにすることで視覚的にわかりやすくした
- 暖色ベースのデザインにすることで食欲をそそるようにした

### アドバイスして欲しいポイント

- ほぼ全てクライアントサイドレンダリングになってしまっているのでサーバーサイドでの処理を増やしたい
- ローディング画面をロードする必要のある部分だけ表示されるようにしたい

### 自己評価

- エラーハンドリングやロード画面の実装など細かいところまで詰められていない。

- 基礎の部分で実力が足りない部分が多いので実装のスピードが遅かったと思う。

- しかし、目標としていた GoogleMap との連携はできたのでその点は良かった。

## 申し送り

### 今後実装すべき機能

- 詳細画面から一覧画面へ戻るボタン

### わかっている不具合

- データフェッチができない or 検索結果が 0 件 の時にロードし続けてしまう
