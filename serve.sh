#!/usr/bin/env bash
# Простой вьювер лендинга для браузера Windows.
# WSL2 сам пробрасывает localhost: запускаешь тут, открываешь http://localhost:8080 в Windows.
set -euo pipefail
cd "$(dirname "$0")"
PORT="${1:-8123}"

# порт занят — берём следующий свободный
is_free() { ! python3 -c "import socket,sys; s=socket.socket(); s.bind(('0.0.0.0', int(sys.argv[1])))" "$1" 2>/dev/null; }
i=0
while ! is_free "$PORT" && [ "$i" -lt 20 ]; do PORT=$((PORT+1)); i=$((i+1)); done

# WSL2 → Windows: localhost работает из коробки; запасной вариант — IP WSL:
WSL_IP=$(hostname -I 2>/dev/null | awk '{print $1}' || true)

echo "Лендинг доступен в браузере Windows:"
echo "  http://localhost:${PORT}"
[ -n "${WSL_IP}" ] && echo "  запасной: http://${WSL_IP}:${PORT}"
echo "Остановка: Ctrl+C"

exec python3 -m http.server "${PORT}" --bind 0.0.0.0
