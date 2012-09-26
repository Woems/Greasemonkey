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
  echo 8. mail prefs.js
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
  8)
    TO="nils.schneider@freenet.de"
    echo "To: $TO"
    SUBJ="$(date +%F) prefs.js von  $(hostname -f)"
    echo "Subject: $SUBJ"
    BODY="Hier die prefs.js vom $(date) vom Rechner $(hostname -f)"
    echo "Body: $BODY"
    PROFIL="$(grep Path ~/.mozilla/firefox/profiles.ini | cut -d "=" -f 2)"
    echo "Profil: $PROFIL"
    PREFSJS=~/.mozilla/firefox/$PROFIL/prefs.js
    echo "Prefs.js: $PREFSJS"
    thunderbird -compose "to='$TO',subject='$SUBJ',body='$BODY',attachment='$PREFSJS'"
    ;;
  q) exit ;;
  *)
    echo "Menüpunkt nicht gefunden"
    read -n 1 -p "Beliebige Taste zum fortsetzen"
    ;;
  esac
done
