while true
do
  echo ""
  echo "----------"
  echo "-- Menu --"
  echo 1. git status
  echo 2. cleanup
  echo 3. git gui
  echo 4. git pull
  echo 5.   git mergetool -y
  echo 6.   git commit -m "Merge"
  echo 7. git push -u origin master
  echo Q. Quit
  echo "----------"
  read -n 1 -p "Nr:" Nr
  echo ""

  case $Nr in
  1)
    git status
    read -n 1 -p "Beliebige Taste zum fortsetzen"
    ;;
  2)
    #echo Lösche alle Temp-Dateien...
    #find . -name "*.??~" -exec rm {} \;
    if [ -f config.xml.orig ]; then rm config.xml.orig; fi
    echo config.xml commiten...
    if git status | grep "modified:.*config.xml" > /dev/null; then
      xmlstarlet ed -L -d "/UserScriptConfig/Script/@installTime" -d "/UserScriptConfig/Script/@lastUpdateCheck" -d "/UserScriptConfig/Script/@modified" -d "/UserScriptConfig/Script/@uuid" config.xml
      git add config.xml ; git commit -m "config"
    fi
    read -n 1 -p "Beliebige Taste zum fortsetzen"
    ;;
  3)
    git gui
    read -n 1 -p "Beliebige Taste zum fortsetzen"
    ;;
  4)
    git pull
    read -n 1 -p "Beliebige Taste zum fortsetzen"
    ;;
  5)
    git mergetool -y
    read -n 1 -p "Beliebige Taste zum fortsetzen"
    ;;
  6)
    git commit -m "Merge"
    read -n 1 -p "Beliebige Taste zum fortsetzen"
    ;;
  7)
    git push -u origin master
    read -n 1 -p "Beliebige Taste zum fortsetzen"
    ;;
  q) exit ;;
  *)
    echo "Menüpunkt nicht gefunden"
    read -n 1 -p "Beliebige Taste zum fortsetzen"
    ;;
  esac
done
