echo GIT status:
git status
#echo Lösche alle Temp-Dateien...
#find . -name "*.??~" -exec rm {} \;
echo config.xml commiten...
xmlstarlet ed -L -d "/UserScriptConfig/Script/@installTime" -d "/UserScriptConfig/Script/@lastUpdateCheck" -d "/UserScriptConfig/Script/@modified" config.xml
git add config.xml ; git commit -m "config"
#echo GIT status:
#git status
git gui
echo git pull
echo git mergetool -y
echo git commit -m "Merge"
echo git push -u origin master
 
