echo GIT status:
git status
#echo Lösche alle Temp-Dateien...
#find . -name "*.??~" -exec rm {} \;
if [ -f config.xml.orig ]; then rm config.xml.orig; fi
echo config.xml commiten...
if git status | grep "modified:.*config.xml" > /dev/null; then
  xmlstarlet ed -L -d "/UserScriptConfig/Script/@installTime" -d "/UserScriptConfig/Script/@lastUpdateCheck" -d "/UserScriptConfig/Script/@modified" -d "/UserScriptConfig/Script/@uuid" config.xml
  git add config.xml ; git commit -m "config"
fi
#echo GIT status:
#git status
git gui
echo git pull
echo git mergetool -y
echo git commit -m "Merge"
echo git push -u origin master
 
