#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"

if ! gh auth status >/dev/null 2>&1; then
  echo "请先登录 GitHub："
  echo "  gh auth login --hostname github.com --git-protocol https --web"
  exit 1
fi

REPO_NAME="${1:-warehouse-finder}"
OWNER="$(gh api user -q .login)"

if git remote get-url origin >/dev/null 2>&1; then
  echo "已有 remote origin，直接推送..."
  git push -u origin main
else
  echo "创建仓库 ${OWNER}/${REPO_NAME} 并推送..."
  gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
fi

echo "开启 GitHub Pages..."
gh api --method POST "/repos/${OWNER}/${REPO_NAME}/pages" \
  -f build_type=legacy \
  -f "source[branch]=main" \
  -f "source[path]=/" 2>/dev/null \
  || gh api --method PUT "/repos/${OWNER}/${REPO_NAME}/pages" \
  -f build_type=legacy \
  -f "source[branch]=main" \
  -f "source[path]=/"

echo ""
echo "部署完成！约 1-2 分钟后可访问："
echo "  https://${OWNER}.github.io/${REPO_NAME}/"
echo ""
echo "手机用这个 HTTPS 链接打开，相机即可正常使用。"
