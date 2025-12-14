#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="${1:-.}"
ROOT_DIR="$(cd "$ROOT_DIR" && pwd)"
BUILD_DIR="$ROOT_DIR/_build"

mkdir -p "$BUILD_DIR"

command -v latexmk >/dev/null 2>&1 || {
  echo "Error: latexmk not found. Install TeX Live." >&2
  exit 1
}

command -v dvisvgm >/dev/null 2>&1 || {
  echo "Error: dvisvgm not found. Install dvisvgm (MiKTeX/TeX Live)." >&2
  exit 1
}

shopt -s nullglob
TEX_FILES=("$ROOT_DIR"/*.tex)

if [ "${#TEX_FILES[@]}" -eq 0 ]; then
  echo "No .tex files found in $ROOT_DIR" >&2
  exit 1
fi

for TEX in "${TEX_FILES[@]}"; do
  BASENAME="$(basename "$TEX" .tex)"
  WORK="$BUILD_DIR/$BASENAME"
  mkdir -p "$WORK"

  cp -n "$ROOT_DIR"/*.tsv "$WORK/" 2>/dev/null || true
  cp -n "$ROOT_DIR"/*.csv "$WORK/" 2>/dev/null || true

  cat > "$WORK/$BASENAME.tex" <<EOF
\documentclass[tikz,border=2pt]{standalone}
\usepackage{pgfplots}
\pgfplotsset{compat=1.18}
\usepackage{prettypgfplots}
\begin{document}
EOF

  cat "$TEX" >> "$WORK/$BASENAME.tex"

  cat >> "$WORK/$BASENAME.tex" <<EOF
\end{document}
EOF

  latexmk -pdf \
    -interaction=nonstopmode \
    -halt-on-error \
    -file-line-error \
    -outdir="$WORK" \
    "$WORK/$BASENAME.tex" >/dev/null

  cp "$WORK/$BASENAME.pdf" "$ROOT_DIR/$BASENAME.pdf"

  dvisvgm --pdf --font-format=woff --precision=2 \
    "$WORK/$BASENAME.pdf" -o "$WORK/$BASENAME.svg" >/dev/null

  cp "$WORK/$BASENAME.svg" "$ROOT_DIR/$BASENAME.svg"

  echo "✓ Built $ROOT_DIR/$BASENAME.pdf and .svg"
done

echo "Done."
