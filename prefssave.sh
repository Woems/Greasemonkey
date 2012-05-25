#cd ~/.mozilla/firefox/*.default
#grep grease prefs.js | less -S 
#> gm_scripts/GreaseMonkeyPrefs.js
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
