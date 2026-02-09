@echo off
:: Se place dans le dossier actuel pour éviter les erreurs
cd /d "%~dp0"

echo ============================================
echo    Lancement du Portail EPSIC...
echo ============================================

:: Ouvre simplement le fichier HTML généré
:: Le navigateur par défaut va l'ouvrir et l'exécuter sans bloquer
start "" "dist\index.html"

exit