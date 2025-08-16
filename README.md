# Blog Me — Codecools Company (lo)

ເວັບ static ສຳລັບແບ່ງປັນໂຄງການ ແລະ ບົດຄວາມ ຂອງ Codecools Company ກໍ່ຕັ້ງໂດຍ thongsao phoumvipahat. ຂໍ້ມູນໃນ repo ນີ້ເປັນຕົວຢ່າງ (placeholder) ບໍ່ໃຊ້ຂໍ້ມູນຈິງ.

## ໂຄງສ້າງ
- `index.html` — ໜ້າຫຼັກ
- `projects.html`, `blog.html`, `about.html`, `contact.html`
- `assets/` — CSS / JS / ຮູບ

## ການໃຊ້ງານທ້ອງຖິ່ນ
ເປີດ `index.html` ໂດຍກົດຄື່ນສອງ ຫຼືໃຊ້ Live Server.

## Deploy ຂຶ້ນ GitHub Pages
1. Settings → Pages → Source: `main` (`/root`).
2. ລໍຖ້າ 1-2 ນາທີ ແລ້ວເຂົ້າຊົມ URL ທີ່ GitHub ໃຫ້.

## License
MIT

## ສະຄຣິບສຳລັບ loop commit
ໃຊ້ `scripts/loop-commit.sh` ເພື່ອຄອມມິດຫຼາຍໆເທື່ອຕາມຈຳນວນທີ່ກຳນົດ (ເພື່ອທົດສອບ/ໂຄງການ demo)

ຕົວຢ່າງ:
```zsh
chmod +x scripts/loop-commit.sh
./scripts/loop-commit.sh -n 5 -m "chore: heartbeat" -i 2 -p
```
ອະທິບາຍ:
- `-n` ຈຳນວນ commit
- `-m` ຂໍ້ຄວາມ commit
- `-i` ໄລຍະຫ່າງລະຫວ່າງ commit (ວິນາທີ)
- `-p` push ຫຼັງຈາກແຕ່ລະ commit (ຖ້າບໍ່ໃສ່ ຈະ push ທ້າຍສຸດ)
- `-f` ໄຟລ໌ທີ່ໃຊ້ບັນທຶກ (default: `.commit-log`)
- `-d` dry-run ບໍ່ຮັນ git
