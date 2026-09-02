# Wikimedia Commons 注釈生成（単体HTML版）

`wiki-credit.html` をブラウザで開き、Commons の File: ページURLを貼って「生成」。
`画像：作者（年）/ライセンス` を出力する。1行1URLで複数まとめて処理可。

配布方法は URL を渡すだけ。インストール不要、Mac/Windows どちらでも動く。

## 公開手順（GitHub Pages）

1. GitHub でリポジトリを作る
2. `standalone/wiki-credit.html` を `index.html` としてpush
3. Settings > Pages > Branch: main / root
4. `https://<user>.github.io/<repo>/` を配る

## 注意

- MediaWiki API を直接叩くため、`file://` で直接開くと CORS で失敗することがある。
  HTTP(S) 配信（GitHub Pages / Vercel / ローカルの `python3 -m http.server`）で使う。
