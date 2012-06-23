echo GIT status:
git status
#echo Lösche alle Temp-Dateien...
#find . -name "*.??~" -exec rm {} \;
echo config.xml commiten...
git add config.xml ; git commit -m "config"
#echo GIT status:
#git status
git gui
echo git pull
echo git mergetool -y
echo git commit -m "Merge"
echo git push -u origin master
 
