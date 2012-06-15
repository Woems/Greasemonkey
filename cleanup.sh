echo GIT status:
git status
#echo Lösche alle Temp-Dateien...
#find . -name "*.??~" -exec rm {} \;
echo config.xml commiten...
tarlet ed -L -d "/UserScriptConfig/Script/@installTime" -d "/UserScriptConfig/Script/@lastUpdateCheck" -d "/UserScriptConfig/Script/@modified" config.xml
git add config.xml ; git commit -m "config"
#echo GIT status:
#git status
git gui
