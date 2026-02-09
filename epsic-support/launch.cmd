@echo off
cd /d "%~dp0"

echo ===============================================
echo    Lancement de la Preview EPSIC
echo    Le navigateur va s'ouvrir automatiquement...
echo ===============================================

call npm run preview -- --open

pause