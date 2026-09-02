# wiki-credit

Wikimedia Commons の File: ページURLから、動画テロップ用のクレジット文字列
`画像：作者（年）/ライセンス` を生成するツール。

**Web版（推奨）: https://spmv-works.github.io/wiki-credit/**

URLを貼って「生成」を押すだけ。1行1URLで複数まとめて処理できる。
インストール不要、ログイン不要、Mac/Windows どちらでも動く。

## 出力例

```
画像：Volfgang (talk)（2008）/CC-BY-SA-3.0
```

## 配布方法

- **URLを渡す** — 上のリンクをそのまま共有する。修正しても再配布不要
- **ファイルを渡す** — `index.html` 単体をメール添付で送ってもよい。
  `file://` で開かれた場合は JSONP に切り替わるため、Safari でも動く

## 仕組み

MediaWiki API (`prop=imageinfo&iiprop=extmetadata`) から
Artist / DateTimeOriginal / LicenseShortName を取得して整形する。
サーバーは持たず、ブラウザから直接APIを叩く。
