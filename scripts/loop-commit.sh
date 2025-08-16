#!/usr/bin/env zsh
# Loop commits with configurable count, interval, and push option.
# Usage:
#   ./scripts/loop-commit.sh -n 5 -m "chore: heartbeat" -i 2 -p
# Flags:
#   -n  Number of commits (required)
#   -m  Commit message (default: "chore: loop commit")
#   -i  Interval seconds between commits (default: 1)
#   -p  Push after each commit (toggle). If not set, push once at end.
#   -f  File to touch/append (default: .commit-log)
#   -b  Branch (default: current)
#   -d  Dry run (no git commands executed)
set -euo pipefail

COUNT=""
MSG="chore: loop commit"
INTERVAL=1
PUSH_EACH=false
FILE=".commit-log"
BRANCH=""
DRY=false

while getopts "n:m:i:pf:b:d" opt; do
  case $opt in
    n) COUNT="$OPTARG" ;;
    m) MSG="$OPTARG" ;;
    i) INTERVAL="$OPTARG" ;;
    p) PUSH_EACH=true ;;
    f) FILE="$OPTARG" ;;
    b) BRANCH="$OPTARG" ;;
    d) DRY=true ;;
    *) echo "Usage: $0 -n <count> [-m msg] [-i sec] [-p] [-f file] [-b branch] [-d]"; exit 1 ;;
  esac
done

if [[ -z "$COUNT" ]]; then
  echo "Error: -n <count> is required" >&2
  exit 1
fi

# Ensure file exists
[[ -f "$FILE" ]] || echo "# auto commit log" > "$FILE"

# Detect current branch if not provided
if [[ -z "$BRANCH" ]]; then
  BRANCH=$(git rev-parse --abbrev-ref HEAD)
fi

echo "Loop commits: count=$COUNT, interval=${INTERVAL}s, push_each=$PUSH_EACH, file=$FILE, branch=$BRANCH"

for ((i=1; i<=COUNT; i++)); do
  ts=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
  echo "$ts $MSG #$i" >> "$FILE"
  if [[ "$DRY" == false ]]; then
    git add "$FILE"
    git commit -m "$MSG ($i/$COUNT)" --no-verify || echo "Nothing to commit at step $i"
    if [[ "$PUSH_EACH" == true ]]; then
      git push origin "$BRANCH" || echo "Push failed at step $i"
    fi
  else
    echo "DRY: git add $FILE && git commit -m '$MSG ($i/$COUNT)'"
  fi
  if (( i < COUNT )); then
    sleep "$INTERVAL"
  fi
done

if [[ "$PUSH_EACH" == false && "$DRY" == false ]]; then
  git push origin "$BRANCH"
fi

echo "Done."
