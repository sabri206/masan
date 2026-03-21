#!/usr/bin/env bash
set -euo pipefail

SERVER_USER="root"
SERVER_HOST="165.245.190.166"
REMOTE_DIR="/root/masan"
REMOTE_BACKUP_DIR="/root/masan_backups"
LOCAL_DIR="/Users/sabriyousif/Desktop/masan"
APP_NAME="masan"
SSH_TARGET="${SERVER_USER}@${SERVER_HOST}"
KEEP_BACKUPS=7

timestamp="$(date +"%Y%m%d-%H%M%S")"

# Auth mode:
# - Preferred non-interactive password mode: export SSHPASS='your-password' with sshpass installed
# - Fallback: interactive SSH password prompt (works without sshpass)
if [[ -n "${SSHPASS:-}" ]]; then
	if ! command -v sshpass >/dev/null 2>&1; then
		echo "[WARN] SSHPASS is set but sshpass is not installed."
		echo "[HINT] Falling back to interactive password prompts."
		unset SSHPASS
		SSH_CMD=(ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=accept-new)
		RSYNC_SSH_CMD="ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=accept-new"
		AUTH_MODE="interactive-password"
	else
		SSH_CMD=(sshpass -e ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=accept-new)
		RSYNC_SSH_CMD="sshpass -e ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=accept-new"
		AUTH_MODE="password (sshpass)"
	fi
else
	SSH_CMD=(ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=accept-new)
	RSYNC_SSH_CMD="ssh -o ConnectTimeout=10 -o StrictHostKeyChecking=accept-new"
	AUTH_MODE="ssh-key-or-interactive-password"
fi

run_ssh() {
	"${SSH_CMD[@]}" "${SSH_TARGET}" "$1"
}

on_error() {
	local exit_code=$?
	echo "[ERROR] Deployment failed at line ${BASH_LINENO[0]} (exit: ${exit_code})."
	echo "[HINT] Check SSH access, remote disk space, and PM2 logs: pm2 logs ${APP_NAME}"
	exit "${exit_code}"
}
trap on_error ERR

echo "[1/6] Checking SSH connection (${AUTH_MODE})..."
run_ssh "echo connected >/dev/null"

echo "[2/6] Creating remote backup (if app directory exists)..."
run_ssh "
	set -euo pipefail
	mkdir -p '${REMOTE_BACKUP_DIR}'
	if [ -d '${REMOTE_DIR}' ]; then
		tar -czf '${REMOTE_BACKUP_DIR}/masan-${timestamp}.tar.gz' -C '/root' 'masan'
		echo 'backup=ok file=${REMOTE_BACKUP_DIR}/masan-${timestamp}.tar.gz'
		# Keep only latest N backups to prevent disk growth.
		find '${REMOTE_BACKUP_DIR}' -maxdepth 1 -type f -name 'masan-*.tar.gz' -print0 \
			| xargs -0 ls -1t \
			| tail -n +$((KEEP_BACKUPS + 1)) \
			| xargs -I {} rm -f "{}" || true
	else
		echo 'backup=skip (remote app directory not found yet)'
	fi
"

echo "[3/6] Syncing project files to server..."
rsync -az --delete -e "${RSYNC_SSH_CMD}" \
	--exclude '.git' \
	--exclude 'node_modules' \
	--exclude '.DS_Store' \
	--exclude 'data.sqlite' \
	--exclude 'data.sqlite-shm' \
	--exclude 'data.sqlite-wal' \
	--exclude 'backups' \
	"${LOCAL_DIR}/" "${SSH_TARGET}:${REMOTE_DIR}/"

echo "[4/6] Installing production dependencies..."
run_ssh "
	set -euo pipefail
	cd '${REMOTE_DIR}'
	npm install --omit=dev
"

echo "[5/6] Restarting app with PM2..."
run_ssh "
	set -euo pipefail
	cd '${REMOTE_DIR}'
	if pm2 describe '${APP_NAME}' >/dev/null 2>&1; then
		pm2 restart '${APP_NAME}'
	else
		pm2 start server.js --name '${APP_NAME}'
	fi
"

echo "[6/6] Verifying PM2 process status..."
run_ssh "
	set -euo pipefail
	pid=\$(pm2 pid '${APP_NAME}' | tail -n 1 | tr -d '[:space:]')
	if [ -z \"\$pid\" ] || [ \"\$pid\" = \"0\" ]; then
		echo \"[ERROR] PM2 process '${APP_NAME}' is not online (pid=\$pid).\"
		pm2 status '${APP_NAME}' || true
		pm2 logs '${APP_NAME}' --lines 60 || true
		exit 1
	fi
	pm2 status '${APP_NAME}'
"

echo "[DONE] Deployment completed successfully."

<link rel="stylesheet" href="/public/styles.css">
<script src="/public/app.js"></script>
<link rel="manifest" href="/public/manifest.webmanifest">
<link rel="icon" href="/public/favicon.ico">
