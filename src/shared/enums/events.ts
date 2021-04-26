export enum Events {
    // CitizenFX Events
    gameEventTriggered = "gameEventTriggered",
    entityCreated = "entityCreated",
    entityCreating = "entityCreating",
    entityRemoved = "entityRemoved",
    resourceListRefreshed = "onResourceListRefresh",
    resourceStart = "onResourceStart",
    resourceStarting = "onResourceStarting",
    resourceStop = "onResourceStop",
    serverResourceStart = "onServerResourceStart",
    serverResourceStop = "onServerResourceStop",
    playerConnecting = "playerConnecting",
    playerEnteredScope = "playerEnteredScope",
    playerLeftScope = "playerLeftScope",
    playerJoining = "playerJoining",
    playerDropped = "playerDropped",
  
    // Scoreboard Server Events
    playerLoaded = "pgn-scoreboard-server:playerLoaded",
    requestPlayers = "pgn-scoreboard-server:requestPlayers",

    // Scoreboard Client Events
    sendPlayers = "pgn-scoreboard-client:sendPlayers"
 }