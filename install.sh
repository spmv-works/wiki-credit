#!/usr/bin/env bash
# Wiki Credit インストールスクリプト
set -e

EXT_NAME="com.dpg.wiki-credit"
EXT_SRC="$(cd "$(dirname "$0")" && pwd)/extension"
EXT_DST="$HOME/Library/Application Support/Adobe/CEP/extensions/$EXT_NAME"

echo "==> Wiki Credit インストール開始"

echo "==> CEP デバッグモード設定 (CEP 11, 12)"
defaults write com.adobe.CSXS.11 PlayerDebugMode 1 2>/dev/null || true
defaults write com.adobe.CSXS.12 PlayerDebugMode 1 2>/dev/null || true

mkdir -p "$HOME/Library/Application Support/Adobe/CEP/extensions"
if [ -L "$EXT_DST" ] || [ -e "$EXT_DST" ]; then
    echo "==> 既存リンクを削除"
    rm -rf "$EXT_DST"
fi
ln -s "$EXT_SRC" "$EXT_DST"
echo "==> 拡張機能リンク: $EXT_DST → $EXT_SRC"

echo ""
echo "==> インストール完了"
echo "    Premiere Pro を完全終了 → 再起動"
echo "    メニュー: ウィンドウ > 拡張機能 > Wikiクレジット"
