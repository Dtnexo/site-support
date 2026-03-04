@echo off
powershell -NoProfile -Command "$s = New-Object -COM WScript.Shell; $sc = $s.CreateShortcut([Environment]::GetFolderPath('Desktop') + '\EPSIC Support.lnk'); $sc.TargetPath = '%~dp0EPSIC Support.exe'; $sc.WorkingDirectory = '%~dp0'; $sc.Save()"
echo.
echo Raccourci "EPSIC Support" cree sur le bureau !
echo.
pause
