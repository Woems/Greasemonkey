echo GIT status:
git status
echo Lösche alle Temp-Dateien...
find . -name "*.??~" -exec rm {} \;
echo config.xml commiten...
git add config.xml ; git commit -m "config"
echo GIT status:
git status
