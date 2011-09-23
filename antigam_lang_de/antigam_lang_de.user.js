// ==UserScript==
// @name           AntiGam_lang_de
// @description    AntiGame Übersetzung (Muss VOR dem AntiGame Script laufen) - 1.13.8
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

// Changelog:


// 28.11.2009	1.13.8
//	Für AntiGame Version 1.13.8
//	Deutsch


(function () {
	var AntiGame_lang = {};

	AntiGame_lang.LabelsDE =
	{
		lbl_missAttack: 'Angreifen',
		lbl_missColony: 'Kolonisieren',
		lbl_missDeploy: 'Stationieren',
		lbl_missDestroy: 'Zerst&ouml;ren',
		lbl_missEspionage: 'Spionage',
		lbl_missExpedition: 'Expedition',
		lbl_missFederation: 'Verbandsangriff',
		lbl_missHarvest: 'Abbau',
		lbl_missHold: 'Halten',
		lbl_missTransport: 'Transport',
		
		lbl_shipSCargo: 'Kleiner Transporter',
		lbl_shipLCargo: 'Gro&szlig;er Transporter',
		lbl_shipLFighter: 'Leichter J&auml;ger',
		lbl_shipHFighter: 'Schwerer J&auml;ger',
		lbl_shipCruiser: 'Kreuzer',
		lbl_shipBattleship: 'Schlachtschiff',
		lbl_shipColonizator: 'Kolonieschiff',
		lbl_shipRecycler: 'Recycler',
		lbl_shipSpy: 'Spionagesonde',
		lbl_shipBomber: 'Bomber',
		lbl_shipDestroyer: 'Zerst&ouml;rer',
		lbl_shipRIP: 'Todesstern',
		lbl_shipBCruiser: 'Schlachtkreuzer',
		lbl_shipSatellite: 'Solar Satellit',

		lbl_RequiredEnergy: 'Energiebedarf'
		
	}

	AntiGame_lang.InterfaceDE =
	{
		opt_languageName: 'Deutsch',
	
		opt_title: 'AntiGame Optionen',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Abbr.',
		opt_btnDefault: 'Standart',

		opt_language: 'Sprache',
		opt_autocopyCoords: 'Auto-Kopieren der Koordinaten',
		opt_showLocalTime: "Zeige Lokale zeit",
		opt_showServerOgameClock: 'Behalte Serverzeit f&uuml;r Ogame Uhr',
		opt_blockAutoComplete: 'Block Auto Complete in Firefox',

		opt_showDeficient: 'Zeige Fehlende Rohstoffe',
		opt_showResources: 'Zeige Erweiterte Rohstoff Informationen',
                opt_showNames: 'Zeige Schiff/Geb&auml;ude/Forschungsname &uuml;ber dem Bild',
                opt_nameColorOn: 'Farbe f&uuml;r: Verf&uuml;gbar',
		opt_nameColorOff: 'Farbe f&uuml;r: Nicht Verf&uuml;gbar',
		opt_nameColorDisabled: 'Farbe f&uuml;r: Nicht gen&uuml;gend Ressourcen',


                opt_uni_SpeedFactor: 'Geschwindigkteit des Universums',
                opt_killTips: 'Keine Tooltips',


                opt_showEventList: 'Zeige Aufgeklappte Eventliste in der Übersicht',
                opt_evt_showOnTop: 'Position der Eventliste in der &Uuml;bersicht',
                opt_evt_noScroll: 'Keine Scrollbalken anzeigen, wenn Tooltips in Eventliste angezeigt werden',

		opt_galaxyShowRank: 'Zeige Spieler/Allianz Rang in der Galaxie',
		opt_galaxyRankColor: 'Spieler/Allianz Rang Farben',
		opt_galaxyDebrisMin: 'Minimale Gr&ouml;&szlig;e von Tr&uuml;mmerfeldern Zeigen',
		opt_galaxyDebrisColor: 'Farbe vom Tr&uuml;mmerfeld',
		opt_galaxyHideMoon: 'Verberge Mond Bild (Zeigt nur die Gr&ouml;&szlig;e)',
		opt_galaxy_Players: 'Hebt folgende Spieler hervor',
		opt_galaxy_PlayerColors: 'Farbe der hervorgehobenen Spieler',
		opt_galaxy_Allys: 'Hebt folgende Allianzen hervor',
		opt_galaxy_AllyColors: 'Farbe der hervorgehobnenen Allianzen',

		opt_galaxy_keepTipsPlanets: 'Behalte Tooltips f&uuml;r Planeten und Monde',
		opt_galaxy_keepTipsDebris: 'Behalte Tooltips f&uuml;r Tr&uuml;mmerfelder',

		

		opt_msg_PlunderThreshold: 'Mindestgr&ouml;&szlig;e f&uuml;r theoretische Beute (in K)',
		opt_msg_DebrisThreshold: 'Mindestgr&ouml;&szlig;e f&uuml;r theoretisches Tr&uuml;mmerfeld (in K)',
		opt_msg_foldSmallPlunder: 'Spionageberichte unter diesem Limit Unterschlagen',
		opt_msg_showPlunder: 'Zeige Beute in Spionageberichten',
		opt_msg_addButtons: 'Zus&auml;tzliche Nachrichtenfelder',
		opt_msg_fixColors: 'Richtige Farben in Kampfberichten',
		



		opt_fleet_showCapacity: 'Zeige Schiffe, Kapazit&auml;t, Geschwindigkeit',
		opt_fleet2_setTargetDF: 'Setze Ziel auf Tr&uuml;mmerfeld, wenn Recycler dabei sind',
		opt_fleet2_fixLayout: 'Ver&auml;ndere Anzeige (Flottenversand)',
		opt_fleet2_ShortLinks: 'Vorgegebene Shortlinks',

		opt_missionPriority: 'Auftragspriorit&auml;t',
		
		opt_mvmt_expandFleets: 'Zeige Flotte, Schiffe und Laderraum',
		opt_mvmt_showReversal: 'Zeige R&uuml;ckkehrzeit der Flotte',
		
		opt_missAttack: 'Auftragsfarbe: Angreifen',
		opt_missColony: 'Auftragsfarbe: Kolonisieren',
		opt_missDeploy: 'Auftragsfarbe: Stationieren',
		opt_missDestroy: 'Auftragsfarbe: Zerst&ouml;ren',
		opt_missEspionage: 'Auftragsfarbe: Spionage',
		opt_missExpedition: 'Auftragsfarbe: Expedition',
		opt_missFederation: 'Auftragsfarbe: Verbandsangriff',
		opt_missHarvest: 'Auftragsfarbe: Abbau',
		opt_missHold: 'Auftragsfarbe: Halten',
		opt_missTransport: 'Auftragsfarbe: Transport',

		// these label are shown in Options
		lbl_missAttack: 'Angreifen',
		lbl_missColony: 'Kolonisieren',
		lbl_missDeploy: 'Stationieren',
		lbl_missDestroy: 'Zerst&ouml;ren',
		lbl_missEspionage: 'Spionage',
		lbl_missExpedition: 'Expedition',
		lbl_missFederation: 'Verbandsangriff',
		lbl_missHarvest: 'Abbau',
		lbl_missHold: 'Halten',
		lbl_missTransport: 'Transport',
		//
				
		lbl_sectionGeneral: 'Allgemein',
                lbl_sectionEventList: 'Event Liste',
		lbl_sectionGalaxy: 'Galaxie',
		lbl_sectionMessages: 'Nachrichten',
		lbl_sectionFleetDispatch: 'Flotte Versenden',
		lbl_sectionFleetMovement: 'Flottenbewegung',

                lbl_resetCoords: 'Zur&uuml;cksetzen - ',

		lbl_optionsNote1: 'Diese Option ist nur f&uuml;r dieses Universum gespeichert',

		lbl_TotalCapacity: 'Ladekapazit&auml;t',
		lbl_MinSpeed: 'Minimale Geschwindigkeit',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resources: 'Rohstoffe',
		lbl_debris: 'TF',
		lbl_total: 'Gesamt',
		lbl_loot: 'Beute',
		lbl_metal: 'Metall',
		lbl_crystal: 'Kristall',

		lbl_shipSCargoAlt: 'KT',
		lbl_shipLCargoAlt: 'GT',
		lbl_shipRecyclerAlt: 'Recs',
		
		lbl_deficientRes: 'Fehlende Rohstoffe',
		lbl_Production: 'Produktion',
		lbl_ArrivalACS: 'Ankunft (AKS)',

		lbl_btnMarkReadAll: 'Alle Angezeigten Nachrichten als gelesen markieren',
		lbl_btnDeleteSmallPlunder: 'Spionageberichte mit < $plunder Beute und < $debris TF entfernen',

		lbl_Moon: 'Mond',

                lbl_onTop: 'Oben',
		lbl_onBottom: 'Unten',
                lbl_onLeft: 'Links'

	}
	

	// -------------------------------
	// Don't modify the code below
	
	try { mywindow = unsafeWindow; }
	catch (e) { mywindow = window; }
	
	if (!mywindow.AntiGame_lang)
		mywindow.AntiGame_lang = AntiGame_lang;
	else
		for (var i in AntiGame_lang)
			mywindow.AntiGame_lang[i] = AntiGame_lang[i];

}) ()