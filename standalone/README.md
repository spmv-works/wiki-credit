# Wikimedia Commons 注釈生成（単体HTML版）

`wiki-credit.html` をブラウザで開き、Commons の File: ページURLを貼って「生成」。
`画像：作者（年）/ライセンス` を出力する。1行1URLで複数まとめて処理可。

配布方法は URL を渡すだけ。インストール不要、Mac/Windows どちらでも動く。

## 公開手順（GitHub Pages）

1. GitHub でリポジトリを作る
2. `standalone/wiki-credit.html` を `index.html` としてpush
3. Settings > Pages > Branch: main / root
4. `https://<user>.github.io/<repo>/` を配る

## メールで送る場合

このHTML 1ファイルを添付するだけでよい。相手はダブルクリックで開ける。
`file://` で開かれたときは CORS を回避するため自動で JSONP に切り替わるので、
Safari でも Chrome でも動く。

ただし社内メールゲートウェイが HTML 添付を剥がすことがある。
継続的に配るなら GitHub Pages で URL を渡すほうが確実。
