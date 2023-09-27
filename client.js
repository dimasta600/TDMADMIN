// TDM от dimasta600

/* MIT License Copyright (c) 2023 dimasta600 (vk, tg, discord: dimasta600. old)
    
Данная лицензия разрешает лицам, получившим копию данного программного обеспечения и сопутствующей документации (далее — Программное обеспечение), безвозмездно использовать Программное обеспечение без ограничений, включая неограниченное право на использование, копирование, изменение, слияние, публикацию, распространение, сублицензирование и/или продажу копий Программного обеспечения, а также лицам, которым предоставляется данное Программное обеспечение, при соблюдении следующих условий:
Указанное выше уведомление об авторском праве и данные условия должны быть включены во все копии или значимые части данного Программного обеспечения.
ДАННОЕ ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ ПРЕДОСТАВЛЯЕТСЯ «КАК ЕСТЬ», БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ, ЯВНО ВЫРАЖЕННЫХ ИЛИ ПОДРАЗУМЕВАЕМЫХ, ВКЛЮЧАЯ ГАРАНТИИ ТОВАРНОЙ ПРИГОДНОСТИ, СООТВЕТСТВИЯ ПО ЕГО КОНКРЕТНОМУ НАЗНАЧЕНИЮ И ОТСУТСТВИЯ НАРУШЕНИЙ, НО НЕ ОГРАНИЧИВАЯСЬ ИМИ. НИ В КАКОМ СЛУЧАЕ АВТОРЫ ИЛИ ПРАВООБЛАДАТЕЛИ НЕ НЕСУТ ОТВЕТСТВЕННОСТИ ПО КАКИМ-ЛИБО ИСКАМ, ЗА УЩЕРБ ИЛИ ПО ИНЫМ ТРЕБОВАНИЯМ, В ТОМ ЧИСЛЕ, ПРИ ДЕЙСТВИИ КОНТРАКТА, ДЕЛИКТЕ ИЛИ ИНОЙ СИТУАЦИИ, ВОЗНИКШИМ ИЗ-ЗА ИСПОЛЬЗОВАНИЯ ПРОГРАММНОГО ОБЕСПЕЧЕНИЯ ИЛИ ИНЫХ ДЕЙСТВИЙ С ПРОГРАММНЫМ ОБЕСПЕЧЕНИЕМ. 
Если вам лень читать: используешь мой код - скопируй этот текст и вставь его к себе в начало режима*/





// ���������
var WaitingPlayersTime = 10;
var BuildBaseTime = 60;
var GameModeTime = 1200;
var EndOfMatchTime = 10;
var InfTimer = 1; //время бесконечного таймера
var myJust = 0;
var myBluePlayers = 0; //количество людей
var myGameState = 0; //состояние игры
var myAllPlayers = 0; //количество всех игроков
var myGameStarted = 0; //старт игры
var myBlockGameLoad = 0;
var WeaponAreasTag = "wp";
var myRedPlayers = 0;
var myRedTeamBlock = 0;
var myBluePlayersAlive = 0;
// ��������� ����
var WaitingStateValue = "Waiting";
var BuildModeStateValue = "BuildMode";
var GameStateValue = "Game";
var EndOfMatchStateValue = "EndOfMatch";
var myCount = Players.Count;
var myInventoryBlock = 0;

// ���������� ����������
var mainTimer = Timers.GetContext().Get("Main");
var myInfTimer = Timers.GetContext().Get("tim1");
var myWpTimer = Timers.GetContext().Get("tim2");

var myTimer3 = Timers.GetContext().Get("tim3");



var stateProp = Properties.GetContext().Get("State");
var weaponAreas = AreaService.GetByTag(WeaponAreasTag);

// ��������� ��������� �������� �������
Damage.FriendlyFire = GameMode.Parameters.GetBool("FriendlyFire");
Map.Rotation = GameMode.Parameters.GetBool("MapRotation");
BreackGraph.OnlyPlayerBlocksDmg = GameMode.Parameters.GetBool("PartialDesruction");
BreackGraph.WeakBlocks = GameMode.Parameters.GetBool("LoosenBlocks");

// ���� ������ ������ ������
BreackGraph.PlayerBlockBoost = true;

// ��������� ����
Properties.GetContext().GameModeName.Value = "GameModes/Team Dead Match";
TeamsBalancer.IsAutoBalance = false;
Ui.GetContext().MainTimerId.Value = mainTimer.Id;
// ������� �������
Teams.Add("Blue", "<b>ВЫЖИВШИЕ</b>", { b: 100 });
Teams.Add("Red", "<b>ЗОМБИ</b>", { g : 1 });
var blueTeam = Teams.Get("Blue");
var redTeam = Teams.Get("Red");
blueTeam.Spawns.SpawnPointsGroups.Add(1);
redTeam.Spawns.SpawnPointsGroups.Add(2);
blueTeam.Build.BlocksSet.Value = BuildBlocksSet.Blue;
redTeam.Build.BlocksSet.Value = BuildBlocksSet.Red;

// ������ ���� ������� ������

// ������ ��� �������� � �����������
LeaderBoard.PlayerLeaderBoardValues = [
 {
  Value: "Kills",
  DisplayName: "Statistics/Kills",
  ShortDisplayName: "Statistics/KillsShort"
 },
 {
  Value: "Deaths",
  DisplayName: "Statistics/Deaths",
  ShortDisplayName: "Statistics/DeathsShort"
 },
 {
  Value: "Spawns",
  DisplayName: "Statistics/Spawns",
  ShortDisplayName: "Statistics/SpawnsShort"
 },
 {
  Value: "Scores",
  DisplayName: "Statistics/Scores",
  ShortDisplayName: "Statistics/ScoresShort"
 }
];
LeaderBoard.TeamLeaderBoardValue = {
 Value: "Deaths",
 DisplayName: "Statistics\Deaths",
 ShortDisplayName: "Statistics\Deaths"
};