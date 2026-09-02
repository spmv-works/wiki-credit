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

## 参照しているデータ

MediaWiki API の `extmetadata` から**次の3つだけ**を読んでいる。

実例: [File:New York City (New York, USA), Wall Street -- 2012 -- 6614.jpg](https://commons.wikimedia.org/wiki/File:New_York_City_(New_York,_USA),_Wall_Street_--_2012_--_6614.jpg)

| 出力の位置 | 参照フィールド | このファイルでの値 |
|---|---|---|
| 作者 | `Artist` | Dietmar Rabich |
| 年 | `DateTimeOriginal` | Taken on 30 July 2012, 12:22 → `2012` |
| ライセンス | `LicenseShortName` | CC BY-SA 4.0 → `CC-BY-SA-4.0` |

出力: `画像：Dietmar Rabich（2012）/CC-BY-SA-4.0`

生データは以下で確認できる（ブラウザで開ける）:

```
https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=extmetadata&titles=File:New_York_City_(New_York,_USA),_Wall_Street_--_2012_--_6614.jpg&format=json
```

### 読んでいないフィールド

同じAPIレスポンスには次も含まれるが、**このツールは参照しない**。

| フィールド | このファイルでの値 |
|---|---|
| `Attribution` | Dietmar Rabich |
| `AttributionRequired` | true |
| `LicenseUrl` | https://creativecommons.org/licenses/by-sa/4.0 |
| `Restrictions` | insignia |

出力形式は発注元の指定に従っている。上記を出力に含める必要がある場合は仕様変更が必要。

## 仕組み

MediaWiki API (`prop=imageinfo&iiprop=extmetadata`) から
Artist / DateTimeOriginal / LicenseShortName を取得して整形する。
サーバーは持たず、ブラウザから直接APIを叩く。
