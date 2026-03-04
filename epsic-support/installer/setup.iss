#define MyAppName "EPSIC Support"
#define MyAppVersion "1.0.0"
#define MyAppExeName "EPSIC Support.exe"
#define AppSourceDir "..\out\EPSIC Support-win32-x64"

[Setup]
AppId={{8F3A2C1D-4B5E-4F6A-9D0C-1E2F3A4B5C6D}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher=EPSIC
DefaultDirName={localappdata}\{#MyAppName}
DisableDirPage=yes
DisableProgramGroupPage=yes
OutputDir=..
OutputBaseFilename=install
Compression=lzma2
SolidCompression=yes
WizardStyle=modern
WizardResizable=no
UninstallDisplayName={#MyAppName}
UninstallDisplayIcon={app}\{#MyAppExeName}
PrivilegesRequired=lowest

[Languages]
Name: "french"; MessagesFile: "compiler:Languages\French.isl"

[CustomMessages]
french.WelcomeLabel1=Bienvenue dans le programme d'installation de [name]
french.WelcomeLabel2=Ce programme va installer [name/ver] sur votre ordinateur.%n%nCliquez sur Suivant pour continuer.
french.FinishedLabel=L'installation de [name] est terminée.%n%nCliquez sur Terminer pour quitter ce programme.

[Tasks]
Name: "desktopicon"; Description: "Créer un raccourci sur le &bureau"; GroupDescription: "Icônes supplémentaires :"

[Files]
Source: "{#AppSourceDir}\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "Lancer {#MyAppName}"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
Type: filesandordirs; Name: "{app}"
