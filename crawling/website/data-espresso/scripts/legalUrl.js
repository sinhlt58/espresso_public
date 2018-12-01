var arr = [
    {
      "scope": "GLOBAL",
      "patterns": [
        "DenyPathQuery \\.jpg"
      ]
    },
    {
      "scope": "domain:batdongsan.com.vn",
      "patterns": [
        "AllowPathQuery \/ban-|\/cho-thue-|\/mua-|\/can-thue-|-mua|-thue",
        "DenyPathQuery .+"
      ]
    },
    {
      "scope": "domain:alonhadat.com.vn",
      "patterns": [
        "AllowPathQuery ban|thue|mua",
        "DenyPathQuery .+"
      ]
    },
    {
      "scope": "domain:muabannhadat.vn",
      "patterns": [
        "AllowPathQuery ban|thue|mua",
        "DenyPathQuery .+"
      ]
    },
    {
      "scope": "domain:nhadat24h.net",
      "patterns": [
        "AllowPathQuery ban|thue|mua",
        "AllowPathQuery ID([0-9]{2,})",
        "DenyPathQuery .+"
      ]
    },
    {
      "scope": "domain:lazada.vn",
      "patterns": [
        "AllowPathQuery products(.*)search=1",
        "AllowPathQuery page=",
        "DenyPathQuery .+"
      ]
    },
    {
      "scope": "domain:shopee.vn",
      "patterns": [
        "AllowPathQuery ([0-9]{2,})\\.([0-9]{2,})",
        "AllowPathQuery page=",
        "DenyPathQuery .+"
      ]
    },
    {
      "scope": "metadata:key=value",
      "patterns": [
        "DenyPath .+"
      ]
    },
    {
      "scope": "domain:muaban.net",
      "patterns": [
        "AllowPathQuery \/ban-dat|\/ban-nah|\/cho-thue-nha|\/can-mua-nha|cp=|id[0-9]{3,}",
        "AllowPathQuery \/biet-thu|\/can-ho-chung-cu|\/nha-hem-ngo",
        "AllowPathQuery \/dat-du-an|\/dat-nong-nghiep|\/dat-tho-cu",
        "DenyPathQuery .+"
      ]
    },
    {
      "scope": "domain:www.muabannhadat.vn",
      "patterns": [
        "AllowPathQuery \/nha-dat|\/nha-ban|\/ban-dat|-cho-thue|[0-9]{5,}|p=",
        "DenyPathQuery .+"
      ]
    },
    {
      "scope": "domain:nhadatso.com",
      "patterns": [
        "AllowPathQuery nha-dat-ban|nha-dat-cho-thue|[0-9]{6,}(.+)-x(.+)",
        "DenyPathQuery .+"
      ]
    },
    {
      "scope": "domain:homedy.com",
      "patterns": [
        "AllowPathQuery \/du-an|\/ban-nha-dat|\/ban-can-ho|\/ban-nha-rieng|\/ban-dat|\/ban-nha-mat-pho|\/ban-nha-biet-thu|es[0-9]{5,}",
        "AllowPathQuery \/cho-thue|p=",
        "DenyPathQuery .+"
      ]
    },
    {
      "scope": "domain:dothi.net",
      "patterns": [
        "AllowPathQuery \/nha-dat|\/ban-|\/cho-thue-|pr[0-9]{3,}|p[0-9]{1,}",
        "DenyPathQuery .+"
      ]
    },
    {
      "scope": "domain:123nhadat.vn",
      "patterns": [
        "AllowPathQuery \/ban-|\/cho-thue-|t[0-9]{3,}|\/[0-9]{1,}\/",
        "DenyPathQuery .+"
      ]
    },
    {
      "scope": "domain:kenhbds.vn",
      "patterns": [
        "AllowPathQuery \/can-ban|\/cho-thue|\/can-mua|\/can-thue|[0-9]{5,}\\.html|per_page",
        "DenyPathQuery .+"
      ]
    },
    {
      "scope": "domain:vnexpress.net",
      "patterns": [
        "AllowPathQuery vnexpress.net",
        "DenyPathQuery .+"
      ]
    }
  ]

db.legalUrl.insert(arr);	