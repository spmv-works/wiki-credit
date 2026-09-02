(function () {
  var $ = function (id) { return document.getElementById(id); };
  var logEl = $("log");

  function log(msg, cls) {
    var line = document.createElement("div");
    if (cls) line.className = cls;
    line.textContent = "[" + new Date().toLocaleTimeString() + "] " + msg;
    logEl.appendChild(line);
    logEl.scrollTop = logEl.scrollHeight;
  }

  // ---------- Wikimedia Commons API ----------

  function extractTitle(url) {
    var u = String(url || "").trim();
    if (!u) throw new Error("URLが空です");
    var m = u.match(/\/wiki\/(File:[^?#]+)/i)
         || u.match(/[?&]title=(File:[^&#]+)/i);
    if (!m) throw new Error("Wikimedia Commons の File: URL ではありません");
    return decodeURIComponent(m[1]).replace(/_/g, " ");
  }

  function stripHtml(html) {
    var div = document.createElement("div");
    div.innerHTML = String(html || "");
    return div.textContent.replace(/\s+/g, " ").trim();
  }

  function extractYear(s) {
    var m = String(s || "").match(/(19|20)\d{2}/);
    return m ? m[0] : "";
  }

  function normalizeLicense(s) {
    var t = String(s || "").trim();
    if (!t) return "";
    t = t.replace(/^cc[- ]/i, "CC-");
    t = t.replace(/\s+/g, "-");
    t = t.replace(/--+/g, "-");
    return t.toUpperCase().replace("PUBLIC-DOMAIN", "Public Domain");
  }

  function fetchMeta(url) {
    var title = extractTitle(url);
    var api = "https://commons.wikimedia.org/w/api.php"
            + "?action=query&prop=imageinfo&iiprop=extmetadata"
            + "&titles=" + encodeURIComponent(title)
            + "&format=json&origin=*";
    return fetch(api).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    }).then(function (data) {
      var pages = (data && data.query && data.query.pages) || {};
      var keys = Object.keys(pages);
      if (!keys.length) throw new Error("API応答なし");
      var page = pages[keys[0]];
      if (page.missing !== undefined) throw new Error("ファイルが見つかりません: " + title);
      var info = (page.imageinfo && page.imageinfo[0]) || {};
      var ext = info.extmetadata || {};
      function v(key) { return ext[key] ? ext[key].value : ""; }
      var author = stripHtml(v("Artist"));
      var dateRaw = v("DateTimeOriginal") || v("DateTime");
      var year = extractYear(stripHtml(dateRaw));
      var license = normalizeLicense(stripHtml(v("LicenseShortName")));
      return { author: author, year: year, license: license, title: title };
    });
  }

  function buildCredit(a, y, l) {
    return "画像：" + (a || "?") + "（" + (y || "?") + "）/" + (l || "?");
  }

  // ---------- Search ----------

  function runSearch() {
    var url = $("url").value.trim();
    if (!url) { log("URLを入力してください", "err"); return; }
    log("生成中: " + url, "info");
    $("btn-search").disabled = true;
    Promise.resolve().then(function () { return fetchMeta(url); }).then(function (m) {
      $("author").value = m.author;
      $("year").value = m.year;
      $("license").value = m.license;
      $("credit").value = buildCredit(m.author, m.year, m.license);
      $("result-area").classList.remove("hidden");
      log("OK: " + $("credit").value, "ok");
    }).catch(function (e) {
      log("失敗: " + e.message, "err");
    }).then(function () {
      $("btn-search").disabled = false;
    });
  }

  $("btn-search").addEventListener("click", runSearch);

  // Enter で実行
  $("url").addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); runSearch(); }
  });

  // ペースト直後に自動実行
  $("url").addEventListener("paste", function (e) {
    setTimeout(runSearch, 50);
  });

  // メタ編集 → 出力即時更新
  ["author", "year", "license"].forEach(function (k) {
    $(k).addEventListener("input", function () {
      $("credit").value = buildCredit($("author").value, $("year").value, $("license").value);
    });
  });

  // ---------- Copy ----------

  $("btn-copy").addEventListener("click", function () {
    var t = $("credit").value;
    if (!t) return;
    var ta = document.createElement("textarea");
    ta.value = t;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); log("コピー: " + t, "ok"); }
    catch (e) { log("コピー失敗: " + e.message, "err"); }
    document.body.removeChild(ta);
  });
})();
