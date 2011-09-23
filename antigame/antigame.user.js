// ==UserScript==
// @name           AntiGame
// @namespace      antikiller
// @description    A couple of Neogame functions for Ogame Redesign - v1.13.9
// @version	1.13.9
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==

// Changelog:

/*
29.11.2009	v1.13.8
	- Bug with shortlinks ordering

28.11.2009	v1.13.8
	+ Alt text for resources on top and resources in building cost
	+ Show research names on Techtree page
	+ User specified colors for names depending on their state (available, not available, not eanough resources)
	+ Button for resetting of the remembered coordinates
	* Fixed time on Reversal button

23.11.2009	v1.13.7
	- Ext. resources layout fixed (left-side)

21.11.2009	v1.13.6
	+ Option added: Kill tooltips (Fleet dispatch 1, Messages)
	+ Option added: show item names over images
	* Option modified: show extended resources info - now can choose layout 
	-  Rounding issue in production calculation for speeded universes
	- Temperature wasn't read if there was only 1 planet at the account
	= Strings to translate:
		opt_showNames: 'Show ship/building/research names over images'
		opt_killTips: 'Kill tooltips' - instead of opt_galaxy_killTips
		lbl_onLeft: 'On left'

16.11.2009	v1.13.5
	+ Option added: Uni speed factor
	= Strings to translate:
		opt_uni_SpeedFactor: 'Speed factor of this universe'

14.11.2009	v1.13.4
	+ shows local time in phalanx scans

08.11.2009	v1.13.3
	+ players/allys highlighting on Statistics page
	* ACS time is not displayed any more on Fleet3 page
	- bug with  production of buildings

06.11.2009	v1.13.2
	- players/allys highlighting fixed
	- shows missing resources for Defense

05.11.2009	v1.13.1
	+ Option added: EventList position on the screen
	- RU Localization string fixed: lbl_missHold
	- Planet management controls were unavailable on Overview page with 'Show EventList' option
	= Strings to translate:
		opt_evt_showOnTop: 'Position of the Event list on the screen',
		opt_evt_noScroll: 'No frame scrollbars appear when tooltips are displayed',
		lbl_sectionEventList: 'Event list',
		lbl_onTop: 'On top',
		lbl_onBottom: 'On bottom'

04.11.2009	v1.13.0
	+ Option added: Kill tooltips on Galaxy page
	= Strings to translate:
		opt_galaxy_killTips: 'Kill all tooltips on Galaxy page',
		opt_galaxy_keepTipsPlanets: 'Keep tooltips for planets and moons',
		opt_galaxy_keepTipsDebris: 'Keep tooltips for debris fields'

04.11.2009	v1.12.2
	* EventBox layout fixed  - scrollbars do not appear when cluetip goes out of the iframe box

02.11.2009	v1.12.1
	* Embedded EventBox layout changed
	* In order for storage capacity to fit the screen (Resources page) TechTree is made hidden for storages
	* All numbers formatting uses appropriate thousand separator (taken from Ogame code) instead of hard-coded '.'

02.11.2009	v1.12.0
	+ Option added: Show unfolded Event list on Overview
	= Strings to translate:
		opt_showEventList: 'Show unfolded Event list on Overview'

02.11.2009	v1.11.1
	* ACS time is marked orange when the ACS will be slowed down and red when it's too late to join the ACS

02.11.2009	v1.11.0
	* New time processing after Ogame update

01.11.2009	v1.10.4
	* Support for HR servers

29.10.2009	v1.10.3
	* 'Set target to DF' logic changed - now it works independently on coords auto-insertion

28.10.2009	v1.10.2
	* 'Fix briefing layout' option is now universe-specific
	* Brifing layout changed to reach the desired effect at BG servers
	* Shortlinks ordering changed
	- Shortlinks didn't work at non-RU servers
	- Bug with storage capacity displaying

28.10.2009	v1.10.1
	- A few minor fixes
	= Strings to translate:
		lbl_sectionFleetDispatch: 'Fleet dispatch'
		(instead of incorrect lbl_sectionFleetDeparture in 1.10.0)
		
28.10.2009	v1.10.0
	+ Option added: Hide Moon picture
	+ Option added: Show ships capacity and speed
	+ Option added: Set target to DF if the fleet includes recyclers
	+ Option added: Fix briefing layout
	+ Option added: Target shortlinks
	+ Options added: Highlight players and alliances
	+ Option added: Keep server time for top-right Ogame clock
	+ Some options are now universe-specific
	+ Shows storage capacity
	* Plunder calculator shows alternative ships names to avoid problems with Speedsim
	- Antigame options button opened a new blank tab

	= Strings to translate:
		opt_fleet_showCapacity: 'Show ships capacity and speed',
		opt_fleet2_setTargetDF: 'Set target to DF if the fleet includes recyclers',
		opt_fleet2_fixLayout: 'Fix briefing layout',
		opt_fleet2_ShortLinks: 'Target shortlinks',
		lbl_sectionFleetDeparture: 'Fleet departure',
		opt_galaxyHideMoon: 'Hide Moon picture (display moon size instead)',
		lbl_optionsNote1: 'The option is stored for this universe only',
		opt_galaxy_Players: 'Highlight the following players',
		opt_galaxy_PlayerColors: 'Colors for player highlighting',
		opt_galaxy_Allys: 'Highlight the following alliances',
		opt_galaxy_AllyColors: 'Colors for alliance highlighting',
		opt_showServerOgameClock: 'Keep server time for top-right Ogame clock',
		lbl_shipSCargoAlt: 'SC',
		lbl_shipLCargoAlt: 'LC',
		lbl_shipRecyclerAlt: 'Recs',

// 19.10.2009	v1.9.0
//	+ Replaces Moon image with Moon:<moon size> text
//	= Strings to translate:
//		Interface.lbl_Moon: 'Moon'

// 19.10.2009	v1.8.4
//	- A bug with planet production in speed unis

// 18.10.2009	v1.8.3
//	- Missing energy doesn't require cargoes :)

// 18.10.2009	v1.8.2
//	* Mines production and reactor consumption calculated correctly for 42org (speed x2)
//	* Antigame version is displayed on 'Antigame' button
//	- Labels fixed for EN localizaton
//	- Now shows missing energy for GraviTech and Terraformer

// 17.10.2009	v1.8.1
//	- Bug with techs remembering in Opera

// 16.10.2009	v1.8.0
//	+ Shows production/consumption changes for new mines/plants
//	+ Shows speed for each type of ships on FLEET1 page
//	* Finish time is displayed on DEFENCE page
//  = Strings to translate:
//		Interface.lbl_MinSpeed: 'Minimal speed'
//		Interface.lbl_Production: 'Production',
//		Labels.lbl_RequiredEnergy: 'Energy required' - should be exactly the same as written at Mine building details

// 15.10.2009	v1.7.3
//	- Bugfix: PlunderThreshold/DebrisThreshold were not checked correctly against plunder in reports

// 14.10.2009	v1.7.2
//	* Missing resources now are not displayed for constructions already being in process
//	* Missing res layout slightly changed
//	- Bugfix: Extended res info at Statistics page
//	- Bugfix: Missing resources were calculated even if that type of resources was not present in the cost

// 14.10.2009	v1.7.1
//	+ Shows total res and needed cargoes on FLEET1 page even if there is no ships on the planet

// 14.10.2009	v1.7.0
//	+ Threshold for debris added
//	+ Option added: show boxes with resource information at the bottom of the left menu
//	* Missing resources view changed
//	* Some options window changes
//	- When coords were auto-inserted the target remained 'Moon' if the fleet was sent from the moon; now it is alway set to 'Planet'

// 12.10.2009	v1.7b0
//	+ Folding spy reports with theoretical plunder < threshold
//	+ Additional button: delete spy reports with theoretical plunder < threshold

// 12.10.2009	v1.6.3
//	- 'Mission color: Harvest' was listed twice in the options
//	- Missing resources were calculated incorrectly with values like 1.231kk
//	* Namespace changed in the header

// 10.10.2009	v1.6.2
//	+ Fleet ships are displayed in the message body for 'fleet returned' messages.

// 10.10.2009	v1.6.1
//	+ Tooltips added to message control buttons

// 10.10.2009	v1.6.0
//	+ Message control buttons on Messages page: Mark as read, Mark all as read, Delete, Delete all
//	* Messages processing optimized

// 09.10.2009	v1.5.1
// + Buttons instead of drop-down box in Messages

// 09.10.2009	v1.5.1
// - Bugfix: server language was detected as EN for servers like FI.OGAME.ORG

// 08.10.2009	v1.5.0
// * Got rid of DOM getElementsByClassName - works in Firefox 2.x now
// * Changed lbl_resourses to lbl_resourses in localization vars and the code
// * Finishing time is displayed in server timezone if showLocalTime is unset
// * Seconds in finishing time are according to server time
// + Shows ACS arrival time (fleet3 page)

// 07.10.2009	v1.4.2
//	- Real bugfix for Coords now :)

// 07.10.2009	v1.4.1
//	- Bugfix: Coords were auto-inserted each time even if they had already been set (non-Russian servers)
//	* SendFleet functions (fleet1/fleet2/fleet3 pages) now don't use getElementsByClassName any more

// 07.10.2009	v1.4.0
//	+ Option added: show deficient resources
//	+ Total resources on planet are shown at FLEET1 page together with total ships capacity
//	* runScript and runEventHandler are rewritten

// 05.10.2009	v1.3.4
//	- Time in battle reports (short view) was not changed to local

// 04.10.2009	v1.3.3
//	- Bug with server language setting

// 04.10.2009	v1.3.2
//	+ Loot/Debris section in spy reports translated
//	+ Check is added to avoid double executing of the script

// 03.10.2009	v1.3.1
//	- Bug with Harvest color

// 03.10.2009	v1.3
//	+ Language pack moved to a separate file (script). Main script contains RU and EN only
//	+ Language detection for all (I hope) official Ogame servers - thanks to Bontchev
//	+ Text boxes with color settings are highlighted with the corresponding color in Options window
//	* 'Until' label is removed due to problems on some servers

// 03.10.2009	v1.2
//	* Minor changes in language selection

// 03.10.2009	v1.2.b2
//	+ Shows local time in Event list
//	+ Interface language is set to server language if it is not found in the saved options
//	- Bug with player rank in Galaxy view at BG servers

// 02.10.2009	v1.2.b1
//	* Localization split into Labels (auto-selected for a server) and Interface
//	+ Bulgarian servers and interface language

// 02.10.2009	v1.1.1
//	- Bug with reversal time - now start time is retrieved prior to Server2Local changes

// 02.10.2009	v1.1
//	+ Servers with Redesign are recognized
//	+ Option added: Show ranks in Galaxy view
//  + Option added: Rank color (only for players with rank>800 and alliances)
//	+ Option added: Show reversal time (now it is separated from "expand fleets" feature)
//  + Shows local time in Messages
//	+ Autodetection of server language
//	* Improved 'fleetDetails' node selecting (use XPath now)
//	* Current planet highlighting (Galaxy) now works with both address formats
//	- Debris calculation in spy reports - solar satellite was missing
//	- 'Language' option removed
//

// 01.10.2009	v1.0
//	Initial release
*/


(function () {
	var version = '1.13.9';
	
	var mywindow;
	try { mywindow = unsafeWindow; }
	catch (e) { mywindow = window; }
	
	if (mywindow.AntiGame_started) return;
	mywindow.AntiGame_started = 1;
	
	var AntiGame_lang = {};
	
	AntiGame_lang.LabelsEN =
	{
		lbl_missAttack: 'Attack',
		lbl_missColony: 'Colonization',
		lbl_missDeploy: 'Deployment',
		lbl_missDestroy: 'Moon Destruction',
		lbl_missEspionage: 'Espionage',
		lbl_missExpedition: 'Expedition',
		lbl_missFederation: 'ACS Attack',
		lbl_missHarvest: 'Harvest',
		lbl_missHold: 'ACS Defend',
		lbl_missTransport: 'Transport',
		
		lbl_shipSCargo: 'Small Cargo',
		lbl_shipLCargo: 'Large Cargo',
		lbl_shipLFighter: 'Light Fighter',
		lbl_shipHFighter: 'Heavy Fighter',
		lbl_shipCruiser: 'Cruiser',
		lbl_shipBattleship: 'Battleship',
		lbl_shipColonizator: 'Colony Ship',
		lbl_shipRecycler: 'Recycler',
		lbl_shipSpy: 'Espionage Probe',
		lbl_shipBomber: 'Bomber',
		lbl_shipDestroyer: 'Destroyer',
		lbl_shipRIP: 'Deathstar',
		lbl_shipBCruiser: 'Battlecruiser',
		lbl_shipSatellite: 'Solar Satellite',
		
		lbl_RequiredEnergy: 'Energy needed'
		
	}
	
	AntiGame_lang.InterfaceEN =
	{
		opt_languageName: 'English',
	
		opt_title: 'AntiGame Options',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Cancel',
		opt_btnDefault: 'Default',

		opt_language: 'Language',
		opt_autocopyCoords: 'Auto-copy coordinates',
		opt_showLocalTime: "Show local time instead of server's (hours only)",
		opt_showServerOgameClock: 'Keep server time for top-right Ogame clock',
		opt_blockAutoComplete: 'Block Auto-Complete in Firefox',
		
		opt_showDeficient: 'Show missing resources',
		opt_showResources: 'Show extended resources information',
		opt_showNames: 'Show ship/building/research names over images',
		opt_nameColorOn: 'Name color: available',
		opt_nameColorOff: 'Name color: unavailable',
		opt_nameColorDisabled: 'Name color: not enough resources',

		opt_uni_SpeedFactor: 'Speed factor of this universe',
		
		opt_killTips: 'Kill tooltips',

		opt_showEventList: 'Show unfolded Event list on Overview',
		opt_evt_showOnTop: 'Position of the Event list on the screen',
		opt_evt_noScroll: 'No frame scrollbars appear when tooltips are displayed',
		
		opt_galaxyShowRank: 'Show player/alliance ranks in Galaxy view',
		opt_galaxyRankColor: 'Player/alliance ranks color',
		opt_galaxyDebrisMin: 'Minimal size of debris to highlight (0 to turn off)',
		opt_galaxyDebrisColor: 'Color of highlighted debris',
		opt_galaxyHideMoon: 'Hide Moon picture (display moon size instead)',
		opt_galaxy_Players: 'Highlight the following players',
		opt_galaxy_PlayerColors: 'Colors for player highlighting',
		opt_galaxy_Allys: 'Highlight the following alliances',
		opt_galaxy_AllyColors: 'Colors for alliance highlighting',
		opt_galaxy_keepTipsPlanets: 'Keep tooltips for planets and moons',
		opt_galaxy_keepTipsDebris: 'Keep tooltips for debris fields',
		
		opt_msg_PlunderThreshold: 'Low limit for theoretical plunder (x1000)',
		opt_msg_DebrisThreshold: 'Low limit for theoretical debris (x1000)',
		opt_msg_foldSmallPlunder: 'Fold reports with plunder and debris less than the limit',
		opt_msg_showPlunder: 'Show plunder in spy reports',
		opt_msg_addButtons: 'Additional buttons on Messages',
		opt_msg_fixColors: 'Fix colors of combat reports',
		
		opt_fleet_showCapacity: 'Show ships capacity and speed',
		opt_fleet2_setTargetDF: 'Set target to DF if the fleet includes recyclers',
		opt_fleet2_fixLayout: 'Fix briefing layout',
		opt_fleet2_ShortLinks: 'Target shortlinks',
		
		opt_missionPriority: 'Mission priority',
		
		opt_mvmt_expandFleets: 'Show fleet ships and cargo',
		opt_mvmt_showReversal: 'Show reversal time for fleets',
		
		opt_missAttack: 'Mission color: Attack',
		opt_missColony: 'Mission color: Colonization',
		opt_missDeploy: 'Mission color: Deploy',
		opt_missDestroy: 'Mission color: Destroy',
		opt_missEspionage: 'Mission color: Espionage',
		opt_missExpedition: 'Mission color: Expedition',
		opt_missFederation: 'Mission color: Federation',
		opt_missHarvest: 'Mission color: Harvest',
		opt_missHold: 'Mission color: Hold',
		opt_missTransport: 'Mission color: Transport',
		
		// these label are shown in Options
		lbl_missAttack: 'Attack',
		lbl_missColony: 'Colonization',
		lbl_missDeploy: 'Deployment',
		lbl_missDestroy: 'Moon Destruction',
		lbl_missEspionage: 'Espionage',
		lbl_missExpedition: 'Expedition',
		lbl_missFederation: 'ACS Attack',
		lbl_missHarvest: 'Harvest',
		lbl_missHold: 'ACS Defend',
		lbl_missTransport: 'Transport',
		//
		
		lbl_sectionGeneral: 'General',
		lbl_sectionEventList: 'Event list',
		lbl_sectionGalaxy: 'Galaxy',
		lbl_sectionMessages: 'Messages',
		lbl_sectionFleetDispatch: 'Fleet dispatch',
		lbl_sectionFleetMovement: 'Fleet movement',
		
		lbl_optionsNote1: 'The option is stored for this universe only',
		
		lbl_resetCoords: 'Reset - ',
		
		lbl_TotalCapacity: 'Total capacity',
		lbl_MinSpeed: 'Minimal speed',
		lbl_mvmt_Return: 'R',
		lbl_mvmt_Expedition: 'E',
		
		lbl_resources: 'Resources',
		lbl_debris: 'Debris',
		lbl_total: 'Total',
		lbl_loot: 'Loot',
		lbl_metal: 'Metal',
		lbl_crystal: 'Crystal',
		
		lbl_shipSCargoAlt: 'SC',
		lbl_shipLCargoAlt: 'LC',
		lbl_shipRecyclerAlt: 'Recs',
		
		lbl_deficientRes: 'Missing resources',
		lbl_Production: 'Production',
		lbl_ArrivalACS: 'Arrival (ACS)',
		
		lbl_btnMarkReadAll: 'Mark all displayed messages as read',
		lbl_btnDeleteSmallPlunder: 'Delete spy reports with plunder < $plunder and debris < $debris',
		
		lbl_Moon: 'Moon',
		
		lbl_onTop: 'On top',
		lbl_onBottom: 'On bottom',
		lbl_onLeft: 'On left'
	}
	
	AntiGame_lang.LabelsRU =
	{
		lbl_missAttack: 'Атака',
		lbl_missColony: 'Колонизировать',
		lbl_missDeploy: 'Оставить',
		lbl_missDestroy: 'Уничтожить',
		lbl_missEspionage: 'Шпионаж',
		lbl_missExpedition: 'Экспедиция',
		lbl_missFederation: 'Совместная атака',
		lbl_missHarvest: 'Переработать',
		lbl_missHold: 'Держаться',
		lbl_missTransport: 'Транспорт',
		
		lbl_shipSCargo: 'Малый транспорт',
		lbl_shipLCargo: 'Большой транспорт',
		lbl_shipLFighter: 'Лёгкий истребитель',
		lbl_shipHFighter: 'Тяжёлый истребитель',
		lbl_shipCruiser: 'Крейсер',
		lbl_shipBattleship: 'Линкор',
		lbl_shipColonizator: 'Колонизатор',
		lbl_shipRecycler: 'Переработчик',
		lbl_shipSpy: 'Шпионский зонд',
		lbl_shipBomber: 'Бомбардировщик',
		lbl_shipDestroyer: 'Уничтожитель',
		lbl_shipRIP: 'Звезда смерти',
		lbl_shipBCruiser: 'Линейный крейсер',
		lbl_shipSatellite: 'Солнечный спутник',
		
		lbl_RequiredEnergy: 'Необходимо энергии'
	}
	
	AntiGame_lang.InterfaceRU =
	{
		opt_languageName: 'Русский',
				
		opt_title: 'Настройки AntiGame',
		opt_btnOk: 'OK',
		opt_btnCancel: 'Отмена',
		opt_btnDefault: 'По умолчанию',

		opt_language: 'Язык',
		opt_autocopyCoords: 'Авто-вставка координат',
		opt_showLocalTime: 'Показывать локальное время вместо серверного (только часы)',
		opt_showServerOgameClock: 'Оставить серверное время для часов Огейм вверху справа',
		opt_blockAutoComplete: 'Отключить Авто-Заполнение в Firefox',
		
		opt_showDeficient: 'Показывать недостающие ресурсы',
		opt_showResources: 'Показывать расширенную информацию о ресурсах',
		opt_showNames: 'Показывать названия кораблей/строений/исследований поверх картинок',
		opt_nameColorOn: 'Цвет названия: доступно',
		opt_nameColorOff: 'Цвет названия: недоступно',
		opt_nameColorDisabled: 'Цвет названия: не хватает ресурсов',
		
		opt_uni_SpeedFactor: 'Коэффициент ускорения в этой вселенной',
		
		opt_killTips: 'Заблокировать всплывающие подсказки',

		opt_showEventList: 'Показывать развернутый список событий в Обзоре',
		opt_evt_showOnTop: 'Расположение списка событий на экране',
		opt_evt_noScroll: 'Не показывать полосы прокрутки фрейма при отображении тултипов',
		
		opt_galaxyShowRank: 'Показывать рейтинг игрока/альянса в Галактике',
		opt_galaxyRankColor: 'Цвет для рейтинга игрока/альянса',
		opt_galaxyDebrisMin: 'Минимальный размер ПО для подсветки (0 - не подсвечивать)',
		opt_galaxyDebrisColor: 'Цвет подсвеченного ПО',
		opt_galaxyHideMoon: 'Скрывать картинку Луны (вместо нее выводить размер луны)',
		opt_galaxy_Players: 'Подсвечивать следующих игроков',
		opt_galaxy_PlayerColors: 'Цвета для подсветки игроков',
		opt_galaxy_Allys: 'Подсвечивать следующие альянсы',
		opt_galaxy_AllyColors: 'Цвета для подсветки альянсов',
		opt_galaxy_keepTipsPlanets: 'Сохранить тултипы для планет и лун',
		opt_galaxy_keepTipsDebris: 'Сохранить тултипы для поля обломков',

		opt_msg_PlunderThreshold: 'Нижний предел для возможной добычи (x1000)',
		opt_msg_DebrisThreshold: 'Нижний предел для возможного лома (x1000)',
		opt_msg_foldSmallPlunder: 'Сворачивать доклады с добычей и ломом меньше предела',
		opt_msg_showPlunder: 'Показывать возможную добычу в шпионских докладах',
		opt_msg_fixColors: 'Исправить цвета боевых докладов',
		opt_msg_addButtons: 'Дополнительные кнопки в Сообщениях',
		
		opt_missionPriority: 'Приоритет задания',
		
		opt_fleet_showCapacity: 'Показывать вместимость и скорость кораблей',
		opt_fleet2_setTargetDF: 'Отправлять на ПО, если во флоте есть переработчики',
		opt_fleet2_fixLayout: 'Исправить расположение информации о задании',
		opt_fleet2_ShortLinks: 'Список целей для быстрой вставки',
		
		opt_mvmt_expandFleets: 'Показывать состав и груз флотов',
		opt_mvmt_showReversal: 'Показывать время возврата флота при отзыве',
		
		opt_missAttack: 'Цвет флота, задание: Атака',
		opt_missColony: 'Цвет флота, задание: Колонизировать',
		opt_missDeploy: 'Цвет флота, задание: Оставить',
		opt_missDestroy: 'Цвет флота, задание: Уничтожить',
		opt_missEspionage: 'Цвет флота, задание: Шпионаж',
		opt_missExpedition: 'Цвет флота, задание: Экспедиция',
		opt_missFederation: 'Цвет флота, задание: Совместная атака',
		opt_missHarvest: 'Цвет флота, задание: Переработать',
		opt_missHold: 'Цвет флота, задание: Удержать',
		opt_missTransport: 'Цвет флота, задание: Транспорт',

		// these label are shown in Options
		lbl_missAttack: 'Атака',
		lbl_missColony: 'Колонизировать',
		lbl_missDeploy: 'Оставить',
		lbl_missDestroy: 'Уничтожить',
		lbl_missEspionage: 'Шпионаж',
		lbl_missExpedition: 'Экспедиция',
		lbl_missFederation: 'Совместная атака',
		lbl_missHarvest: 'Переработать',
		lbl_missHold: 'Держаться',
		lbl_missTransport: 'Транспорт',
		//
		
		lbl_sectionGeneral: 'Общие',
		lbl_sectionEventList: 'Список событий',
		lbl_sectionGalaxy: 'Галактика',
		lbl_sectionMessages: 'Сообщения',
		lbl_sectionFleetDispatch: 'Отправка флота',
		lbl_sectionFleetMovement: 'Список флотов',
		
		lbl_optionsNote1: 'Настройка сохраняется только для этой вселенной',
		
		lbl_resetCoords: 'Сбросить - ',
		
		lbl_TotalCapacity: 'Суммарная вместимость',
		lbl_MinSpeed: 'Минимальная скорость',
		lbl_mvmt_Return: 'В',
		lbl_mvmt_Expedition: 'Э',
		
		lbl_resources: 'Ресурсы',
		lbl_debris: 'Лом',
		lbl_total: 'Всего',
		lbl_loot: 'Добыча',
		lbl_metal: 'Металл',
		lbl_crystal: 'Кристалл',
		
		lbl_shipSCargoAlt: 'МТ',
		lbl_shipLCargoAlt: 'БТ',
		lbl_shipRecyclerAlt: 'Рабов',
		
		lbl_deficientRes: 'Ресурсов не хватает',
		lbl_Production: 'Производство',
		lbl_ArrivalACS: 'Прибытие (САБ)',
		
		lbl_btnMarkReadAll: 'Пометить все показанные сообщения как прочитанные',
		lbl_btnDeleteSmallPlunder: 'Удалить шпионские доклады с добычей < $plunder и ломом < $debris',
		
		lbl_Moon: 'Луна',
		lbl_onTop: 'Вверху',
		lbl_onBottom: 'Внизу',
		lbl_onLeft: 'Слева'
	}


	var Options =
	{
		language: '',
		blockAutoComplete: true,
		showLocalTime: true,
		showServerOgameClock: false,
		showFinishTime: true,
		showDeficient : true,
		showResources : 1,
		showNames: true,
		nameColorOn: '#FFFFFF',
		nameColorOff: '#777777',
		nameColorDisabled: '#D43635',
		
		uni_SpeedFactor: 1,
		
		showEventList: true,
		evt_showOnTop: 0,
		evt_noScroll: false,
		
		// 1 - attack		2 - federation	3 - transport	4 - deploy	5 - hold	6 - espionage
		// 7 - colonization	8 - recycle		9 - destroy		15 - expedition
		mission1: 6,
		mission2: 1,
		mission3: 4,
		mission4: 3,
		mission5: 9,
		
		missAttack: '#66CC33',
		missColony: '#C1C1C1',
		missDeploy: '#666666',
		missDestroy: '#FFFF99',
		missEspionage: '#FFCC66',
		missExpedition: '#5555BB',
		missFederation: '#CC6666',
		missHarvest: '#CEFF68',
		missHold: '#80A0C0',
		missTransport: '#A0FFA0',
		missMissile: '#FFCC66',
		
		mvmt_expandFleets: true,
		mvmt_showReversal: true,
		
		fleet_showCapacity: true,
		fleet1_killTips: false,
		fleet2_fixLayout: true,
		autocopyCoords: true,
		fleet2_setTargetDF: false,
		fleet2_ShortLinks: "1#1#2#3#Legor's moon",

		galaxyShowRank: true,
		galaxyRankColor: '#DDDDDD',

		galaxyRank10: '#FFFF40',
		galaxyRank50: '#FFDF00',
		galaxyRank100: '#FFBF00',
		galaxyRank200: '#FF8F00',
		galaxyRank800: '#33FF33',
		galaxyRank0: '#305060',

		galaxyDebrisMin: 10000,
		galaxyDebrisColor: '#FF0000',
		galaxyHideMoon: false,
		galaxy_killTips: false,
		galaxy_keepTipsPlanets: true,
		galaxy_keepTipsDebris: true,
		
		galaxy_Players: 'Legor,player 2',
		galaxy_PlayerColors: '#FF0000,#2222FF',
		galaxy_Allys: 'alliance 1,alliance 2',
		galaxy_AllyColors: '#FF00FF,#00FFFF',
		
		msg_PlunderThreshold: 10,
		msg_DebrisThreshold: 20,
		msg_foldSmallPlunder: true,
		msg_showPlunder: true,
		msg_fixColors: true,
		msg_addButtons: true,
		msg_killTips: false,

		Labels: null,
		Interface: null,
		
		uni_options: 
		{
			fleet2_ShortLinks:1, galaxyDebrisMin:1, msg_PlunderThreshold:1, msg_DebrisThreshold:1, 
			galaxy_Players:1, galaxy_PlayerColors:1, galaxy_Allys:1, galaxy_AllyColors:1, fleet2_fixLayout:1,
			uni_SpeedFactor:1
		},
		
		firefox_options: 
		{
			fleet2_setTargetDF:1
		},

		saveOptions: function()
		{
			try {
				var str = '';
				var str_uni = '';

				for (var i in Options) {
					var param = Options[i];
					if (this.firefox_options[i] && !Utils.isFirefox) continue;
					
					var type = typeof(param);
					if (type == 'number' || type == 'string' || type == 'boolean') {
					
						// uni-specific options
						if (this.uni_options[i]) {
							if (str_uni != '') str_uni +='&';
							str_uni += i+'='+param;
						}
						
						// global options
						else {
							if (str != '') str +='&';
							str += i+'='+param;
						}
					}
				}
				
				if (Utils.isFirefox){
					Utils.setValue('antigame', str);
					Utils.setValueUni('antigame', str_uni);
				}
				else {
					str += '&' + str_uni;
					Utils.setValue('antigame', str);
				}
			}
			catch (e) { Utils.log(e); }
		},
		
		loadOptions: function()
		{
			try {
				var str = Utils.getValue('antigame');
				if (!str) return;
				
				var str_uni = Utils.getValueUni('antigame');
				if (str_uni) str += '&' + str_uni;
				
				str = str.split('&');

				for (var i=0; i<str.length; i++) {
					var pair = str[i].split('=');
					if (!pair || pair.length != 2) continue;

					var param = Options[pair[0]];
					switch (typeof(param))
					{
						case('number'): if ( !isNaN(parseInt(pair[1],10)) ) Options[pair[0]] = parseInt(pair[1],10); break;
						case('string'): Options[pair[0]] = pair[1]; break;
						case('boolean'): Options[pair[0]] = (pair[1]=='true' ? true: false); break;
						default: ;
					}
				}
			}
			catch (e) { Utils.log(e); }

		},
		
		setOptionWithValidation: function(name, value)
		{
			var oldtype = this.getValueType(Options[name]);
			var newtype = this.getValueType(value);
			var ok = false;

			if (name=='galaxy_PlayerColors' || name=='galaxy_AllyColors') {
				ok = true;
			}
			else if ( (oldtype != 'number' && oldtype != 'color') || oldtype == newtype )
			{	
				if (oldtype == 'color')
					value = value.toUpperCase();
				
				ok = true;
			}
			
			if (ok) Options[name] = value;
		},
		
		getValueType: function(value)
		{
			if (!value) return typeof(value);
			
			var val = value.toString();
			
			if ( val.replace(/\d{1,10}/i, '') == '' ) return 'number';
			if ( val.replace(/#[A-F\d]{6,6}/i, '') == '' ) return 'color';
			
			return 'string';
		},
		
		insertCSSRules: function()
		{
			Utils.insertCSSRule('#anti_options_window { \
				position:absolute; \
				left: 200px; \
				top:100px; \
				width:600px; \
				background:#202025; \
				border: 1px solid #555555; \
				z-index:1000; \
				}');

			Utils.insertCSSRule('#anti_options_window div[id] { ' +
				'padding: 10px; ' +
				'}');
				
			Utils.insertCSSRule('#anti_options_window div#note { \
				text-align: left; \
				padding-bottom: 0; \
				font-size: 10px; \
				}');
				
			Utils.insertCSSRule('#anti_options_window span.notemark, div#note { \
				color: #3344CC; \
				}');

			Utils.insertCSSRule('#anti_options_window #content { \
				text-align: left; \
				max-height: 400px; \
				overflow:auto; \
				border-top: 1px #555555 dashed; \
				border-bottom: 1px #555555 dashed; \
				}');
				
			Utils.insertCSSRule('#anti_options_window #content .sectiontitle {\
				text-align: center;\
				border: 1px solid #772277;\
				}');

			Utils.insertCSSRule('#anti_options_window .section table {\
				width: 100%;\
				}');

			Utils.insertCSSRule('#anti_options_window .section td.input {\
				width: 20em;\
				}');


			Utils.insertCSSRule('#anti_options_window #content td { ' +
				'padding: 0.2em;' +
				'text-align: left;' +
				'font-size: 11px;' +
				'}');

			Utils.insertCSSRule('#anti_options_window input[type="text"] { ' +
				'width: 8em;' +
				'}');
				
			Utils.insertCSSRule('#anti_options_window input[type="text"].long { ' +
				'width: 18em;' +
				'}');
				
			Utils.insertCSSRule('#anti_options_window option { ' +
				'width: 7em;' +
				'}');


			Utils.insertCSSRule('.anti_button { \
				display: block; \
				float: left; \
				width: 50px; \
				background:#442233; \
				border: 2px black solid; \
				text-decoration: none; \
				margin: 0px 5px 5px 5px; \
				padding: 2px 5px; \
				}');
			Utils.insertCSSRule('.anti_button:hover { \
				background:#664466; \
				}');
				
			Utils.insertCSSRule('#btnHomePage { \
				width: 80px; \
				}');
		},

		addOptionsButton: function()
		{
			try {
				var $ = Utils.$;
				var item = $('#menuTable li:first').clone(true);
				
				var img = 				
				item.find('.menu_icon')
				.find('a')
					.attr({
						'class':'',
						'href':'javascript:void(0)'
					})
					.unbind('click')
					.click(function(){ setTimeout( function(){
							Coords.reset();
							Coords.initImg(null,true);

						}, 0) })
				.find('img')
					.attr({
						'id':'btnCoords',
						'width':'27',
						'height':'27'
						})
					.get(0)
				;
				
				Coords.initImg(img);
				
				item.find('.menubutton')
					.attr('href','javascript:void(0)')
					.attr('id','btnAntiOptions')
					.attr('target','_self')
					.removeClass('selected')
					.bind('click', Options.showWindow)
					.find('.textlabel').html('Antigame v'+version);
				item.appendTo('#menuTable');
				
				
				
			}
			catch (e) { Utils.log(e); }
		},

		hideWindow: function(save)
		{
			try {
				var $ = Utils.unsafeWindow.$;
				
				if (save) {
					var inputs = $('#anti_options_window input, #anti_options_window select');

					for (var i=0; i<inputs.length; i++) {
						var item = inputs.eq(i);
						var id = item.attr('id');
						var param = Options[id];

						if (typeof(param) == 'boolean')
							Options[id] = item.attr('checked');

						else if ( (typeof(param) == 'string' || typeof(param) == 'number') ) {
							Options.setOptionWithValidation(id, item.attr('value'))
						}
					}
					
					Options.saveOptions();
				}

				$('#anti_options_window').addClass('hidden');
			}
			catch (e) { Utils.log(e); }
		},

		showWindow: function()
		{
			try {
				var $ = Utils.unsafeWindow.$;
				
				if ($('#anti_options_window').length == 0) Options.createWindow();

				var inputs = $('#anti_options_window input, #anti_options_window select');
				
				for (var i=0; i<inputs.length; i++) {
					var item = inputs.eq(i);
					var param = Options[item.attr('id')];
					
					if (typeof(param) == 'boolean' && param)
						item.attr('checked', param);

					else if ( (typeof(param) == 'string' || typeof(param) == 'number') )
						item.attr('value', param);
				}

				$('#anti_options_window .color').trigger('keyup');

				$('#anti_options_window').removeClass('hidden');
			}
			catch (e) { Utils.log(e); }
		},

		changeInputColor: function(e)
		{
			try {
				var value = e.target.value.split(',').pop();
				if (Options.getValueType(value) == 'color')
					e.target.style.backgroundColor = value;
			}
			catch (e) {Utils.log(e); }
			return true;
		},

		createWindow: function()
		{
			var notemark = '<span class="notemark">(*)</span>';
			
			function createButton(id) {
				var str = '<a class="anti_button" id="'+id+'" href="javascript:void(0)">' +	Options.Interface['opt_'+id] + '</a>';
				return str;
			}
			
			function createButtonHref(id, href, label) {
				var str = '<a class="anti_button" target="_blank" id="'+id+'" href="' + href + '">' +
					(label || Options.Interface['opt_'+id]) + '</a>';
				return str;
			}
			
			function addItem(label, content, newrow) {
				if(typeof(newrow) == 'undefined') newrow = true;

				var str = '<td class="label">'+label+'</td><td class="input">'+content+'</td>';
				if (newrow) str = '<tr>' + str + '</tr>';

				return str;
			}

			function createSelect(id, options, label, newrow) {
				if(typeof(newrow) == 'undefined') newrow = true;
				if(typeof(label) == 'undefined' || label == '-auto-') label = Options.Interface['opt_'+id];

				var str = '';

				for (var i=0; i<options.length; i++) {
					str += '<option value="'+options[i].value+'">'+options[i].text+'</option>';
				}

				str = '<select id="'+id+'">' + str + '</select>';
				str = addItem(label, str, newrow);
				return str;
			}

			function createInput(id,label,newrow) {
				if (Options.firefox_options[id] && !Utils.isFirefox) return;
				
				var param = Options[id];
				var type, class_attr='';
				if (typeof(param)=='boolean') type = 'checkbox';
				if ((typeof(param) == 'string' || typeof(param) == 'number') ) type = 'text';

				if(!type) return;
				
				if (id == 'galaxy_PlayerColors' || id == 'galaxy_AllyColors') class_attr = 'class="color long"';
				else if (Options.getValueType(param) == 'color') class_attr = 'class="color"';
				else if (typeof(param) == 'string') class_attr = 'class="long"';

				if(typeof(newrow) == 'undefined') newrow = true;
				
				if(typeof(label) == 'undefined' || label == '-auto-') label = Options.Interface['opt_'+id];
				if (Options.uni_options[id]) label += ' ' + notemark;
				
				var str = addItem(label, '<input id="'+id+'" type="'+type+'" '+class_attr+'>', newrow);
				return str;
			}
			
			function startSection(title, classname) {
				classname = classname || '';
				classname += ' section';
				var str = '<div class="'+classname+'"><table>';
				if (title) str += '<tr><td colspan="4" class="sectiontitle">'+title+'</td></tr>';
				
				return str;
			}

			function endSection() {
				return '</table></div>';
			}

			var $ = Utils.unsafeWindow.$;

			// prepare dropdown boxes
			
			// missions
			var missions = [
				{value:1, text:Options.Interface.lbl_missAttack},
				{value:3, text:Options.Interface.lbl_missTransport},
				{value:4, text:Options.Interface.lbl_missDeploy},
				{value:5, text:Options.Interface.lbl_missHold},
				{value:6, text:Options.Interface.lbl_missEspionage},
				{value:9, text:Options.Interface.lbl_missDestroy},
				];
				
			missions.sort( function (a,b) { return (a.text==b.text) ? 0 :  (a.text<b.text) ? -1 : 1 } );
				
			// language
			var language_list = [];
			for (var i in AntiGame_lang) {
				var str = i.toString().match(/^Interface([A-Z]{2,3})$/);
				if (str)
					language_list.push( {value: str[1], text: AntiGame_lang[i].opt_languageName} );
			}
			
			// EventList position
			var evt_positions = [ 
				{value:1, text: Options.Interface.lbl_onTop}, 
				{value:0, text: Options.Interface.lbl_onBottom}
				];
				
			// Resources info position
			var res_positions = [ 
				{value:0, text: ' - '}, 
				{value:1, text: Options.Interface.lbl_onBottom},
				{value:2, text: Options.Interface.lbl_onLeft}
				];

			var div = document.createElement('div');
			div.className = 'hidden';
			div.id = 'anti_options_window';
			div.innerHTML =
				'<div id="title">'+Options.Interface.opt_title+'</div>' + 
				'<div id="content">' +
				startSection(Options.Interface.lbl_sectionGeneral) +
					createSelect('language', language_list) +
					createInput('showLocalTime') +
					createInput('showServerOgameClock') +
					createInput('blockAutoComplete') +
					createSelect('showResources', res_positions) +
					createInput('showDeficient') +
					createInput('showNames') +
					createInput('nameColorOn') +
					createInput('nameColorOff') +
					createInput('nameColorDisabled') +
					createInput('uni_SpeedFactor') +
				endSection() +
				startSection(Options.Interface.lbl_sectionEventList) +
					createInput('showEventList') +
					createSelect('evt_showOnTop', evt_positions) +
					createInput('evt_noScroll') +
				endSection() +
				startSection(Options.Interface.lbl_sectionGalaxy) +
					createInput('galaxyShowRank') +
					createInput('galaxyRankColor') +
					createInput('galaxyDebrisMin') +
					createInput('galaxyDebrisColor') +
					createInput('galaxyHideMoon') +
					createInput('galaxy_Players') +
					createInput('galaxy_PlayerColors') +
					createInput('galaxy_Allys') +
					createInput('galaxy_AllyColors') +
					createInput('galaxy_killTips') +
					createInput('galaxy_keepTipsPlanets') +
					createInput('galaxy_keepTipsDebris') +
				endSection() +
				startSection(Options.Interface.lbl_sectionMessages) +
					createInput('msg_PlunderThreshold') +
					createInput('msg_DebrisThreshold') +
					createInput('msg_foldSmallPlunder') +
					createInput('msg_showPlunder') +
					createInput('msg_addButtons') +
					createInput('msg_fixColors') +
					createInput('msg_killTips') +
				endSection() +
				startSection(Options.Interface.lbl_sectionFleetDispatch) +
					createInput('fleet_showCapacity') +
					createInput('fleet1_killTips') +
					createInput('autocopyCoords') +
					createInput('fleet2_setTargetDF') +
					createInput('fleet2_fixLayout') +
					createInput('fleet2_ShortLinks') +
					createSelect('mission1', missions, Options.Interface.opt_missionPriority) +
					createSelect('mission2', missions, '') +
					createSelect('mission3', missions, '') +
					createSelect('mission4', missions, '') +
					createSelect('mission5', missions, '') +
				endSection() +
				startSection(Options.Interface.lbl_sectionFleetMovement) +
					createInput('mvmt_expandFleets') +
					createInput('mvmt_showReversal') +
					createInput('missAttack') +
					createInput('missColony') +
					createInput('missDeploy') +
					createInput('missDestroy') +
					createInput('missEspionage') +
					createInput('missExpedition') +
					createInput('missFederation') +
					createInput('missHarvest') +
					createInput('missHold') +
					createInput('missTransport') +
				endSection() +
				'</div>' +
				'<div id="note"> ' + notemark + ' ' + this.Interface.lbl_optionsNote1 + ' (Firefox)</div>' +
				'<div id="control">' + 
					createButton('btnOk') + createButton('btnCancel') + 
					createButtonHref('btnHomePage','http://userscripts.org/scripts/show/58952', 'Home page')
				'<div style="clear:both; padding: 0px"></div></div>';
			document.body.appendChild(div);
			
			$('#btnOk').bind('click', function() { setTimeout( function () {Options.hideWindow(true);}, 0)} );
			$('#btnCancel').bind('click', function() { Options.hideWindow(false);} );
			$('#anti_options_window .color')
				.bind('change', Options.changeInputColor)
				.bind('keyup', Options.changeInputColor);
		},
		
		copyMissingProperties: function(src, parent, strChild)
		{
			var dst = parent[strChild];
			if (!dst) {
				parent[strChild] = src;
				return;
			}
			
			if (src === dst) return;

			for (i in src) {
				if ( !dst[i] || typeof(src[i]) != typeof(dst[i]) )
					dst[i] = src[i];
			}
		},

		readResLabels: function()
		{
			function getValueFromId(id) {
				var node = document.getElementById(id);
				if (!node || !node.title) return;
				
				return node.title.match(/\|<B>\s*(.+):\s*<\/B>/i)[1];
			}
			
			this.Labels.lbl_metal = getValueFromId('metal_box');
			this.Labels.lbl_crystal = getValueFromId('crystal_box');
			this.Labels.lbl_deuterium = getValueFromId('deuterium_box');
			this.Labels.lbl_energy = getValueFromId('energy_box');
			this.Labels.lbl_darkmatter = getValueFromId('darkmatter_box');
		},

		initLang: function()
		{
			if (!this.language) this.language = Utils.server_lang;
			
			var external_langpack = Utils.unsafeWindow.AntiGame_lang;
			if (external_langpack)
				for (var i in external_langpack)
					AntiGame_lang[i] = external_langpack[i];

			this.Interface = AntiGame_lang['Interface'+this.language];
			this.Labels = AntiGame_lang['Labels'+Utils.server_lang];
						
			this.copyMissingProperties(AntiGame_lang.LabelsEN, this, 'Labels');
			this.copyMissingProperties(AntiGame_lang.InterfaceEN, this, 'Interface');
			
			this.readResLabels();
		},

		Init: function()
		{
			this.insertCSSRules();
			
			if (Utils.uni_prefix == 'UNI42_ORG') this.uni_SpeedFactor = 2;
			else if (Utils.uni_prefix == 'ELECTRA_ORG') this.uni_SpeedFactor = 4;
			else if (Utils.uni_prefix == 'CAPELLA_RU') this.uni_SpeedFactor = 4;
			
			this.loadOptions();
			
			this.initLang();
			this.addOptionsButton();
			
			this.Interface.lbl_btnDeleteSmallPlunder = this.Interface.lbl_btnDeleteSmallPlunder
				.replace( '$plunder', Utils.formatNumber(this.msg_PlunderThreshold*1000) )
				.replace( '$debris', Utils.formatNumber(this.msg_DebrisThreshold*1000) )
				;
				
			this.Interface.opt_galaxy_killTips = this.Interface.opt_killTips + ' ('+this.Interface.lbl_sectionGalaxy+')';
			this.Interface.opt_fleet1_killTips = this.Interface.opt_killTips + ' ('+this.Interface.lbl_sectionFleetDispatch+' 1)';
			this.Interface.opt_msg_killTips = this.Interface.opt_killTips + ' ('+this.Interface.lbl_sectionMessages+')';

		}
	}


	// =======================================================================
	// Date/Time functions
	// =======================================================================

	var DateTime = 
	{
		TimeDelta: 0,
		TimeZoneDelta: 0,
		InitialServerTime: 0,

		getTimeDelta: function()
		{
			if (Utils.isCurrentPage('showmessage,eventList,phalanx'))
			{
				this.TimeZoneDelta = parseInt(Utils.getValueUni('TimeZoneDelta', 0), 10);
				return;
			}

			this.TimeDelta = 0;
			if (!Utils.script) return;

			this.InitialServerTime = Utils.unsafeWindow.serverTime;

			if (!this.InitialServerTime) return;
			this.InitialServerTime = this.InitialServerTime.getTime();

			var now = new Date();

			// server time (using current timezone) - local time
			this.TimeDelta = now.getTime() - this.InitialServerTime;

			// timezone correction
			this.TimeZoneDelta = - ( now.getTimezoneOffset()/60 + Utils.unsafeWindow.TimezoneOffset ) *60*60*1000;

			if (!Utils.isCurrentPage('showmessage,eventList'))
				Utils.setValueUni('TimeZoneDelta', this.TimeZoneDelta);
		},

		LZ: function(x)
		{
			return (x<0||x>9?"":"0") + x;
		},

		getDatePart: function (date)
		{ 
			return Date.UTC(date.getFullYear(),date.getMonth(),date.getDate()); 
		},
		
		getFinishTime: function(tick)
		{
			var date = new Date();
			date.setTime(this.InitialServerTime + parseInt(tick)*1000, 10);
			return date;
		},
		
		formatDate: function (date, format)
		{
			var str = "";
			try {
				if (!format || format=="") {
					format = '[H]:[i]:[s]';
					var now = new Date();

					if (this.getDatePart(now) != this.getDatePart(date) )
						format = '[d]/[m] ' + format;
				}
				
				var str = format;
				
				str = str.replace("[d]",this.LZ(date.getDate()));
				str = str.replace("[m]", this.LZ(date.getMonth()+1));
				str = str.replace("[Y]", date.getFullYear());
				str = str.replace("[y]", date.getFullYear().toString().substr(2,4));
				str = str.replace("[H]", this.LZ(date.getHours()));
				str = str.replace("[i]", this.LZ(date.getMinutes()));
				str = str.replace("[s]",this.LZ(date.getSeconds()));
			}
			catch (e) { Utils.log(e); }

			return str;
		},
		
		formatDate2: function (date, format)
		{
			if (Options.showLocalTime)
				return DateTime.formatDate(date, format);
			else
				return DateTime.formatDateServer(date, format);
		},
		
		formatDateServer: function (date, format)
		{
			if (!format || format=="") {
				format = '[H]:[i]:[s]';
				var now = new Date();

				if (this.getDatePart(now) != this.getDatePart(date) )
					format = '[d]/[m] ' + format;
			}

			
			date.setTime (date.getTime() - this.TimeZoneDelta );
			return DateTime.formatDate( date, format);
		},
		
		parseTime: function (strTime)
		{
			if (!strTime) return 0;
			
			strTime = strTime.replace(/[^0-9:]/,'');
			var parts = strTime.split(':');
			
			if (!parts || parts.length != 3) return 0;
			
			return (parseInt(parts[0],10)*60*60 + parseInt(parts[1],10)*60 + parseInt(parts[2],10)) * 1000;
		},

		// d = day, m = month, y = year (2 digits), Y = year (4 digits), H = hour (2 digits), i = minutes, s = seconds
		parse: function (strDate, format)
		{
			strDate = strDate.toString();
			var str = format.match(/\[[dmyYHis]\]/g);
			
			if (!str || !str.length) return null;

			var rx = format;
			rx = rx.replace(/\./g,'\\.');
			rx = rx.replace(/\//g,'\\/');
			rx = rx.replace(/\-/g,'\\-');
			
			var index = {};

			for (var i=0; i<str.length; i++) {
				var token = str[i];
				if (token == '[Y]') rx = rx.replace(token, '(\\d{4,4})');
				else if (token == '[y]') rx = rx.replace(token, '(\\d{2,2})');
				else rx = rx.replace(token, '(\\d{1,2})');

				token = token.substr(1,1);
				index[token] = i+1;
			}
			
			str = strDate.match(new RegExp(rx, ''));
			
			
			if (!str || !str.length) return null;
			
			
			var date = new Date();
			date.setSeconds(0); date.setMinutes(0); date.setHours(0);
			
			if (str[index.s]) date.setSeconds(str[index.s]);
			if (str[index.i]) date.setMinutes(str[index.i]);
			if (str[index.H]) date.setHours(str[index.H]);
			
			if (str[index.Y]) date.setFullYear(str[index.Y]);
			else if (str[index.y]) {
				var year = date.getFullYear();
				year = Math.floor(year / 100) * 100 + str[index.y];
				if (year > date.getFullYear()) year -= 100;
				date.setFullYear(year);
			}
			
			if (str[index.m]) date.setMonth(str[index.m] - 1);
			if (str[index.d]) date.setDate(str[index.d]);
			
			return date;
		},
		
		parse2: function(strDate, timeFormat, dateFormat)
		{
			if (!strDate) return null;
			
			if (!timeFormat) {
				timeFormat = '[H]:[i]:[s]';
				dateFormat = '[d].[m].[Y]';
			}

			var str = strDate.toString();

			if (!dateFormat)
			{
				return this.parse(str, timeFormat, true);
			}
			else 
			{
				var time = this.parse(str, timeFormat);
				var date = this.parse(str, dateFormat);

				if (!date && !time) return null;

				var newDate = new Date();

				if (date) {
					newDate.setFullYear(date.getFullYear());
					newDate.setMonth(date.getMonth());
					newDate.setDate(date.getDate());
				}

				if (time) {
					newDate.setHours(time.getHours());
					newDate.setMinutes(time.getMinutes());
					newDate.setSeconds(time.getSeconds());
				}
				
				return newDate;
			}
		},
		
		convertDateServer2Local: function(date)
		{
			var newDate = new Date();
			newDate.setTime( date.getTime() + this.TimeZoneDelta );
			return newDate;
		},
		
		convertStringServer2Local: function (strDate, timeFormat, dateFormat)
		{
			if (!timeFormat) {
				timeFormat = '[H]:[i]:[s]';
				dateFormat = '[d].[m].[Y]';
			}

			var oldDate = this.parse2(strDate, timeFormat, dateFormat);
			if (!oldDate) return strDate;

			var newDate = this.convertDateServer2Local(oldDate);
			
			var str = strDate.toString();
			str = str.replace(this.formatDate(oldDate,timeFormat), this.formatDate(newDate,timeFormat));
			
			if (dateFormat) str = str.replace(this.formatDate(oldDate,dateFormat), this.formatDate(newDate,dateFormat));
			
			return str;
		},
		
		changeOgameClocks2Server: function()
		{
			var code = ' \
				function UhrzeitAnzeigen() { \
				var Sekunden = serverTime.getSeconds(); \
				serverTime.setSeconds(Sekunden+1); \
				Uhrzeitanzeige = getFormatedDate(serverTime.getTime() - ' + this.TimeZoneDelta + ', "[d].[m].[Y] <span>[H]:[i]:[s]</span>"); \
				if(document.getElementById) \
					document.getElementById("OGameClock").innerHTML = Uhrzeitanzeige; \
				else if(document.all) \
					Uhrzeit.innerHTML = Uhrzeitanzeige; \
				} ';
				
			Utils.runScript(code);
		},
		
		changeNodesTime: function (xpath, format)
		{
			var nodes = Utils.XPath(xpath);
			
			for (var i = 0; i < nodes.snapshotLength; i++)
				{
					var node = nodes.snapshotItem(i);
					node.innerHTML = DateTime.convertStringServer2Local(node.innerHTML, format);
				}
		},
		
		Init: function()
		{
			this.getTimeDelta();
			
			//if (Options.showLocalTime)
			//	this.changeOgameClocks2Local();
			
			if (Options.showServerOgameClock)
				this.changeOgameClocks2Server();
		}
	}

	
	// =======================================================================
	// misc functions
	// =======================================================================
	var Utils =
	{
		page: "",
		unsafeWindow: window,
		bg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAALHRFWHRDcmVhdGlvbiBUaW1lAHPhYiAzMSBPdXQgMjAwOSAxODoyNjowOSAtMDAwMBvBwloAAAAHdElNRQfZCh8SGy7RbQlkAAAACXBIWXMAAB7BAAAewQHDaVRTAAAABGdBTUEAALGPC/xhBQAAAA1JREFUeNpjYGBgmAEAAJ0AmeuxAnUAAAAASUVORK5CYII=",
		
		// wrappers for GM functions
		setValue: function ( cookieName, cookieValue )
		{
			if (Utils.isFirefox)
				GM_setValue(cookieName, cookieValue);
				
			else {
			if( !cookieName ) { return; }
				var lifeTime = 31536000;
				document.cookie = escape( cookieName ) + "=" + escape( Utils.getRecoverableString( cookieValue ) ) +
					";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
			}
		},
		
		getValue: function ( cookieName, oDefault )
		{
			if (Utils.isFirefox)
				return GM_getValue(cookieName, oDefault);
				
			else {
				var cookieJar = document.cookie.split( "; " );
				for( var x = 0; x < cookieJar.length; x++ ) {
					var oneCookie = cookieJar[x].split( "=" );
					if( oneCookie[0] == escape( cookieName ) ) {
						try {
							eval('var footm = '+unescape( oneCookie[1] ));
						} catch(e) { return oDefault; }
						return footm;
					}
				}
				return oDefault;
			}
		},
		
		setValueUni: function ( name, value )
		{
			Utils.setValue(Utils.uni_prefix + name, value);
		},

		getValueUni: function ( name, def )
		{
			return Utils.getValue(Utils.uni_prefix + name, def);
		},

		log: function (str)
		{
			if (Utils.isFirefox)
				GM_log(str);
			else if (Utils.isOpera)
				window.opera.postError(str);
		},
		
		dump: function(obj, proplist, showUndefined)
		{
			if ( typeof(showUndefined) == 'undefined' ) showUndefined = true;
			
			if (typeof(obj) != 'object') {
				var label = ( proplist ? proplist+': ' : '' );
				Utils.log(''+label+obj);
			}

			else if (!proplist) {
				for (var i in obj)
					try {
						if (typeof(obj[i]) != 'function')
							Utils.log(i+': '+obj[i])
					} catch(e) {}

			}
			else {
				var props = proplist.split(',');
				for (var i=0; i<props.length; i++)
					try {
						var prop = props[i];
						if (showUndefined || typeof(obj[prop]) != 'undefined') Utils.log(prop+': '+obj[props[i]])
					} catch(e) {}
			}
		},
		
		getRecoverableString: function(oVar,notFirst)
		{
			var oType = typeof(oVar);
			if( ( oType == 'null' ) || ( oType == 'object' && !oVar ) ) {
				//most browsers say that the typeof for null is 'object', but unlike a real
				//object, it will not have any overall value
				return 'null';
			}
			if( oType == 'undefined' ) { return 'window.uDfXZ0_d'; }
			if( oType == 'object' ) {
				//Safari throws errors when comparing non-objects with window/document/etc
				if( oVar == window ) { return 'window'; }
				if( oVar == document ) { return 'document'; }
				if( oVar == document.body ) { return 'document.body'; }
				if( oVar == document.documentElement ) { return 'document.documentElement'; }
			}
			if( oVar.nodeType && ( oVar.childNodes || oVar.ownerElement ) ) { return '{error:\'DOM node\'}'; }
			if( !notFirst ) {
				Object.prototype.toRecoverableString = function (oBn) {
					if( this.tempLockIgnoreMe ) { return '{\'LoopBack\'}'; }
					this.tempLockIgnoreMe = true;
					var retVal = '{', sepChar = '', j;
					for( var i in this ) {
						if( i == 'toRecoverableString' || i == 'tempLockIgnoreMe' || i == 'prototype' || i == 'constructor' ) { continue; }
						if( oBn && ( i == 'index' || i == 'input' || i == 'length' || i == 'toRecoverableObString' ) ) { continue; }
						j = this[i];
						if( !i.match(basicObPropNameValStr) ) {
							//for some reason, you cannot use unescape when defining peoperty names inline
							for( var x = 0; x < cleanStrFromAr.length; x++ ) {
								i = i.replace(cleanStrFromAr[x],cleanStrToAr[x]);
							}
							i = '\''+i+'\'';
						} else if( window.ActiveXObject && navigator.userAgent.indexOf('Mac') + 1 && !navigator.__ice_version && window.ScriptEngine && ScriptEngine() == 'JScript' && i.match(/^\d+$/) ) {
							//IE mac does not allow numerical property names to be used unless they are quoted
							i = '\''+i+'\'';
						}
						retVal += sepChar+i+':'+getRecoverableString(j,true);
						sepChar = ',';
					}
					retVal += '}';
					this.tempLockIgnoreMe = false;
					return retVal;
				};
				Array.prototype.toRecoverableObString = Object.prototype.toRecoverableString;
				Array.prototype.toRecoverableString = function () {
					if( this.tempLock ) { return '[\'LoopBack\']'; }
					if( !this.length ) {
						var oCountProp = 0;
						for( var i in this ) { if( i != 'toRecoverableString' && i != 'toRecoverableObString' && i != 'tempLockIgnoreMe' && i != 'prototype' && i != 'constructor' && i != 'index' && i != 'input' && i != 'length' ) { oCountProp++; } }
						if( oCountProp ) { return this.toRecoverableObString(true); }
					}
					this.tempLock = true;
					var retVal = '[';
					for( var i = 0; i < this.length; i++ ) {
						retVal += (i?',':'')+getRecoverableString(this[i],true);
					}
					retVal += ']';
					delete this.tempLock;
					return retVal;
				};
				Boolean.prototype.toRecoverableString = function () {
					return ''+this+'';
				};
				Date.prototype.toRecoverableString = function () {
					return 'new Date('+this.getTime()+')';
				};
				Function.prototype.toRecoverableString = function () {
					return this.toString().replace(/^\s+|\s+$/g,'').replace(/^function\s*\w*\([^\)]*\)\s*\{\s*\[native\s+code\]\s*\}$/i,'function () {[\'native code\'];}');
				};
				Number.prototype.toRecoverableString = function () {
					if( isNaN(this) ) { return 'Number.NaN'; }
					if( this == Number.POSITIVE_INFINITY ) { return 'Number.POSITIVE_INFINITY'; }
					if( this == Number.NEGATIVE_INFINITY ) { return 'Number.NEGATIVE_INFINITY'; }
					return ''+this+'';
				};
				RegExp.prototype.toRecoverableString = function () {
					return '\/'+this.source+'\/'+(this.global?'g':'')+(this.ignoreCase?'i':'');
				};
				String.prototype.toRecoverableString = function () {
					var oTmp = escape(this);
					if( oTmp == this ) { return '\''+this+'\''; }
					return 'unescape(\''+oTmp+'\')';
				};
			}
			if( !oVar.toRecoverableString ) { return '{error:\'internal object\'}'; }
			var oTmp = oVar.toRecoverableString();
			if( !notFirst ) {
				//prevent it from changing for...in loops that the page may be using
				delete Object.prototype.toRecoverableString;
				delete Array.prototype.toRecoverableObString;
				delete Array.prototype.toRecoverableString;
				delete Boolean.prototype.toRecoverableString;
				delete Date.prototype.toRecoverableString;
				delete Function.prototype.toRecoverableString;
				delete Number.prototype.toRecoverableString;
				delete RegExp.prototype.toRecoverableString;
				delete String.prototype.toRecoverableString;
			}
			return oTmp;
		},
				
		addSpanMark: function(value, content)
		{
			var className = !value ? 'middlemark' : value > 0 ? 'undermark' : 'overmark';
			content = content || ('(' + ( (value>0)?'+':'' ) + Utils.formatNumber(value) + ')' );
			return '<span class="'+className+'">'+content+'</span>';
		},
		
		blockAutocomplete: function()
		{
			var forms = document.getElementsByTagName('form');
			for (var i=0; i<forms.length; i++) 
				forms[i].setAttribute('autocomplete','off');
		},

		checkRedesign: function()
		{
			return (this.unsafeWindow.$ || this.isCurrentPage('showmessage')) ? true : false;
		},
		
		createStyleSheet: function()
		{
			document.getElementsByTagName('head')[0].appendChild(document.createElement("style"));
			Utils.stylesheet = document.styleSheets[document.styleSheets.length-1];
		},
		
		formatNumber: function (num)
		{
			var str = '' + num;
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(str)) {
				str = str.replace(rgx, '$1' + this.separator + '$2');
			}

			return str;
		},
		
		trim: function(str)
		{
			return str ? str.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1") : null;
		},
		
		getDocScript: function()
		{
			var scripts = document.getElementsByTagName('script');
			this.script = null;
			
			var n = 0;

			for (var i=0; i<scripts.length; i++)
				if (!scripts[i].src && ! (this.isCurrentPage('messages') && n++ == 0)) {
					this.script = scripts[i];
					break;
				}

		},

	    insertAfter: function (newElement,targetElement)
		{
			if (!newElement || !targetElement) return;
			
			var parent = targetElement.parentNode;
			if(parent.lastchild == targetElement)
				parent.appendChild(newElement);
			else
				parent.insertBefore(newElement, targetElement.nextSibling);
		},
		
		deleteNode: function(node)
		{
			if(node) node.parentNode.removeChild(node);
		},

		insertCSSRule: function (rule)
		{
			Utils.stylesheet.insertRule(rule, 0);
		},
		
		isCurrentPage: function (page)
		{
			var pages = page.toLowerCase().split(',');
			for (var i=0; i<pages.length; i++)
				if (pages[i] == this.page )
					return true;
					
			return false;
		},
		
		runScript: function (code)
		{
			if (!code || code=="") return;
			document.location.href = 'javascript:'+code+';void(0);';
		},
		
		trigger: function (id, event)
		{
			
			var node = ( (typeof(id) == 'string') ? document.getElementById(id) : id );
			if (!node) return;
			
			var evt;
			if (event == 'click' || event == 'mouseup') {
				evt = document.createEvent("MouseEvents");
				evt.initMouseEvent(event, true, true, Utils.unsafeWindow,  0, 0, 0, 0, 0, false, false, false, false, 0, null);
			}
			else if (event == 'change' || event == 'focus') {
				var evt = document.createEvent("HTMLEvents");
				evt.initEvent(event, true, false);
			}
			else if (event == 'keyup' || event == 'keypress') {
			}
			
			if (evt) node.dispatchEvent(evt);
			
		},
		
		killCluetips: function(selector)
		{
			selector = selector || '.tips';
			Utils.$(selector).cluetip('destroy').unbind('mouseover').each(function(){this.title = this.title.replace('|','')});
		},
		
		XPath: function(path, context, type)
		{
			try {
				if (!context) context = document;
				mydoc = context.ownerDocument || document;
				if (!type) type = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
				return mydoc.evaluate(path, context, null, type, null)
			}
			catch (e) {Utils.log(e); }
		},
		
		XPathSingle: function(path, context)
		{
			return this.XPath(path, context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE).snapshotItem(0);
		},
		
		getElementsByClassName: function(className, context)
		{
			var path = '';
			var classes = className.match(/\S+/gi);
			for (var i=0; i<classes.length; i++) {
				var c = classes[i];
				if (path) path += ' and ';
				if (c.substr(0,1) == '!') {
					path += 'false=';
					c = c.substr(1);
				}

				path += 'contains(concat(" ", normalize-space(@class), " "), " ' + c + ' ")';
			}
			
			return this.XPath('descendant::*['+path+']', context);
		},
		
		getElementByClassName: function(className, context)
		{
			return this.getElementsByClassName(className,context).snapshotItem(0);
		},
		
		parseInt: function(str)
		{
			if (!str) return null;
			//str = str.replace(/(\d+)kk/i, '$1'+'000000');
			return parseInt(str.replace(/[^\d\-]/g, ''), 10);
		},

		extractInt: function(str, rx)
		{
			if (!str) return null;
			str = str.toString();
			
			if (!rx)
				return Utils.parseInt(str);

			str = str.match(rx);
			if (!str) return null;
			else return Utils.parseInt(str[1]);
		},
		
		getIntById: function(id, property, rx) {
			var node = document.getElementById(id);
			property = property || 'innerHTML';
			if (!node || !node[property]) return null;
			return Utils.extractInt(node[property], rx);
		},
		
		getIntByXPath: function(xpath, property, rx)
		{
			property = property || 'innerHTML';
			var node = Utils.XPathSingle(xpath);
			if (!node) return null;
			return Utils.extractInt(node[property], rx);
		},

		initUni: function()
		{
			this.server = "EN";
			
			var url = document.location.href;
			server = url.match(/http:\/\/([^\\\/]+[\\\/])/i);
			
			if (server) server = server[1].toUpperCase();
			server = server.replace(/\\/i, '/');
			
			if 		(server.indexOf('AR.OGAME.ORG/') > -1)  this.server = 'AR'; // Argentina
			else if (server.indexOf('BA.OGAME.ORG/') > -1)  this.server = 'BA'; // Balkan countries
			else if (server.indexOf('BG.OGAME.ORG/') > -1)  this.server = 'BG'; // Bulgaria
			else if (server.indexOf('OGAME.COM.BR/') > -1)  this.server = 'BR'; // Brasil
			else if (server.indexOf('CN.OGAME.ORG/') > -1)  this.server = 'CN'; // China
			else if (server.indexOf('OGAME.CZ/') > -1)  this.server = 'CZ'; // Czech Republic
			else if (server.indexOf('OGAME.DE/') > -1)  this.server = 'DE'; // Germany
			else if (server.indexOf('OGAME.DK/') > -1)  this.server = 'DK'; // Denmark
			else if (server.indexOf('OGAME.COM.ES/') > -1)  this.server = 'ES'; // Spain
			else if (server.indexOf('FI.OGAME.ORG/') > -1)  this.server = 'FI'; // Finnland
			else if (server.indexOf('OGAME.FR/') > -1)  this.server = 'FR'; // France
			else if (server.indexOf('OGAME.GR/') > -1)  this.server = 'GR'; // Greece
			else if (server.indexOf('OGAME.COM.HR/') > -1)  this.server = 'HR'; // Croatia
			else if (server.indexOf('OGAME.HU/') > -1)  this.server = 'HU'; // Hungary
			else if (server.indexOf('OGAME.IT/') > -1)  this.server = 'IT'; // Italy
			else if (server.indexOf('OGAME.JP/') > -1)  this.server = 'JP'; // Japan
			else if (server.indexOf('OGAME2.CO.KR/') > -1)  this.server = 'KR'; // Korea
			else if (server.indexOf('OGAME.LT/') > -1)  this.server = 'LT'; // Lithuania
			else if (server.indexOf('OGAME.LV/') > -1)  this.server = 'LV'; // Latvia
			else if (server.indexOf('MX.OGAME.ORG/') > -1)  this.server = 'MX'; // Mexico
			else if (server.indexOf('OGAME.NL/') > -1)  this.server = 'NL'; // Netherlands
			else if (server.indexOf('OGAME.NO/') > -1)  this.server = 'NO'; // Norway
			else if (server.indexOf('OGAME.ONET.PL/') > -1)  this.server = 'PL'; // Poland
			else if (server.indexOf('OGAME.COM.PT/') > -1)  this.server = 'PT'; // Portugal
			else if (server.indexOf('OGAME.RO/') > -1)  this.server = 'RO'; // Romania
			else if (server.indexOf('OGAME.RU/') > -1)  this.server = 'RU'; // Russia
			else if (server.indexOf('OGAME.SE/') > -1)  this.server = 'SE'; // Sweden
			else if (server.indexOf('OGAME.SI/') > -1)  this.server = 'SI'; // Slovenia
			else if (server.indexOf('OGAME.SK/') > -1)  this.server = 'SK'; // Slovakia
			else if (server.indexOf('OGAME.COM.TR/') > -1)  this.server = 'TR'; // Turkey
			else if (server.indexOf('OGAME.TW/') > -1)  this.server = 'TW'; // Taiwan
			else if (server.indexOf('OGAME.US/') > -1 ) this.server = 'US'; // USA
			else if (server.indexOf('OGAME.ORG/') > -1) this.server = 'ORG'; // UK
			
			this.server_lang = this.server;
			if (this.server == 'US' && this.server == 'ORG') this.server_lang = 'EN';

			this.uni = url.toUpperCase().match(/:\/\/([a-z0-9]+)\./i);
			this.uni = this.uni ? this.uni[1] : '0';
			
			var uni_server = this.uni + '.' + this.server;
			
			this.uni_prefix = uni_server.replace(/[\.\-]/g, '_');
			
			this.page = document.location.search.match(/page=(\w+)/i);
			this.page = this.page ? this.page[1].toLowerCase() : "";
		},
		
		Init: function()
		{
			this.createStyleSheet();

			this.isOpera = (window.opera) ? true : false;
			this.isFirefox = (window.navigator.userAgent.indexOf('Firefox') > -1 ) ? true : false;
			
			this.getDocScript();
			
			try { this.unsafeWindow = unsafeWindow; }
			catch (e) { this.unsafeWindow = window; }
			
			this.$ = this.unsafeWindow.$;
			
			try { this.separator = this.unsafeWindow.LocalizationStrings['thousandSeperator'] || '.' }
			catch (e) { this.separator = '.' }
			
			
			// server abbr, server language, uni, speedfactor, page name
			this.initUni();
		}
	}


	// =======================================================================
	// Ogame formulas and functions
	// =======================================================================
	
	var Ogame =
	{
		TECH_ENERGY: 113,
		TECH_COMB_DRIVE: 115,
		TECH_IMPULSE_DRIVE: 117,
		TECH_HYPER_DRIVE: 118,
		
		used_techs: [113, 115, 117, 118],

		createShip: function (id, name, metal, crystal, drive, speed, capacity)
		{
			var ship = new Object();
			ship.name = name;
			ship.metal = metal;
			ship.crystal = crystal;
			
			switch (drive) {
				case 1: drive = this.TECH_COMB_DRIVE; break;
				case 2: drive = this.TECH_IMPULSE_DRIVE; break;
				case 3: drive = this.TECH_HYPER_DRIVE; break;
				default: drive = this.TECH_COMB_DRIVE; break;
			}
			ship.drive = drive;
			ship.speed = speed;
			ship.capacity = capacity;
			
			this.ships[id] = ship;
		},

		readTechs: function()
		{
			try {
				this.techs = [];
				Utils.$('#buttonz a.detail_button').each(
					function() {
						Ogame.techs[this.getAttribute('ref')] = 
							Utils.parseInt( Utils.$(this).find('.level').get(0).lastChild.nodeValue );
					} );
				
				this.saveTechs();
			} catch (e) { Utils.log(e) }
		},

		readTemperature: function()
		{
			// ---------
			// min t * 2
			// ---------
			this.temperature = 0;
			
			var node;
			var nodes = Utils.XPath('//A[contains(@class,"planetlink")][@title]');
			if (!nodes) return;
			
			if (nodes.snapshotLength == 1) node = nodes.snapshotItem(0);
			else 
				for (var i=0; i<nodes.snapshotLength; i++)
					if ( nodes.snapshotItem(i).className.indexOf('active') > -1 ) {
						node = nodes.snapshotItem(i);
						break;
					}
			
			if (!node) return;
			
			var t = node.title.match(/<br>.*<br>[^\d\-]*([\d\-]+)/i);
			if (!t) return;

			this.temperature = t[1] * 2;
		},

		readOfficers: function()
		{
			function checkOfficer(i) {
				return officers.get(i).src.indexOf('_un.gif') == -1;
			}
			
			var officers = Utils.$('#officers a img');
			this.engineer = checkOfficer(2);
			this.geologist = checkOfficer(3);
		},
		
		getTech: function(id)
		{
			if (this.techs == null) this.loadTechs();
			return this.techs[id];
		},
		
		getTemperature: function()
		{
			if (this.temperature == null) this.readTemperature();
			return this.temperature;
		},
		
		getGeologist: function()
		{
			if (this.geologist == null) this.readOfficers();
			return this.geologist;
		},

		getEngineer: function()
		{
			if (this.engineer == null) this.readOfficers();
			return this.engineer;
		},

		getConsumption: function(id, level)
		{
			if (!id || level<0) return;
			
			if (level == 0) return 0;
			
			var res = 0;
			
			if (id == 12)
				res = Math.floor( 10 * level * Math.pow(1.1, level) ) * Options.uni_SpeedFactor;
				
			return Math.floor(res);
		},
		
		getProduction: function(id, level)
		{
			if (!id || level<0) return;

			if (level == 0)
				return (id==1) ? 20 * Options.uni_SpeedFactor :
								(id==2) ? 10  * Options.uni_SpeedFactor : 0;
			
			var res = 0;

			if (id == 1)
				res = 30 * level * Math.pow(1.1, level);
			else if (id == 2)
				res = 20 * level * Math.pow(1.1, level);
			else if (id == 3)
				res = 10 * level * Math.pow(1.1, level) * (1.28 - 0.002 * this.getTemperature());
			else if (id == 4)
				res = 20 * level * Math.pow(1.1, level);
			else if (id == 12)
				res = 30 * level * Math.pow( 1.05 + this.getTech(this.TECH_ENERGY) * 0.01, level);
			
			if (id==1 || id==2 || id==3)
				res = Math.floor(res) * Options.uni_SpeedFactor;
				
			if (id <=3 && this.getGeologist())
				res = Math.floor(res) * 1.1;
			else if (id>3 && this.getEngineer())
				res = Math.floor(res) * 1.1;

				
			return Math.floor( res + this.getProduction(id, 0) );
			
		},
		
		getStorageCapacity: function(id, level)
		{
			if (!id || level<0) return;
			if (id != 22 && id != 23 && id != 24) return;
			var res;
			
			switch (level) {
				case 0: res = 10; break;
				case 1: res = 20; break;
				case 2: res = 40; break;
				case 3: res = 75; break;
				case 4: res = 140; break;
				case 5: res = 255; break;
				case 6: res = 470; break;
				case 7: res = 865; break;
				case 8: res = 1590; break;
				case 9: res = 2920; break;
				case 10: res = 5355; break;
				case 11: res = 9820; break;
				case 12: res = 18005; break;
				case 13: res = 33005; break;
				case 14: res = 60510; break;
				case 15: res = 110925; break;
				case 16: res = 203350; break;
				case 17: res = 372785; break;
				case 18: res = 683385; break;
				case 19: res = 1297589; break;
				case 20: res = 2296600; break;
				default: res = 0;
			}
			
			return res*1000;
		},
		
		loadTechs: function()
		{
			try {
				//if (!Utils.isFirefox) return;
				//restore saved values

				this.techs = [];
				
				var str = Utils.getValueUni('techs');
				if (!str) return;
				
				str = str.split('&');
				for (var i=0; i<str.length; i++) {
					var pair = str[i].split('=');
					this.techs[ parseInt(pair[0],10) ] = parseInt(pair[1],10);
				}
			} catch (e) { Utils.log(e) }
		},
		
		saveTechs: function()
		{
			//if (!Utils.isFirefox) return;

			var str = '';
			for (var i in this.used_techs) {
				var id = this.used_techs[i];
				if (str) str += '&';
				str += ''+id+'='+this.techs[id];
			}
			
			Utils.setValueUni('techs', str);
		},

		updateShipSpeed: function()
		{
			if (this.getTech(this.TECH_IMPULSE_DRIVE) >= 5) {
				this.ships[202].speed = 10000;
				this.ships[202].drive = this.TECH_IMPULSE_DRIVE;
			}

			if (this.getTech(this.TECH_HYPER_DRIVE) >= 8) {
				this.ships[211].speed = 5000;
				this.ships[211].drive = this.TECH_HYPER_DRIVE;
			}

			for (var i in this.ships) {
				var ship = this.ships[i];
				var factor = (ship.drive == this.TECH_COMB_DRIVE) ? 0.1 : (ship.drive == this.TECH_IMPULSE_DRIVE) ? 0.2 : 0.3;
				ship.speed = Math.floor( ship.speed * (1 + this.getTech(ship.drive) * factor) );
				
			}
			
		},
		
		Init: function()
		{
			this.temperature = this.geologist = this.engineer = this.techs = null;

			var str = document.location.href.match(/:\/\/([^\/]+)\//);
			this.prefix = str ? str[1].toUpperCase().replace(/[\.\-]/g, '') : '';

			this.ships = [];
			// id, name, metal, crystal, drive, speed, capacity
			this.createShip(202, 'SCargo',		2000,	2000,	1, 5000,	5000);
			this.createShip(203, 'LCargo',		6000,	6000,	1, 7500,	25000);
			this.createShip(204, 'LFighter',	3000,	1000,	1, 12500,	50);
			this.createShip(205, 'HFighter',	6000,	4000,	2, 10000,	100);
			this.createShip(206, 'Cruiser',		20000,	7000,	2, 15000,	800);
			this.createShip(207, 'Battleship',	45000,	15000,	3, 10000,	1500);
			this.createShip(208, 'Colonizator',	10000,	20000,	2, 2500,	7500);
			this.createShip(209, 'Recycler',	10000,	6000,	1, 2000,	20000);
			this.createShip(210, 'Spy',			0,		1000,	1, 100000000, 0);
			this.createShip(211, 'Bomber',		50000,	25000,	2, 4000,	500);
			this.createShip(213, 'Destroyer',	60000,	50000,	3, 5000,	2000);
			this.createShip(214, 'RIP',			5000000,4000000,3, 100,		1000000);
			this.createShip(215, 'BCruiser',	30000,	40000,	3, 10000,	750);
			this.createShip(212, 'Satellite',	0,		2000,	1, 0,		0);
		}
	}


	
	// =======================================================================
	// A few functions for player/ally highlighting
	// =======================================================================
	var Colorer = 
	{
		PLAYER: 'Player',
		ALLY: 'Ally',
		
		prepare: function(who, names, colors)
		{
			try {
				if (!names || !colors) return;
				
				names = names.split(',');
				colors = colors.split(',');
				
				this[who+'Colors'] = [];
				
				for (var i=0; i<names.length; i++)
					if (names[i] || colors[i]) this[who+'Colors'][names[i]] = colors[i];
			} catch(e) { Utils.log(e) }
		},
		
		highlight: function(who, xpath, context, parser)
		{
			try {
				if ( !this[who+'Colors'] ) return;
				var node = Utils.XPathSingle(xpath, context);
				if(!node || !node.firstChild) return;
				
				var name = Utils.trim(node.firstChild.nodeValue);
				if (typeof parser == 'function') name = parser(name);
				if(!name) return;

				var color = this[who+'Colors'][name];
				if (color) node.style.color = color;
			} catch(e) { Utils.log(e) }
		},
		
		Init: function()
		{
			this.prepare(this.PLAYER, Options['galaxy_Players'], Options['galaxy_PlayerColors'] );
			this.prepare(this.ALLY, Options['galaxy_Allys'], Options['galaxy_AllyColors'] );
		}
	}

	
	// functions to create simple table like 
	// 		<title>
	// <label:> <value>
	// <label:> <value>
	
	var SimpleTable =
	{
		addCell: function(_key, _value, _value_class, _id)
		{
			if (typeof(_key) == 'undefined') _key = '';
			if (typeof(_value) == 'undefined') _value = '';
			
			this.data[this.data.length] = { key: _key, value: _value, value_class: _value_class, id: _id, attr: '' };
			this.lastCell = this.data[this.data.length-1];
		},
		
		addHref: function (key, value, id)
		{
			if (typeof(key) == 'undefined') key = '';
			if (typeof(value) == 'undefined') value = '';
			var str = '<a href="javascript:void(0)" id="'+id+'">'+value+'</a>';
			this.addCell(key, str, this.href_class || '', id);
		},
		
		createTableString: function(values_in_row)
		{
			function addAttr(attr, value) {
				return (value ? attr+'="'+value+'" ' : '');
			}
			
			values_in_row = values_in_row || 1;
			var str = '';
			for (var i=0; i<Math.ceil(this.data.length/values_in_row); i++)
			{
				str += '<tr>';
				for (var j=0; j<values_in_row; j++) {
					var cell = this.data[i*values_in_row+j];
					if (!cell) continue;
					str +=	'<td '+addAttr('class', this.key_class)+'>' + (cell.key ? cell.key+':' : ' ') + '</td>' +
							'<td '+ addAttr('class', cell.value_class || this.value_class) +
									addAttr('id', cell.id)+' '+cell.attr+'>' + Utils.formatNumber(cell.value) + '</td>';
				}
				
				str += '</tr>';
			}
			str = '<tbody><tr>' + 
						'<th class="'+this.title_class+'" colspan="'+values_in_row*2+'">' + this.title +'</th>' +
					'</tr>' + str + '</tbody>';
			return str;
		},

		init: function(title, title_class, key_class, value_class)
		{
			this.title = title || '';
			this.title_class = title_class || '';
			this.key_class = key_class || '';
			this.value_class = value_class || '';
			this.data = new Array();
		}
	};
	
	
	// =======================================================================
	// functions for Coords storing
	// =======================================================================
	var Coords = 
	{
		img_on: 'data:image/gif;base64,R0lGODlhGwAbAOYAAAAAAP///wkJDAYHCQcICgkLDgoMDwsNEA0PEg8SFhIVGRwgJQoNEAcJCwsOEQkLDQ8SFQoMDhATFhYaHhcbHx0iJx8kKRoeIhsfIyowNiMoLQcICRseIRIUFgkKCx8lKjhARzE4PltncVRfaBAUFxEVGBIWGRsgJBwhJT9IT0pUXGJveT5GTAoNDwwPETtESlFdZU1YYEZQV4WXo36Pm3eHkml3gTU8QSwyNmJveFllbXyNmHODjVBbYhsgI2p5gkdRVyMoKwwQEgYICQcJCg8TFQcKCwkMDQwPEAECAgQEBP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEsALAAAAAAbABsAAAf/gEtLHyiFhoeIiR+CSxaHC5CQiJKIHz6DhpGam5GTPhMTmZyjoxWgCxkgGqSsCyEgKKAXMTMgraQ2MwunMSKrt5whMye8McCkw8UgMgvLGTLLzTLP0dEzsRMYMTEpNAsrIyA23d/h497gC7qg2sY0MjMhzwvv8fP1Ieq7oNsLIjU1NP0LGGkgpBkUJhCZoELFhBczYIACBVHixIqgZkzYAAAACxYAPMzA0bGjSJIlT3acUdIjyBszerSEKbMkzZUtPwLQ8WNHS54+SwLFWfKjSA47cHAAcjTp0qYkWRZlcYMHgB49guSoejXrVqtYAcxIMrUDBwBmPXAwi5aDWrZsZKV21NmypJKOd+sSnZujg96/dWHmnBFEL1kAh/XmkAu4ceMhAAY4nlyywJEHlhsYIcC5c2POQzwIWCIEgQsXDg6obsHagOsIrxkwAOAAiW1GJhSQICGhdxEIv4EnEE68RAlBgQAAOw==',
		img_off: 'data:image/gif;base64,R0lGODlhGwAbAOYAAAAAAP///wkJDAcHCAsLDAYHCQcICiMmKwkLDgoMDwsNEA0PEg8SFhIVGSgrLysuMhwgJR8jKAoNEAcJCwsOEQkLDQ8SFQoMDhATFhYaHhcbHx0iJx8kKRoeIhsfIwcICR4iJiElKSQoLAkKCycqLS0wMzM2OSMlJycpKxUWFxkaGx8lKhAUFxEVGBIWGRsgJBwhJSAkJyQoKyYqLSktMAoNDwwPETI1NzE0NjU4OhsgIwwQEgYICQcJCg8TFS4yNBweHyAiIwcKCwkMDQwPECotLi4xMgECAg4PDxITEwQEBP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEsALAAAAAAbABsAAAf/gEtLKzCFhoeIiSuCSxyHEJCQiJKIKzqDhpGam5GTOhkZmZyjoxugEBEHIKSsECEHMKAdDjkHraQ/ORCnDg+rt5whOS+8DsCkw8UHMxDLETPLzTPP0dE5sRkeDg4iJhAlNAc/3d/h497gELqg2sYmMzkhzxDv8fP1Ieq7oNsQDzc3NP0LGGkgpBwaMvTIIENGhhg5SIACBVHixIqgcmT4AACAChUAlORI0rGjSJIlT3bMUdIjyBQ5grSEKbMkzZUtPwI4UQRHS54+SwLFWfKjSAI4khAAcjTp0qYkWRZVkcIIgCBBkKCoejXrVqtYAeQ4MnUAAQBmlRAwi5aAWrZsYqV21Nkypcm6JeV6RDEAr9+6MHPmQIKXLADDeFHo/cv4Lw8ABRpLLolgSIXKE4QY2MyZ8WYeIwQs2bHAhg0KClLXWJ2g9QXXEiQAoECkNiMXDViwwMDbhwXfvxkEH96ihaBAADs=',
		img_hl: 'data:image/gif;base64,R0lGODlhGwAbAOYAAAAAAP///wkJDAYHCQcICgkLDgoMDwsNEA0PEg8SFhIVGRwgJQoNEAcJCwsOEQkLDQ8SFQoMDhATFhYaHhcbHx0iJx8kKRoeIhsfIwcICQkKCx8lKhAUFxEVGBIWGRsgJBwhJQoNDwwPERsgIwwQEgYICQcJCg8TFQcKCwkMDQwPEAECAmlNMVpCKks3IzwsHC0hFR4WDg8LB62BVoNkRXheRDYyLpdtRYhiPnlXN+KkaNOZYcSOWrWDU6Z4TNWbZMiSX6B4UpNvTYZmSXVaQWtVQFpIN15MO1FDN0Q6MikpKQQEBP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEwALAAAAAAbABsAAAf/gExMGyCFhoeIiRuCTBaHC5CQiJKIGyODhpGam5GTIxMTmZyjoxWgCzZISqSsC0lIIKAXNTpIraQzOgunNUKrt5xJOh+8NcCkw8VIRQvLNkXLzUXP0dE6sRMYNTVHPwtBQ0gz3d/h497gC7qg2sY/RTpJzwvv8fP1Seq7oNsLQkBANP0LGGkgJB0UJpiYQITIBCM6aIACBVHixIqgdEzIAAAACxYAZOhw0bGjSJIlT3bUUdIjyBY6cLSEKbMkzZUtPwK40WNHS54+SwLFWfKjSBg7XMDIcTTp0qYkWRZl0YIHABw4XvioejXrVqtYAehYMTUGDABmZcAwixaGWrZsZKV21Nmy5JKOd+sSnesjht6/dWHm1PFCL1kAh/X6kAu4ceMSAAY4nlyyQIoHlhugIMC5c2POJTQIYEICgQgRDg6oDsHagOsIrxkwAOBAhW1GHhRw4CCh9wkIv4EnEE68QwdBgQAAOw==',
	
		get: function ()
			{
				return Utils.getValueUni('Coords');
			},

		parse: function (str, reg, extract, save)
			{
				var found = false;
				var matches = str.match(reg);
				if (!matches) return false;

				for (var i=0; i<matches.length; i++)
				{
					var coords = matches[i].toString();
					if (extract) coords = coords.replace(reg,"$1");


					var temp = coords.split(':');
					var g = parseInt(temp[0],10);
					var s = parseInt(temp[1],10);
					var p = parseInt(temp[2],10);
					if (g+"" == temp[0] && s+"" == temp[1] && p+"" == temp[2] &&
						!(g < 1 || g > 50) && !(s < 1 || s > 499 || (s > 100 && g > 9)) && !(p < 1 || p > 16))
					{
						if (save) 
							this.set(coords);
						found = true;
						break;
					}
				}

				return found;
			},
			
		read: function(str, save)
			{
				if (typeof(save) == 'undefined') save = true;
				
				if(str.length > 0)
				{
					if (this.parse(str, /\[(\d{1,2}:\d{1,3}:\d{1,2})\]/gi,true, save))
						return true;
					else if (this.parse(str, /\d{1,2}:\d{1,3}:\d{1,2}/gi,false, save))
						return true;
					else {
						str = str.replace(/[>\s\[\(](\d{1,2})[:\.\-\/\s](\d{1,3})[:\.\-\/\s](\d{1,2})[\s\]\)<,\.]/gi,"$1:$2:$3");
						str = str.replace(/^(\d{1,2})[:\.\-\/\s](\d{1,3})[:\.\-\/\s](\d{1,2})[\s\]\)<,\.]/gi,"$1:$2:$3");
						str = str.replace(/[>\s\[\(](\d{1,2})[:\.\-\/\s](\d{1,3})[:\.\-\/\s](\d{1,2})$/gi,"$1:$2:$3");
						str = str.replace(/^(\d{1,2})[:\.\-\/\s](\d{1,3})[:\.\-\/\s](\d{1,2})$/gi,"$1:$2:$3");
						return this.parse(str, /\d{1,2}:\d{1,3}:\d{1,2}/gi,false, save);
					}
				}
				return false;
			},
			
		saved: function()
			{
				return (Utils.getValueUni('CoordsFlag') == '1');
			},
			
		set: function (value)
			{
				Utils.setValueUni('Coords', value); 
				Utils.setValueUni('CoordsFlag', '1');
				
				this.initImg();
			},
			
		reset: function()
			{
				Utils.setValueUni('Coords', ''); 
				Utils.setValueUni('CoordsFlag', '0');
			},
			
		initImg: function(img,mouseover)
		{
			img = img || document.getElementById('btnCoords');
			if (!img) return;
			var saved = this.saved();
			
			if (mouseover) {
				img.setAttribute('rel', (saved?this.img_on:this.img_off) );
				
				if (!saved)
					img.setAttribute('src', this.img_off );
			}
			else {
				img.setAttribute('src', (saved?this.img_on:this.img_off) );
				img.setAttribute('rel', (saved?this.img_hl:this.img_off) );
			}
			img.setAttribute('title',(saved?Options.Interface.lbl_resetCoords+this.get():''));
			img.parentNode.style.cursor = saved ? 'pointer': 'default';
		},
			
		onMouseUp: function(e) {
			if ((!e) || ((e.ctrlKey) && (!e.keyCode))) return;
			
			var targetclassname = e.target.toString();

			try {
				if(targetclassname.match(/InputElement|SelectElement|OptionElement/i) || targetclassname.match(/object XUL/i))
					return;
				/*
				if(e.target.ownerDocument.designMode)
					if(e.target.ownerDocument.designMode.match(/on/i))
						return;
				*/
				Coords.read(window.getSelection().toString());
			}
			catch(e) {
				Utils.log(e);
			}
		},
		
		Init: function()
		{
			document.addEventListener('mouseup', function (e){ Coords.onMouseUp(e); }, false);
		}
	
	}
	
	
	var EventList =
	{
		maxClueHeight: (5+14) * 12,
		
		changeTime: function()
		{
			/*var nodes = Utils.XPath('//LI[@class="arrivalTime"]');
			
			for (var i=0; i<nodes.snapshotLength; i++) {
				var node = nodes.snapshotItem(i);
				node.innerHTML = DateTime.convertStringServer2Local(node.innerHTML, '[H]:[i]:[s]');
			}
			*/
			DateTime.changeNodesTime('//LI[@class="arrivalTime"]', '[H]:[i]:[s]');
		},
		
		processPro: function()
		{
			function putElementDown(el, delta){
				el.style.top = (el.offsetTop + delta) + 'px';
			}
		
			try{
				Utils.insertCSSRule('#eventListWrap { margin-left: 0 !important}');
				
				var parent = window.parent;
				if (parent) {

					parent = parent.document;
					var h = document.body.offsetHeight;

					var newEventBox = parent.getElementById('newEventBox');
					delta = h - newEventBox.clientHeight;

					if (Options.evt_noScroll)
						h += this.maxClueHeight;
					
					newEventBox.style.height = h  + 'px';
					
					if (Options.evt_showOnTop) {
						putElementDown(Utils.getElementByClassName('c-left', parent.body), delta);
						putElementDown(Utils.getElementByClassName('c-right', parent.body), delta);
					}
					
					if (Options.evt_noScroll && Options.evt_showOnTop)
						parent.getElementById('planet').style.marginTop = (-this.maxClueHeight) + 'px';

				}
			}
			catch (e) { Utils.log(e) }
		},
		
		iframeReady: function()
		{
			try {
				var body = this.iframe.contentWindow.document.body;
				document.getElementById('eventboxLoading').style.display = 'none';
				
				if (!body || !body.firstChild)
					document.getElementById('eventboxBlank').style.display = 'block';

			} catch (e) { Utils.log(e) }
		},
		
		showEventList: function ()
		{
			try {
				this.insertCSSRules();
				var div = document.createElement('div');
				div.id = 'newEventBox';
				div.innerHTML = '<iframe id="iframeEventBox" src="index.php?page=eventList&pro=1&session='+ Utils.unsafeWindow.session +'"></iframe>';
				
				if (Options.evt_showOnTop) {
					var next = document.getElementById('planet');
					next.parentNode.insertBefore(div, next);
				}
				else {
					var prev = Utils.XPathSingle('//*[@class="content-box-s"][last()]');
					Utils.insertAfter(div, prev);
				}
				
				this.iframe = document.getElementById("iframeEventBox");
				this.iframe.contentWindow.addEventListener('load', function() { EventList.iframeReady() }, false)
				
			} catch (e) { Utils.log(e) }
		},

		insertCSSRules: function ()
		{
			Utils.insertCSSRule(' \
			#newEventBox{ \
				height: 0; \
				width: 720px; \
				margin-left: 0px; \
			} \
			');
			
			Utils.insertCSSRule(' \
			#newEventBox iframe{ \
				width: 100%; \
				height: 100%; \
			} \
			');
			
			Utils.insertCSSRule(' \
				#rechts{ \
					margin-left: 20px; \
				} \
			');
			
			if (!Options.evt_showOnTop) {
				Utils.insertCSSRule(' \
				#newEventBox { \
					float: left; \
				} \
				');
			}

			if (Options.evt_showOnTop && Options.evt_noScroll) {
				Utils.insertCSSRule(' \
				#planetdata { \
					float: left !important; \
					margin-left: 30px !important; \
				} \
				');
			}

		},

		Run: function()
		{
			if (Options.showLocalTime)
				this.changeTime();
				
			if ( document.location.href.indexOf('pro=1') > -1 ) {
				this.processPro();
				
				Utils.unsafeWindow.old_hideRows = Utils.unsafeWindow.hideRows;
				Utils.unsafeWindow.hideRows = function (data) {
					Utils.unsafeWindow.old_hideRows(data);
					EventList.processPro();
				}
			}
			
		}
	}
	
	
	var FinishTime = 
	{
		addConstructionTime: function (id, time)
		{
			if ( !id || !time || isNaN(time)) return;


			var tbody = document.getElementById(id).parentNode.parentNode.parentNode;

			var newRow = document.createElement('tr');
			newRow.className = 'data green';
			newRow.appendChild(document.createElement('td'));
			newRow.appendChild(document.createElement('td'));
			
			newRow.firstChild.className = 'text_align_right';
			newRow.lastChild.innerHTML = DateTime.formatDate2(DateTime.getFinishTime(time));
			newRow.lastChild.className = 'finishTime';
			tbody.appendChild(newRow);
		},
		
		
		ShowConstructions: function ()
		{
			var script = Utils.script;
			if (!script) return;

			Utils.insertCSSRule('.finishTime { padding-left: 12px }');
			Utils.insertCSSRule('.green { color: green; }');

			// buildings and research
			var str = script.innerHTML.match(/baulisteCountdown\(getElementByIdWithCache\(["']\w+["']\)\,\s*\d*/gi);

			if (str)
				for (var i=0; i<str.length; i++)
				{
					var res = str[i].match(/["'](\w+)["']\)\,\s*(\d*)/i);
					FinishTime.addConstructionTime(res[1], res[2]);
				}

			// shipyard
			str = script.innerHTML.match(/shipCountdown\((\s*getElementByIdWithCache\(["']\w+["']\)\,)+(\s*\d*\,){3,3}/i);

			if (str) {
				str[2] = str[2].match(/(\d+)/)[0];
				FinishTime.addConstructionTime('shipAllCountdown', str[2]);
			}
		}
	}


	// =======================================================================
	// functions for Fleet movement view
	// =======================================================================
	var FleetMovement = 
	{
		fleetXPath: '//*[@id="inhalt"]/descendant::*[contains(concat(" ",@class," ")," fleetDetails ") and contains(@id,"fleet")]',
		
		addReversalTimeBox: function(fleet)
		{
			if (! Utils.getElementsByClassName('reversal',fleet).snapshotLength ) return;

			var tip = Utils.XPathSingle('//*[@id="'+ fleet.id +'"]/descendant::*[contains(@class,"origin")]/*[@class="tips4"]');
			if(!tip) return;

			var str = tip.getAttribute('title');
			if (!str) return;

			var date = DateTime.parse2(str);
			if (!date) return;
			
			date = DateTime.convertDateServer2Local(date);

			var span = document.createElement('span');
			span.className = 'reversalTime';
			span.setAttribute('title', date.getTime());

			fleet.appendChild(span);
			this.updateReversalClock();
		},

		updateReversalClock: function()
		{
			try {
				var spans = Utils.getElementsByClassName('reversalTime');
				for (var i=0; i<spans.snapshotLength; i++)
				{
					var node = spans.snapshotItem(i);
					var date = new Date();
					var start = node.getAttribute('title');
					if (!start) continue;

					start = parseInt(start,10);
					
					date.setTime( (date.getTime() - DateTime.TimeDelta) * 2 - start );
					node.innerHTML = DateTime.formatDate2(date);
				}
			}
			catch (e) { Utils.log(e); }
		},
		
		correctTimes: function(fleet)
		{
			var times = Utils.XPath(
				'descendant::*[contains(@class,"absTime")] | ' +
				'*[@class="starStreak"]/descendant::*[@class="tips4"] | ' +
				'*[contains(@class, "reversal")]',
			fleet);
					
			for (var i=0 ; i < times.snapshotLength; i++ )
			{
				var node = times.snapshotItem(i);
				var property = (node.className.indexOf('tips4')>-1 ? 'title' : 'innerHTML');
				node[property] = DateTime.convertStringServer2Local(node[property]);
			}
		},
		
		getDetails: function (div)
		{
			var result = new Object();
			var string = "";

			var cells = div.getElementsByTagName('td');

			for (var i=0; i<cells.length; i++) {
				if (cells[i].colSpan=="2") {
					result.ships = string;
					string = "";
				}
				else {
					if (cells[i].className!="value" && string!="") string += " ";
					string += cells[i].innerHTML;
				}
			}

			result.cargo = string;
			return result;
		},

		getMissionClass: function (fleet)
		{
			var mission = Utils.getElementByClassName("mission", fleet);
			var mclass = "";
			
			switch(mission.innerHTML) {
				case (Options.Labels.lbl_missAttack): mclass = "ownattack"; break;
				case (Options.Labels.lbl_missHold): mclass = "ownhold"; break;
				case (Options.Labels.lbl_missColony): mclass = "owncolony"; break;
				case (Options.Labels.lbl_missDeploy): mclass = "owndeploy"; break;
				case (Options.Labels.lbl_missHarvest): mclass = "ownharvest"; break;
				case (Options.Labels.lbl_missTransport): mclass = "owntransport"; break;
				case (Options.Labels.lbl_missFederation): mclass = "ownfederation"; break;
				case (Options.Labels.lbl_missDestroy): mclass = "owndestroy"; break;
				case (Options.Labels.lbl_missEspionage): mclass = "ownespionage"; break;
				case (Options.Labels.lbl_missExpedition): mclass = "ownexpedition"; break;
				default: mclass = "owntransport";
			}
			
			return mclass;
		},

		insertCSSRules: function ()
		{
			if (Options.mvmt_expandFleets) {
				Utils.insertCSSRule(".detailsOpened .starStreak  {background:none}");
				Utils.insertCSSRule(".anti_fleetDetails {left:60px; width:290px; white-space:normal; padding:0px 7px; font-size:0.9em; text-align:left; line-height:1.2em}");

				Utils.insertCSSRule(".ownattack { color: "+Options.missAttack+" }");
				Utils.insertCSSRule(".owncolony { color: "+Options.missColony+" }");
				Utils.insertCSSRule(".owndeploy { color: "+Options.missDeploy+" }");
				Utils.insertCSSRule(".owndestroy { color: "+Options.missDestroy+" }");
				Utils.insertCSSRule(".ownespionage { color: "+Options.missEspionage+" }");
				Utils.insertCSSRule(".ownexpedition { color: "+Options.missExpedition+" }");
				Utils.insertCSSRule(".ownfederation { color: "+Options.missFederation+" }");
				Utils.insertCSSRule(".ownharvest { color: "+Options.missHarvest+" }");
				Utils.insertCSSRule(".ownhold { color: "+Options.missHold+" }");
				Utils.insertCSSRule(".owntransport { color: "+Options.missTransport+" } ");
				Utils.insertCSSRule(".ownmissile { color: "+Options.missMissile+" } ");
			}
			
			if (Options.mvmt_showReversal)
				Utils.insertCSSRule(".reversalTime { position: absolute; top: 43px; left: 555px; color: yellow;} ");
		},

		myOpenCloseFleet: function (id, change)
		{
			var fleet = document.getElementById(id);
			var span = Utils.getElementByClassName('starStreak', fleet);
			var details = Utils.getElementByClassName('anti_fleetDetails', fleet);

			var opened = fleet.className.match('detailsOpened') ? 1 : 0;
			
			// original OGame handler will be executed first
			// so if change=true then className has been already changed

			if ( change && !opened ) {

				span.removeAttribute("style");
				fleet.removeAttribute("style");

			}
			else if ( opened ) {
				var details_height = parseInt(details.offsetHeight, 10);
				var span_height = parseInt(span.offsetHeight, 10);
				var fleet_height = parseInt(fleet.offsetHeight, 10);
				var dif = details_height - span_height + 2;

				if (dif>0) {
					span_height += dif;
					fleet_height += dif;
					
					span.setAttribute("style","height:"+span_height+"px");
					fleet.setAttribute("style","height:"+fleet_height+"px");
				}
			}
		},
		
		myOpenCloseAll: function ()
		{
			var fleets = Utils.XPath(FleetMovement.fleetXPath);

			for (var i=0; i<fleets.snapshotLength; i++) {
				FleetMovement.myOpenCloseFleet(fleets.snapshotItem(i).id, 1);
			}
		},


		expandFleet: function (fleet)
		{
				var id = fleet.id.replace(/\D+/g, '');

				if (!id) return;

				var details = document.getElementById('details'+id);

				var newNode = document.createElement('div');
				newNode.setAttribute('class', 'anti_fleetDetails fixed '+this.getMissionClass(fleet));

				var res = this.getDetails(details);
				newNode.innerHTML = res.ships+'<br/><br/>'+res.cargo;

				var picto = Utils.XPathSingle(
					'descendant::*[contains(@class,"starStreak")]/' +
					'descendant::*[contains(@class,"route")]', fleet);

				picto.parentNode.replaceChild(newNode, picto);
				
				var mission = Utils.getElementByClassName('mission', fleet);
				var reversal = Utils.getElementByClassName('reversal', fleet);
				var next = Utils.getElementByClassName('nextMission', fleet);

				if (!reversal && next)
					mission.innerHTML += ' ('+Options.Interface.lbl_mvmt_Expedition+')';
				else if (!reversal)
					mission.innerHTML += ' ('+Options.Interface.lbl_mvmt_Return+')';

				// set 'openDetails' button handler
				var btn = Utils.XPathSingle('descendant::*[contains(@class,"openDetails")]/A', fleet);
				btn.addEventListener("click", function (){ setTimeout(function (){ FleetMovement.myOpenCloseFleet(fleet.id, 1); }, 0); }, false);

				// invoke the handler
				this.myOpenCloseFleet(fleet.id, 0);
		},

		Run: function()
		{
			if (!Options.mvmt_expandFleets && !Options.mvmt_showReversal) return;

			this.insertCSSRules();

			var fleets = Utils.XPath(FleetMovement.fleetXPath);

			for (var i=0; i<fleets.snapshotLength; i++) {
				var fleet = fleets.snapshotItem(i);
				if (Options.mvmt_expandFleets) this.expandFleet(fleet);
				if (Options.mvmt_showReversal) this.addReversalTimeBox(fleet);
				if (Options.showLocalTime) this.correctTimes(fleet);

			}

			if (Options.mvmt_expandFleets) {
				// set 'closeAll' button handler
				var btn = Utils.XPath('//*[@id="inhalt"]/descendant::*[contains(@class,"closeAll")]/A');
				btn = btn.snapshotItem(0);
				btn.addEventListener("click", function (){ setTimeout(FleetMovement.myOpenCloseAll, 0); }, false);
			}
			
			if (Options.mvmt_showReversal)
				setInterval(FleetMovement.updateReversalClock, 200);
		}
	}


	// =======================================================================
	// functions for Send fleet pages
	// =======================================================================
	var FleetSend = 
	{
		Capacity_insertCSSRules: function()
		{
			Utils.insertCSSRule('.total_capacity td {padding: 2px 5px; color: #A1A1A1; font-size: 11px;}');
			Utils.insertCSSRule('.total_capacity #total_capacity {color: green;}');
			Utils.insertCSSRule('.total_capacity td.capacity_href {text-decoration: underline; color: #5577EE;}');
			
			var top = Options.showNames ? 34 : 8;
			
			Utils.insertCSSRule('.speed { \
				position: absolute; \
				top: '+top+'px; \
				right: 3px; \
				max-width: 76px; \
				color: white; \
				background: transparent url("'+Utils.bg+'") repeat;\
				text-align: right; \
				font-size: 10px; \
			}');
		},
		
		addSpeed: function(node)
		{
			var id = node.id.replace(/\D/g, '');
			var speed = Ogame.ships[id].speed;
			speed = Utils.formatNumber(speed);
			
			var a = Utils.XPathSingle('descendant::DIV/descendant::A', node);
			if (!a) return;
			
			var div = document.createElement('div');
			div.className = 'speed';
			div.innerHTML = speed;
			
			a.appendChild(div);
		},
		
		showCapacity: function (node)
		{
			try {
				var txtFields = Utils.getElementsByClassName('fleetValues');

				var sum = 0, minspeed = 0;
				
				for ( var i=0; i<txtFields.snapshotLength; i++ ) {
					txt = txtFields.snapshotItem(i);
					var id = txt.id.replace('ship_','');
					if (! (id in Ogame.ships) ) continue;
					
					capacity = Ogame.ships[id].capacity;

					if (!isNaN(txt.value) && txt.value>0) {
						sum += txt.value * capacity;
						minspeed = Math.min(minspeed, Ogame.ships[id].speed) || Ogame.ships[id].speed;
					}
				}

				document.getElementById('total_capacity').innerHTML = Utils.formatNumber(sum);
				document.getElementById('min_speed').innerHTML = Utils.formatNumber(minspeed);
			}
			catch (e) {Utils.log(e);}
			
			return true;
		},
		
		setShips: function(ship_id, cnt)
		{
			var node = document.getElementById(ship_id);
			if (!node || node.disabled) return;
			node.value = cnt;
			Utils.trigger(ship_id,'change');
		},
		
		checkRecyclers: function()
		{
			var recyclers = false;
			var value = document.getElementById('ship_209').value;
			if (value && !isNaN(value) && parseInt(value, 10)>0) recyclers = true;
			
			setTimeout( function(){ Utils.setValueUni('fleet1_recyclers', recyclers) }, 0);
		},
		
		Fleet1_Run: function()
		{
			try {
				var unsafe = Utils.unsafeWindow;
				
				if (Utils.isFirefox && Options.fleet2_setTargetDF) {
					unsafe.old_trySubmit = unsafe.trySubmit;
					unsafe.trySubmit = function () { FleetSend.checkRecyclers(); unsafe.old_trySubmit() };
				}
				
				if (Options.fleet1_killTips)
					Utils.killCluetips();
			
				if (!Options.fleet_showCapacity) return;
				var no_fleet = false;
				
				var parent = Utils.getElementByClassName('allornonewrap');
				
				if(!parent) {
					no_fleet = true;
					parent = document.getElementById('warning');
					if(!parent) return;
				}

				this.Capacity_insertCSSRules();
				
				var res = Utils.getIntById('resources_metal') + Utils.getIntById('resources_crystal') + Utils.getIntById('resources_deuterium');
				var scargo = Math.ceil(res/5000);
				var lcargo = Math.ceil(res/25000);
				
				var newDiv = document.createElement('div');
				newDiv.className = 'fleft total_capacity';
				SimpleTable.init();
				SimpleTable.key_class = 'capacity_key';
				SimpleTable.href_class = 'capacity_href';
				SimpleTable.addCell(Options.Interface.lbl_resources, res);
				SimpleTable.lastCell.attr = 'colspan="2"';
				SimpleTable.addCell();
				
				if (no_fleet) {
					Utils.insertCSSRule('.total_capacity {margin: 2px 25px;}');
					
					SimpleTable.addCell(Options.Labels.lbl_shipSCargo, scargo);
					SimpleTable.addCell(Options.Labels.lbl_shipLCargo, lcargo);
					newDiv.innerHTML = '<table>' + SimpleTable.createTableString(2) + '</table>';
					parent.appendChild(newDiv);
				}
				else {
					Ogame.updateShipSpeed();
					Utils.$('form li')
						.filter( function() {return !isNaN(this.id.replace('button','')) } )
						.each( function(){FleetSend.addSpeed(this)});

					SimpleTable.addHref(Options.Labels.lbl_shipSCargo, scargo, 'SCargo');
					SimpleTable.addHref(Options.Labels.lbl_shipLCargo, lcargo, 'LCargo');
					SimpleTable.addCell(Options.Interface.lbl_TotalCapacity,0, '', 'total_capacity');
					SimpleTable.addCell();
					SimpleTable.addCell(Options.Interface.lbl_MinSpeed,0, '', 'min_speed');
					SimpleTable.lastCell.attr = 'colspan="2"';
					newDiv.innerHTML = '<table>' + SimpleTable.createTableString(2) + '</table>';

					Utils.insertAfter(newDiv, parent.firstChild.nextSibling);

					document.getElementById('SCargo').addEventListener('click', function (){ FleetSend.setShips('ship_202', scargo); return true; }, false );
					document.getElementById('LCargo').addEventListener('click', function (){ FleetSend.setShips('ship_203', lcargo); return true; }, false );

					//this.setCapacityHandler();
					unsafe.old_checkShips = unsafe.checkShips;
					unsafe.checkShips = function(form) { FleetSend.showCapacity(); unsafe.old_checkShips(form) }

				}
			} catch (e) { Utils.log(e) }
		},

		getPartsFromLink: function(link)
		{
			var parts = link.split('#');
			if (parts.length < 4) return null;
			
			var res = {};
			res.galaxy = parseInt(parts[0], 10);
			res.system = parseInt(parts[1], 10);
			res.planet = parseInt(parts[2], 10);
			res.type = parseInt(parts[3], 10);
			res.name = parts[4] || '';
			res.weight = res.galaxy * 1000000 + res.system*1000 + res.planet*10 + res.type;
			
			return res;
		},

		insertShortLink: function(link,nextlink)
		{
			try {
				var parts = this.getPartsFromLink(link);
				if (!parts) return;
				if (!parts.name) link += '#';
				
				var slbox = document.getElementById('slbox');
				if (!slbox) return;
				var options = slbox.getElementsByTagName('option');
				var next;
				
				
				var nextparts = nextlink ? this.getPartsFromLink(nextlink) : null;
				
				for (var i=1; i<options.length; i++) {
					if (nextlink) {
						var curparts = this.getPartsFromLink(options[i].value);
						if (curparts.galaxy == nextparts.galaxy && curparts.system == nextparts.system && 
							curparts.planet == nextparts.planet && curparts.type == nextparts.type
							) 
							next = options[i];
					}
					if (link == options[i].value) return;
				}
				
				var opt = document.createElement('option');
				opt.value = link;
				opt.innerHTML = parts.name + ' [' + parts.galaxy + ':' + parts.system + ':' + parts.planet + ']';
				
				if (next) slbox.insertBefore(opt,next)
				else slbox.appendChild(opt);
				
			} catch (e) { Utils.log(e) }
		},
		
		getSLinkFromPlanet: function(planet)
		{
			try {
				var name = Utils.XPathSingle('SPAN[@class="planet-name"]', planet).innerHTML;
				var coords = Utils.XPathSingle('SPAN[@class="planet-koords"]', planet).innerHTML;
				var type = 1;
				coords = coords.replace(/[\[\]]/g,'').split(':');
				var res = coords[0] + '#' + coords[1] + '#' + coords[2] + '#' + type + '#' + name;
				return res;
			} catch (e) { Utils.log(e) }
		},
		
		isTargetEmpty: function()
		{
			//check whether the coords have been already set
			var items = Utils.XPath('//*[@id="inhalt"]/descendant::*[@class="fleetStatus"]/UL/LI');
			
			for (var i=0; i<items.snapshotLength; i++)
				if ( Coords.read(items.snapshotItem(i).innerHTML, false) )
					return false;
					
			return true;
		},
		
		SetCoords: function ()
		{
			if (!Coords.saved()) return;

			var coords = Coords.get().split(':');
			
			document.getElementById('galaxy').value = coords[0];
			document.getElementById('system').value = coords[1];
			document.getElementById('position').value = coords[2];

			Utils.trigger('galaxy', 'change');
			
			var df = document.getElementById('dbutton');
			if ( !df || df.className.indexOf('selected') == -1 )			
				Utils.trigger('pbutton', 'click');
		},
		
		Fleet2_Run: function()
		{
			if (Options.fleet2_fixLayout) {
				var nodes = Utils.XPath('//DIV[@id="buttonz"]/DIV/UL');
				if (nodes.snapshotLength) {
					nodes.snapshotItem(0).style.marginLeft = "20px";
					nodes.snapshotItem(1).style.marginLeft = "20px";
				}
			}
			
			var unsafe = Utils.unsafeWindow;
			
			var activelink, nextlink;
			
			var activePlanet = Utils.XPathSingle('//A[contains(@class,"active") and contains(@class,"planetlink")]');
			activelink = this.getSLinkFromPlanet(activePlanet);
			
			var nextPlanet = Utils.XPathSingle('parent::*/following-sibling::*/A[contains(@class,"planetlink")]', activePlanet);
			if (nextPlanet) nextlink = this.getSLinkFromPlanet(nextPlanet);
			
			this.insertShortLink(activelink, nextlink);
			
			var shortlinks = Options.fleet2_ShortLinks.split(',');
			for (var i=0; i<shortlinks.length; i++)
				this.insertShortLink(shortlinks[i]);
		
			if (Options.fleet2_setTargetDF && Utils.getValueUni('fleet1_recyclers'))
				Utils.trigger('dbutton', 'click');

			if (Options.autocopyCoords && this.isTargetEmpty())
				this.SetCoords();
		},
		
		setMission: function ()
		{
			// if mission is set then do nothing
			if (Utils.XPath('//*[@id="missions"]/descendant::*[contains(@id,"missionButton") and contains(@class,"selected")]').snapshotLength > 0)
				return;

			// look for the first 'on' mission
			var missions = new Array(
				Options.mission1, Options.mission2, Options.mission3, Options.mission4, Options.mission5,
				1,3,4,5,6,9
				);

			for (var i=0; i<missions.length; i++) {
				if (missions[i]>0 && document.getElementById('button' + missions[i]).className == 'on' )
				{
					Utils.trigger('missionButton' + missions[i], 'click');
					break;
				}
			}
		},
		
		checkACStime: function()
		{
			var now = new Date();
			var durationAKS = ( this.dateACS.getTime() - (now.getTime() - DateTime.TimeDelta) ) / 1000;
			var duration = Utils.unsafeWindow.duration;
			var className = "";
			
			if ( duration/durationAKS >= 1.3 ) 
			{
				clearInterval(this.intervalACS);
				className = 'overmark';
			}
			else if ( duration >= durationAKS && this.stateACS == 0 ) {
				this.stateACS = 1;
				className = 'middlemark';
			}
			
			if (className) document.getElementById('timeACS').className = className;
		},
		
		showACStime: function()
		{
			if (!Utils.script) return;
			
			var str = Utils.script.innerHTML.match(/durationAKS\s*=\s*(\d+)\s*\;/i);
			if (!str || !Utils.XPathSingle('//*[@id="button2" and @class="on"]') ) return;
			
			var tick = parseInt(str[1], 10);
			if (!tick) return;
			this.dateACS = DateTime.getFinishTime(tick);
			
			this.stateACS = 0;
			this.intervalACS = setInterval(function(){FleetSend.checkACStime() }, 1000);
			
			var li = document.createElement('li');
			li.style.color = 'yellow';
			li.innerHTML = Options.Interface.lbl_ArrivalACS+': <span class="value" id="timeACS">'+DateTime.formatDate2(this.dateACS)+'</span>';
			Utils.insertAfter(li, document.getElementById('aks') );
			
			// fixing layout
			var h = Utils.XPathSingle('//*[@id="roundup"]/descendant::UL').offsetHeight;
			if (h > 125) {
				h -= 125;
				var div = Utils.XPathSingle('//*[@id="sendfleet"]/DIV');
				if (div) div.style.paddingTop = '' + (parseInt(div.style.paddingTop) + h) + 'px';
			}
			
		},
		
		Fleet3_Run: function()
		{
			this.setMission();
			//this.showACStime();
		}
	}
	
	
	// =======================================================================
	// functions for Galaxy view
	// =======================================================================
	var Galaxy =
	{
		highlightAllyPlayer: function(row)
		{
			
			Colorer.highlight(Colorer.PLAYER, 'descendant::*[contains(@class,"status_abbr")]', row);
			
			if (Options.galaxy_killTips)
				Colorer.highlight(Colorer.ALLY, 'descendant::SPAN[contains(@rel,"alliance")]/A', row);
			else 
				Colorer.highlight(Colorer.ALLY, 'descendant::SPAN[contains(@rel,"alliance")]', row);
		},
				
		showCurrent: function(row)
		{
			try {
				var url = window.location.href;
				coords = url.match(/galaxy=(\d{1,2})&system=(\d{1,3})&position=(\d{1,2})/i);
				if (!coords) coords = url.match(/galaxy=(\d{1,2})&system=(\d{1,3})&planet=(\d{1,2})/i);
				
				if (!coords) return;

				var galaxy = document.getElementById('galaxy_input').value;
				var system = document.getElementById('system_input').value;
				var position = Utils.getElementByClassName('position', row).innerHTML;

				if (coords[1]!=galaxy || coords[2]!=system || coords[3]!=position)
					return;

				row.style.borderStyle = 'dashed';
				row.style.borderColor = 'yellow';
				row.style.borderWidth = '1px';
				document.getElementById('galaxytable').style.borderCollapse='collapse';
			}
			catch (e) { Utils.log(e) }
		},
		
		showDebris: function (row)
		{
			try {
				var debris = Utils.getElementByClassName('debris', row);

				var link = Utils.getElementByClassName('TTgalaxy', debris);
				if(!link) return;

				var img = link.getElementsByTagName('img')[0];

				// getting resources of this DF
				var content = Utils.getElementsByClassName('debris-content',debris);
				var resources = new Array();
				var sum = 0;

				for ( var i=0; i<content.snapshotLength; i++) {
					var res = ''+content.snapshotItem(i).innerHTML.split(' ')[1];

					resources[i] = res;
					res = res.replace(/\./g, '');

					sum += parseInt(res, 10);
				}

				// creating a new DIV element
				newNode = document.createElement('div');
				newNode.className = 'anti_debris';

				var style = 'color:#CCCCCC; padding: 1px; text-align:center;';
				if (sum>Options.galaxyDebrisMin && Options.galaxyDebrisMin>0) style += 'background-color:'+Options.galaxyDebrisColor+';';

				newNode.setAttribute('style', style);
				newNode.innerHTML = ''+resources[0]+'<br/>'+resources[1];
				
				link.replaceChild(newNode, img);
			} catch (e) { Utils.log(e) }
		},

		showMoon: function (row)
		{
			try {
				var size = Utils.XPathSingle('TD[@class="moon"]/DIV/DIV/DIV/UL/LI[3]/SPAN', row);
				if (!size) return;
				
				size = Options.Interface.lbl_Moon + ': ' + Utils.parseInt(size.innerHTML);
				var img = Utils.XPathSingle('TD[@class="moon"]/A/IMG',row);
				img.parentNode.style.color = '#CCCCCC';
				img.alt = size;
				
				if (!Names.showImgAlt(img) && Options.galaxyHideMoon)
					img.src = '';

			} catch (e) { Utils.log(e) }
		},

		showRank: function (row) 
		{
			try {
				var player = Utils.getElementByClassName('playername', row);
				var rank = Utils.getElementByClassName('rank', player);

				if (!rank) return;
				rank = Utils.parseInt(rank.innerHTML);

				if (rank)
				{
					var newNode;
					
					if (Options.galaxy_killTips) {
						newNode = document.createElement('a');
						newNode.href = 'index.php?page=statistics&session='+Utils.unsafeWindow.session+'&start='+rank;
					}
					else
						newNode = document.createElement('span');
						
					newNode.setAttribute('class','anti_rank');
					newNode.innerHTML = ' #'+rank;
					
					var color=Options.galaxyRankColor;
					
					if (rank==0) color=Options.constRank0;
					else if (rank<=10) color=Options.galaxyRank10;
					else if (rank<=50) color=Options.galaxyRank50;
					else if (rank<=100) color=Options.galaxyRank100;
					else if (rank<=200) color=Options.galaxyRank200;
					else if (rank<=800) color=Options.galaxyRank800;
					
					newNode.style.color = color;
					
					player.appendChild(newNode);
				}
			} catch (e) { Utils.log(e) }
		},

		showAllyRank: function (row) 
		{
			var ally = Utils.getElementByClassName('allytag', row);
			if(!ally) return;
			
			var rank = Utils.getElementByClassName('rank', ally);
			var members = Utils.getElementByClassName('members', ally);

			if (!rank) return;

			// Killing tooltip body and inserting links to ally info and stats
			if (Options.galaxy_killTips) {
				var tooltip = Utils.XPathSingle('descendant::DIV[contains(@id,"alliance")]', ally);
				var allyname = tooltip.parentNode;
				var siteurl = Utils.XPathSingle('descendant::A[@target="_ally" or contains(@href,"network")]', ally);
				if (siteurl) {
					siteurl = siteurl.href;
					allyname.removeChild(tooltip);
					allyname.innerHTML = '<a href="' + siteurl + '">' + allyname.innerHTML + '</a>';
				}
			}


			// Displaying rank
			rank = Utils.parseInt(rank.innerHTML);
			members = Utils.parseInt(members.innerHTML);
			
			var str = '';
			if (rank && !isNaN(rank)) str += '#'+rank;
			if (members && !isNaN(members)) str += '/'+members;

			if (str)
			{
				var newNode;
					
					if (Options.galaxy_killTips) {
						newNode = document.createElement('a');
						newNode.href = 'index.php?page=statistics&session='+Utils.unsafeWindow.session+'&who=ally&start='+rank;
					}
					else
						newNode = document.createElement('span');

				newNode.className = 'anti_allyrank';
				newNode.innerHTML = ' '+str;

				color=Options.galaxyRankColor;
				newNode.style.color = color;

				ally.appendChild(newNode);
			}
			
		},
		
		killTips: function()
		{
			Utils.unsafeWindow.AjaxCluetip = function() {
				var selector = "";
				if (Options.galaxy_keepTipsPlanets) selector = '.microplanet, .moon .TTgalaxy';
				if (Options.galaxy_keepTipsDebris) selector += (selector?',':'') + '.debris .TTgalaxy';
				if (selector)
					Utils.unsafeWindow.$(selector).cluetip("destroy").cluetip({local:true,cluetipClass:"galaxy",width:250,showTitle:false,closeDelay:250,mouseOutClose:true,hoverIntent:false})

			}
		},
		
		onDOMNodeInserted: function(e)
		{
			if(!e || !e.target || !e.target.id) return;
			if( e.target.id == "galaxytable")  Galaxy.redrawGalaxy();
		},

		insertCSSRules: function()
		{
			if (Options.galaxy_killTips) {
				Utils.insertCSSRule('.allytag a {text-decoration:none; color:#CFCBC2;}');
			}
		},

		redrawGalaxy: function ()
		{
			try {
				document.body.removeEventListener("DOMNodeInserted", Galaxy.onDOMNodeInserted, false);
			
				var rows = Utils.XPath('//*[@id="galaxyContent"]/descendant::*[@class="row"]');
				for ( var i=0; i<rows.snapshotLength; i++ ) {
					var row = rows.snapshotItem(i);
					
					if (Options.galaxyShowRank) {
						this.showRank(row);
						this.showAllyRank(row);
					}
					this.showDebris(row);
					this.showCurrent(row);
					this.showMoon(row);
					
					this.highlightAllyPlayer(row);

				}
				
				document.body.addEventListener("DOMNodeInserted", Galaxy.onDOMNodeInserted, false);	
			}
			catch(e) { Utils.log(e); }
		},
		
		Run: function()
		{
			this.insertCSSRules();
			
			if (Options.galaxy_killTips)
				this.killTips();
			
			document.body.addEventListener("DOMNodeInserted", Galaxy.onDOMNodeInserted, false);
			
		}
	}



	var Names = 
	{
		// workaround for weird Firefox behaviour with images containing NO alt attribute
		showImgAlt: function(img)
		{
			if (Utils.isFirefox && img.clientWidth == 0) {
				img.style.display = 'none';
				setTimeout(function(){img.style.display = 'inline'}, 150);
				return true;
			}
			return false;
		},
	
		insertCSSRules: function()
		{
			Utils.insertCSSRule('.itemname { \
				position: absolute; \
				top: 8px; \
				right: 3px; \
				max-width: 76px; \
				height: auto !important; \
				background: transparent url("'+Utils.bg+'") repeat !important;\
				text-align: right; \
				font-size: 10px; \
				overflow: hidden; \
			}');
			
			if (Utils.page == 'techtree'){
				Utils.insertCSSRule('.redBorder .itemname { color: '+Options.nameColorOff+'; }');
				Utils.insertCSSRule('.greenBorder .itemname { color: '+Options.nameColorOn+'; }');
			}
			
			else {
				Utils.insertCSSRule('.off .itemname { color: '+Options.nameColorOff+'; }');
				Utils.insertCSSRule('.on .itemname { color: '+Options.nameColorOn+'; }');
				Utils.insertCSSRule('.disabled .itemname { color: '+Options.nameColorDisabled+'; }');
			}
		},
		
		showBuildingResNames: function()
		{
			try {
				var images = Utils.XPath('//*[@id="costs"]/descendant::*[contains(@class,"metal")][@title]/IMG');
				if (!images) return;
				
				for (var i=0; i<images.snapshotLength; i++) {
					var img = images.snapshotItem(i);
					if (img.getAttribute('alt'))
						continue;
					
					var title = img.parentNode.title;
					title = title.match(/\s([^\s]+)$/);
					
					img.setAttribute('alt',title[1]);
					this.showImgAlt(img);
				}
			} catch (e) { Utils.log(e) }
		},
		
		showResNames: function()
		{
			try {
				var images = Utils.XPath('//*[@id="resources"]/*[contains(@id,"_box")]');
				if (!images) return;
				
				for (var i=0; i<images.snapshotLength; i++) {
					var img = Utils.XPathSingle('descendant::IMG', images.snapshotItem(i));
					if (!img || img.getAttribute('alt'))
						continue;
					
					var id = images.snapshotItem(i).id;
					id = id.substr(0, id.indexOf('_'));
					if (!id) continue;
					
					
					img.setAttribute('alt',  Options.Labels['lbl_'+id]);
					this.showImgAlt(img);
				}
			} catch (e) { Utils.log(e) }
		},
		
		showBuildingNames: function()
		{
			try {
				this.insertCSSRules();
				
				var xpath;
				
				if ( Utils.isCurrentPage('fleet1') ) xpath = '//*[@class="buildingimg"]/A';
				else if ( Utils.isCurrentPage('techtree') ) xpath = '//A/DIV[contains(@class,"Border")]';
				else xpath = '//A[@ref]';
				
				xpath += '[@title]';
				var nodes = Utils.XPath(xpath);
				var div, title, node;
				var rx='\\|([^<\\(]+)';
				if ( Utils.isCurrentPage('techtree') )
					rx='([^<\\(|]+)';
				
				rx = new RegExp(rx,'');
				
				for (var i=0; i<nodes.snapshotLength; i++) {
					node = nodes.snapshotItem(i);
					title = node.title.match(rx);
					if (!title) continue;
					
					div = document.createElement('div');
					div.className = 'itemname';
					
					if (Utils.page=='resources') { 
						var ref = node.getAttribute('ref');
						if (ref == '1' || ref == '2' || ref == '3' || ref == '4' || ref == '12' || ref == '212')
							div.style.maxWidth = '96px';
					}
						
					div.innerHTML = title[1];
					node.appendChild(div);
					
				}
				
			} catch (e) { Utils.log(e) }
		},
		
		Show: function()
		{
			if (Utils.isCurrentPage('fleet1,resources,station,research,shipyard,defense,techtree') )
				this.showBuildingNames();
				
			this.showResNames();
		}
		
	}

	
	// =======================================================================
	// functions for Plunder calculation
	// =======================================================================

	var Plunder = 
	{
		readValue: function(cell)
		{
			return parseInt(cell.innerHTML.replace(/\D/g, ''), 10);
		},

		insertTable: function(container, mytable)
		{
			var table = document.createElement('table');
			table.className = 'fleetdefbuildings spy plunder';
			mytable.title_class = 'area plunder';	
			mytable.key_class = 'plkey plunder';
			mytable.value_class = 'plvalue plunder';
			table.innerHTML = mytable.createTableString(2);

			container.appendChild(table);
		},
		
		calculatePlunder: function(report)
		{
			this.plunder_metal = this.plunder_crystal = this.plunder_deuterium = 0;
			
			var cells = Utils.XPath('descendant::*[contains(@class,"fragment")]/descendant::TD', report);

			this.plunder_metal = Plunder.readValue(cells.snapshotItem(1)) / 2;
			this.plunder_crystal = Plunder.readValue(cells.snapshotItem(3)) / 2;
			this.plunder_deuterium = Plunder.readValue(cells.snapshotItem(5)) / 2;
		},
		
		calculateDebris: function(report)
		{
			this.debris_metal = this.debris_crystal = 0;
			
			var fleet = Utils.getElementByClassName('fleetdefbuildings spy !plunder', report);
			if (!fleet) return;

			var cells = Utils.getElementsByClassName('key', fleet);

			var first = 0, metal = 0, crystal = 0;
			for (var i=0; i<cells.snapshotLength; i++) 
			{
				var cell = cells.snapshotItem(i);
				var txt = cell.innerHTML;
				var cntNode  = cell.nextSibling;

				for (var j in Ogame.ships)
				{ 	
					var ship = Ogame.ships[j];
					var label = Options.Labels['lbl_ship'+ship.name];

					if (label && txt.indexOf(label) > -1)
					{
						var cnt = Plunder.readValue(cntNode);
						metal += cnt * ship.metal;
						crystal += cnt * ship.crystal;
						first = j;
						break;
					}
				}
			}
			
			this.debris_metal = metal * 0.3;
			this.debris_crystal = crystal * 0.3;

		},

		showPlunder: function (report)
		{
			var total = (this.plunder_metal + this.plunder_crystal + this.plunder_deuterium) * 2;

			var capacity_needed =
				Math.max(	this.plunder_metal + this.plunder_crystal + this.plunder_deuterium,
							Math.min(	(2 * this.plunder_metal + this.plunder_crystal + this.plunder_deuterium) * 3 / 4,
										(2 * this.plunder_metal + this.plunder_deuterium)
									)
						);

			var small_cargos = Math.ceil(capacity_needed/5000);
			var large_cargos = Math.ceil(capacity_needed/25000);

			SimpleTable.init(Options.Interface.lbl_resources);
			SimpleTable.addCell(Options.Interface.lbl_total, total);
			SimpleTable.addCell(Options.Interface.lbl_loot, Math.floor(total/2));
			SimpleTable.addCell(Options.Interface.lbl_shipLCargoAlt, large_cargos);
			SimpleTable.addCell(Options.Interface.lbl_shipSCargoAlt, small_cargos);
			
			Plunder.insertTable(report, SimpleTable);
		},

		showDebris: function (report)
		{
			var total = this.debris_metal + this.debris_crystal;
			
			SimpleTable.init(Options.Interface.lbl_debris);
			SimpleTable.addCell(Options.Interface.lbl_metal, this.debris_metal);
			SimpleTable.addCell(Options.Interface.lbl_crystal, this.debris_crystal);
			SimpleTable.addCell(Options.Interface.lbl_total, total);
			SimpleTable.addCell(Options.Interface.lbl_shipRecyclerAlt, Math.ceil(total/20000));
			
			Plunder.insertTable(report, SimpleTable);
		},

		Show: function()
		{
			var container;
			if ( Utils.isCurrentPage('showmessage') ) {
				container = document.getElementById("messagebox");
			} else {
				container = document.getElementById("messageContent");
			}

			var rows = Utils.getElementsByClassName('material spy', container);

			for (var i=0; i<rows.snapshotLength; i++) {
				var report = rows.snapshotItem(i).parentNode;

				Plunder.calculatePlunder(report);
				Plunder.calculateDebris(report);
				
				if (Options.msg_PlunderThreshold && Utils.isCurrentPage('messages') ) {
					var total_pl = this.plunder_metal + this.plunder_crystal + this.plunder_deuterium;
					var total_df = this.debris_metal + this.debris_crystal;
					if (total_pl < Options.msg_PlunderThreshold*1000 && total_df < Options.msg_DebrisThreshold*1000)
						document.getElementById( report.parentNode.parentNode.id.replace('spioDetails_','')+'TR' ).className += ' smallplunder';
				}
				
				if (Options.msg_showPlunder) {
					Plunder.showPlunder(report);
					Plunder.showDebris(report);
				}
			}
		}

	}


	var Messages = 
	{
		addButtons: function()
		{
			function insertButton(value, mod, title) {
			
				if (!title && mod>0) {
					var opt = Utils.XPathSingle('//SELECT/OPTION[@id="'+mod+'"]');
					if (opt) title = opt.innerHTML;
				}
			
				var btn = document.createElement('input');
				btn.type = 'button';
				btn.value = value;
				
				if (mod==12) btn.style.color = '#00CC22';
				else if (mod==-12) btn.style.color = '#229922';
				else if (mod==7) btn.style.color = '#660011';
				else if (mod==-7) btn.style.color = '#993300';
				else if (mod==9) btn.style.color = '#990000';
				
				if (title) btn.title = title;
				btn.setAttribute('mod', mod);
				span.appendChild(btn);
			}

			// Recycle bin
			if (Utils.unsafeWindow.aktCat == 3) return;
			
			var span = document.createElement('span');
			span.className = 'msgButtons';

			insertButton('V', 12);
			insertButton('VV', -12, Options.Interface.lbl_btnMarkReadAll);
			insertButton('X', 7);
			insertButton('Xx', -7, Options.Interface.lbl_btnDeleteSmallPlunder);
			insertButton('XX', 9);
			
			var form = document.getElementsByTagName('form')[0];
			form.parentNode.insertBefore(span, form);
			
			var $ = Utils.unsafeWindow.$;
			$('.msgButtons').clone(true).insertAfter('form');
			$('.msgButtons input').click(Messages.onButtonClick);
		},
		
		onButtonClick: function()
		{
			try {
				var mod = this.getAttribute('mod');
				
				if (mod>0) {
					Utils.unsafeWindow.mod = mod;
					Utils.trigger(Utils.getElementByClassName('buttonOK deleteIt'), 'click');
				}
				
				else if (mod == -12 || mod == -7) {
					var delIds = []; 
					var classname = ( mod == -12) ? 'trigger new' : 'trigger smallplunder';
					var nodes = Utils.getElementsByClassName(classname);
					
					for (var i=0; i<nodes.snapshotLength; i++)
						delIds.push( nodes.snapshotItem(i).id.toString().replace(/\D/g, '') );
					
					Utils.unsafeWindow.executeAction(delIds, -mod);
				}
			} catch (e) { Utils.log(e) }
		},
		
		changeTimes: function()
		{
			if (Utils.isCurrentPage('messages'))
			{
				DateTime.changeNodesTime(
					'//*[@id="mailz"]/TBODY/TR[contains(@class,"entry")]/*[@class="date"]',
					'[d].[m].[Y] [H]:[i]:[s]' );
					
				DateTime.changeNodesTime(
					'//*[@id="mailz"]/TBODY/TR[contains(@id,"spioDetails")]/descendant::*[@class="material spy"]/TBODY/TR/TH',
					'[m]-[d] [H]:[i]:[s]' );
			}

			else if (Utils.isCurrentPage('showmessage'))
			{
				DateTime.changeNodesTime(
					'//*[contains(@class,"infohead")]/TABLE/TBODY/TR[last()]/TD | '+
					'//*[@id="battlereport"]/P',
					'[d].[m].[Y] [H]:[i]:[s]' );

				DateTime.changeNodesTime(
					'//*[@class="material spy"]/TBODY/TR/TH',
					'[m]-[d] [H]:[i]:[s]' );
			}

		},

		Show: function(evt)
		{
			try {
				if (evt && evt.target.tagName != 'FORM')
					return;
					
				var need_plunder = false;
				if ( Utils.isCurrentPage('messages') && Options.msg_PlunderThreshold && (Options.msg_foldSmallPlunder || Options.msg_addButtons) )
					need_plunder = true;
					
				if (Options.msg_showPlunder || need_plunder) {
					Plunder.Show();
				}
				
				if (Options.showLocalTime) {
					Messages.changeTimes();
				}
				
				if ( Utils.isCurrentPage('messages') && Options.msg_PlunderThreshold && Options.msg_foldSmallPlunder)
					setTimeout( function() { Utils.$('.smallplunder .subject a').trigger('click') }, 0);

				if ( Options.msg_addButtons && Utils.isCurrentPage('messages') ) {
					Messages.addButtons();
				}
				
				if ( Utils.isCurrentPage('showmessage') ) {
					var span = Utils.XPathSingle('//DIV[@class="note"]/SPAN[@class="tips" and @title]');
					if (span) {
						var text = span.title.toString();
						text = text.replace(/<br>$/gi, '').replace(/<br>/gi, ', ').replace(/\|/gi, '');
						if (text) span.innerHTML += ' ('+text+')';
					}
				}
			}
			catch(e) {
				Utils.log(e);
			}
		},
		
		insertCSSRules: function()
		{
			Utils.insertCSSRule(".plkey { width: 30% }");
			Utils.insertCSSRule(".plvalue { width: 20% }");
			Utils.insertCSSRule(".plunder { border: 1px solid grey !important; }");
			Utils.insertCSSRule("table.plunder { border-collapse: collapse; }");
			Utils.insertCSSRule(".plkey, .plvalue { padding: 5px !important; }");
			
			if ( Utils.isCurrentPage('messages') ) {
				Utils.insertCSSRule('.msgButtons input { ' +
					'-moz-background-clip:border;' +
					'-moz-background-inline-policy:continuous;' +
					'-moz-background-origin:padding;' +
					'background:transparent url(./img/layout/formular_buttons.gif) no-repeat scroll -88px -54px;' +
					'border:0 none;' +
					'color:#0D1014;' +
					'cursor:pointer;' +
					'font-size:11px;' +
					'font-weight:700;' +
					'text-align:center;' +
					'height: 27px; ' +
					'width: 42px; ' +
					'}');
					
				Utils.insertCSSRule('.msgButtons input:hover { ' +
					'background:transparent url(./img/layout/formular_buttons.gif) no-repeat scroll -88px -80px;' +
					'}');

			}

		},

		
		Run: function()
		{
			this.insertCSSRules();
			
			if ( Utils.isCurrentPage('messages') ) {
				document.getElementById('section2').addEventListener('DOMNodeInserted', this.Show, false);
				if (Options.msg_killTips)
					Utils.unsafeWindow.initCluetipEventlist = function(){};
			}
			else
				this.Show();

		}

	}

	
	var Phalanx = {
		changeTime: function()
		{
			DateTime.changeNodesTime('//LI[@class="arrivalTime"]', '[H]:[i]:[s]');
		},
		
		Run: function()
		{
			if (Options.showLocalTime)
				this.changeTime();
		}

	}
	
	// =======================================================================
	// Various resources calculation
	// =======================================================================
	
	var Resources = 
	{
		res_array: ['metal', 'crystal', 'deuterium', 'energy'],
		res_array_firstcap: ['Metal', 'Crystal', 'Deuterium', 'Energy'],
		currentRes: {}, 
		costRes: {},
		res_container: null,
		
		addCell: function(key, value)
		{
			if (this.html) this.html += ' ';
			this.html += key+':<span class="time" style="padding-right: 0px">'+Utils.formatNumber(value)+'</span>';
		},

		showMissing: function()
		{
			try{
				// will not show missing res if the construction is already in process
				if (Utils.getElementByClassName('abort')) return;

				container = Utils.XPathSingle('//*[@id="detail"]/DIV[@class="pic"]');
				if (!container) return;
				

				SimpleTable.init(Options.Interface.lbl_deficientRes);
				
				var sum = 0, show = false;
				
				for (var i=0; i<this.res_array.length; i++) {
					var attr = this.res_array[i];
					
					if (attr != 'energy')
						this.currentRes[attr] = Utils.getIntById('resources_'+attr);
					else {
						var energy = document.getElementById('energy_box').title;
						energy = energy.match(/\([\-\d\.]+\/([\-\d\.]+)\)/);
						if (energy) 
							this.currentRes[attr] = Utils.parseInt(energy[1]);
					}
					
					this.costRes[attr] = Utils.getIntByXPath(
						'//*[@id="content"]/descendant::*[@id="resources"]/LI[contains(@title,"'+Options.Labels['lbl_'+attr]+'")]',
						'title');

					if (this.costRes[attr] == null) continue;
						
					var def = this.costRes[attr] - this.currentRes[attr];

					if (def>0) {
						SimpleTable.addCell(Options.Labels['lbl_'+attr], def, attr);
						show = true;
						
						if (attr != 'energy') sum += def;
					}
				}

				if (!show) return;
				
				var html = '<table>'+SimpleTable.createTableString()+'</table>';
				
				SimpleTable.init('');
				SimpleTable.addCell(Options.Labels.lbl_shipSCargo, Math.ceil(sum/5000));
				SimpleTable.addCell(Options.Labels.lbl_shipLCargo, Math.ceil(sum/25000));
				
				html += '<table>'+SimpleTable.createTableString()+'</table>';
				
				var node = document.createElement('div');
				node.id = 'deficient';
				
				node.innerHTML = html;
				container.appendChild(node);
			}
			catch (e) { Utils.log(e) }

		},

		showProduction: function()
		{
			try {
				var id = document.getElementsByName('type')[0];
				if (!id) return;
				id = parseInt(id.value,10);
				
				var level = Utils.XPathSingle('//*[@ref="'+id+'"]/descendant::*[@class="level"]');
				if (!level) return;
				level = Utils.parseInt(level.lastChild.nodeValue);

				var str, oldvalue, newvalue;
				var $ = Utils.$;
				
				// energy consumption
				var spareEnergy = Utils.getIntById('resources_energy');
				var energy = $('#action ul li')
					.filter( function(){return $(this).html().indexOf( Options.Labels.lbl_RequiredEnergy ) >- 1 } )
					.find('.time')
				;
				energy.after( Utils.addSpanMark( spareEnergy - Utils.parseInt( energy.html() ) ) );

				// deuterium consumption in fusion reactor
				if (id == 12) {
					oldvalue = -Ogame.getConsumption(id,level);
					newvalue = -Ogame.getConsumption(id,level+1);
					str = '<li>'+Options.Labels['lbl_deuterium']+': <span class="time">'+Utils.formatNumber(newvalue)+'</span> '
						+ Utils.addSpanMark(newvalue-oldvalue)+'</li>';
					$('#action ul').append(str);
				}

				// res/energy production
				oldvalue = Ogame.getProduction(id,level);
				newvalue = Ogame.getProduction(id,level+1);
				if (newvalue) {
					str = '<li>'+Options.Interface.lbl_Production + ': <span class="time">'+Utils.formatNumber(newvalue)+'</span> '
						+ Utils.addSpanMark(newvalue-oldvalue)+'</li>';
					
					$('#action ul').append(str);
				}
				
				// storage capacity
				oldvalue = Ogame.getStorageCapacity(id,level);
				newvalue = Ogame.getStorageCapacity(id,level+1);
				if (newvalue) {
					var label = $('#description div.display div').get(0).firstChild.nodeValue;
					str = '<li>'+label+' <span class="time">'+Utils.formatNumber(newvalue)+'</span> '
						+ Utils.addSpanMark(newvalue-oldvalue)+'</li>';
					
					$('#action ul').append(str);
					$('.techtree').css('display','none');
				}
				
				// if at least 1 line was appended - increase size of the container
				if (str) $('#action ul').css('padding-top', '0');
				
			} catch (e) { Utils.log(e) }
			
		},
		
		Missing_insertCSSRules: function()
		{
			Utils.insertCSSRule(
			'#deficient table tr td, #deficient table tr th {\
				padding: 1px;\
				font-size: 11px;\
				color: white;\
				/*font-family: "Arial";*/ \
				}');

			Utils.insertCSSRule(
			'#deficient {\
				background: transparent url("'+Utils.bg+'") repeat;\
				position: absolute;\
				bottom: 0;\
				right: 0;\
				}\
				');
		},

		Resources_insertCSSRules: function()
		{
			var width = 160;
			Utils.insertCSSRule(
			'.antires {\
				margin: 2px;\
				padding: 4px;\
				display: block;\
				width: '+width+'px;\
				float: left;\
				background-color: #111115;\
				border: 1px solid #606060;\
				text-align: center;\
				font-size: 10px;\
				list-style: none outside; \
				' +	((Options.showResources == 1) ? 'margin-left: -40px;' : '') + ' \
				}');
				
			Utils.insertCSSRule(
			'.finishtime {\
				color: green;\
				}');
				
			Utils.insertCSSRule(
			'#links {\
				overflow: visible;\
				}');
				
			if (Options.showResources == 2)	{
				Utils.insertCSSRule(
				'#links {\
					position: relative;\
					}');
					
				Utils.insertCSSRule(
				'#antires_cont {\
					position: absolute;\
					top: 0; \
					left: -171px; \
					width: '+(width+13)+'px;\
					}');
			}
			
		},
		
		Resources_createContainer: function(ul)
		{
			/*$('#links').css('position','relative');
			$('<ul></ul>').attr('id','ttt').appendTo('#links');
			$('.antires').appendTo('#ttt');
			$('#ttt').css({'position':'absolute','top':'0','left':'-135px'});
			*/
			if (Options.showResources == 1) {
				var box = document.getElementById('box');
				if (box) box.style.paddingBottom='0';
				this.res_container = document.getElementById('menuTable');
			}
			else if (Options.showResources == 2) {
				var links = document.getElementById('links');
				if (links) {
					this.res_container = document.createElement('ul');
					this.res_container.id = 'antires_cont';
					links.appendChild(this.res_container);
				}
				
			}
		},
		
		Resources_append: function(node)
		{
			if (!this.res_container)
				this.Resources_createContainer();
				
			if (this.res_container)
				this.res_container.appendChild(node);
		},
		
		Resources_Run: function()
		{
			if ( !document.getElementById('metal_box') ) return;
			this.Resources_insertCSSRules();
			
			/*var box = document.getElementById('box');
			if (box) box.style.paddingBottom='0';
			
			var menu = document.getElementById('menuTable');*/
			
			for (var i=0; i<this.res_array.length; i++)
			{
				var res = this.res_array[i];
				var ticker_name = 'resourceTicker'+this.res_array_firstcap[i];
				var ticker_id = 'antires_'+res;
				
				var node = document.createElement('li');
				node.className = 'antires';
				
				var html = document.getElementById(res+'_box').title;
				html = html.replace('|','');
				
				var rx = new RegExp('([\\d\\'+Utils.separator+']+)\\/','gi');
				
				html = html.replace(rx, '<span id="'+ticker_id+'">$1</span> / ');
				node.innerHTML = html;
				//menu.appendChild(node);
				this.Resources_append(node);

				if (res != 'energy') {
					var t = Utils.unsafeWindow[ticker_name];
					var time_to_fill = t.production ? Math.floor((t.limit[1] - t.available)/t.production) : -1;

					if (time_to_fill>0) {
						node.innerHTML += '<br/><span class="finishtime">'+DateTime.formatDate2(DateTime.getFinishTime(time_to_fill))+'</span>';
					}

					var script = '\
						var newticker = {};\
						newticker.available = oldticker.available;\
						newticker.limit = oldticker.limit;\
						newticker.production = oldticker.production;\
						newticker.valueElem = ticker_id;\
						if (!vacation) new resourceTicker(newticker);\
					';

					script = script.replace(/oldticker/g, ticker_name);
					script = script.replace(/newticker/g, ticker_name+'2');
					script = script.replace(/ticker_id/g, '"'+ticker_id+'"');
					
					Utils.runScript(script);
				}

			}
		}
	}
	
	var Buildings = 
	{
		Show: function(e)
		{
			if (e.target.id != 'content') return;
			
			if (Options.showDeficient)
				Resources.showMissing();
			
			if (Utils.isCurrentPage('resources'))
				Resources.showProduction();
				
			Names.showBuildingResNames();
		},
		
		
		Run: function()
		{
			if (Options.showDeficient)
				Resources.Missing_insertCSSRules();
			
			document.getElementById('planet').addEventListener(
				'DOMNodeInserted',
				function(e){ 
					setTimeout( function(){Buildings.Show(e) }, 0 )
				},
				false);
		}
	}
	
	var Stats = {
		highlightAllyPlayer: function(row)
		{
			function parseAlly(name) {
				var res;
				if (name) {
					res = name.match(/\[(.+)\]/i);
					if (res) res = res[1];
				}
				return res;
			}

			Colorer.highlight(Colorer.PLAYER, 'descendant::*[@class="name"]/A', row);
			Colorer.highlight(Colorer.ALLY, 'descendant::*[@class="ally-tag"]/A', row, parseAlly);
		},
		
		showStatsDifs: function(row)
		{
			stats = Utils.XPathSingle('descendant::*[@class="overmark" or @class="undermark"][@title]', row);
			if (stats) stats.innerHTML = stats.getAttribute ("title");
		},
		
		Show: function(e)
		{
			if (!e.relatedNode || !e.target 
				|| e.relatedNode.getAttribute("id") != "statisticsContent" 
				|| e.target.getAttribute("class") != "content"
				)
				return;
				
			try {
				var paging = document.getElementById('paging').cloneNode(true);
				Utils.insertAfter( paging, document.getElementById('row') );
			} catch (e) { Utils.log(e) }
				
			var rows = document.getElementById('ranks').getElementsByTagName('tr');
			for (var i=0; i<rows.length; i++) {
				this.showStatsDifs(rows[i]);
				this.highlightAllyPlayer(rows[i]);
			}
		},

		Run: function()
		{
			document.getElementById ('statisticsContent').addEventListener ("DOMNodeInserted", function (e) { Stats.Show(e); }, false);
		}
	}
	

	try	{
		// REMINDER: these objects should be initialized strictly in the following order:
		// Utils, Options, DateTime
		
		Utils.Init();

		// checking whether we have redesign at this server
		if (!Utils.checkRedesign()) return;
		
		Options.Init();
		DateTime.Init();
		Ogame.Init();
		
		if (Options.autocopyCoords)
			Coords.Init();

		if (Options.blockAutoComplete && !Utils.isCurrentPage('movement')) {
			Utils.blockAutocomplete();
		}
		
		if (Utils.isCurrentPage('research') /*&& Utils.isFirefox*/)
			Ogame.readTechs();
			
		if ( Utils.isCurrentPage('statistics,galaxy') )
			Colorer.Init();
			
		if ( Options.showNames )
			Names.Show();
			
		if ( Utils.isCurrentPage('fleet1,resources,station,research,shipyard,defense,techtree') && Options.showNames )
			Names.Show();

		if ( Utils.isCurrentPage('fleet1') ) {
			FleetSend.Fleet1_Run();
		}
		else if ( Utils.isCurrentPage('fleet2') ) {
			FleetSend.Fleet2_Run();
		}
		else if ( Utils.isCurrentPage('fleet3') ) {
			FleetSend.Fleet3_Run();
		}
		else if ( Utils.isCurrentPage('galaxy') ) {
			Galaxy.Run();
		}
		else if ( Utils.isCurrentPage('movement') ) {
			FleetMovement.Run();
		}
		else if ( Utils.isCurrentPage('eventList') ) {
			EventList.Run();
		}
		else if ( Utils.isCurrentPage('phalanx') ) {
			Phalanx.Run();
		}
		else if ( Utils.isCurrentPage('showmessage,messages') ) {
			if ( Options.msg_fixColors && Utils.isCurrentPage('messages') )
			{
				Utils.insertCSSRule('.combatreport_ididattack_iwon { color: #00B000; }');
				Utils.insertCSSRule('.combatreport_ididattack_ilost { color: #D02222; }');
				Utils.insertCSSRule('.combatreport_ididattack_draw { color: #C0C000; }');
			}

			Messages.Run();
		}
		else if ( Utils.isCurrentPage('statistics') ) {
			Stats.Run();
		}
		else if ( Utils.isCurrentPage('overview,resources,shipyard,station,defense') ) {
			if (Options.showFinishTime) FinishTime.ShowConstructions();
		}

		if ( Utils.isCurrentPage('overview') && Options.showEventList )	
			EventList.showEventList();
		
		if ( Utils.isCurrentPage('resources,station,research,shipyard,defense') )
			Buildings.Run();
			
		if ( Options.showResources )
			Resources.Resources_Run();
			
	}
	catch (e) { 
		Utils.log(e);
	}


}) ()