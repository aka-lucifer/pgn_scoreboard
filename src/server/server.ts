import { Player } from "./models/player";
import { PlayerManager } from "./managers/players";
import { Events } from "../shared/enums/events";

export class Server {

    constructor() {
        // Events
        onNet(Events.requestPlayers, this.EVENT_RequestPlayers);
        on(Events.playerJoining, this.EVENT_PlayerLoaded);
        on(Events.playerDropped, this.EVENT_PlayerDropped);
    }

    // Events
    private EVENT_PlayerLoaded(): void {
        playerManager.Add(new Player(source));
    }

    private EVENT_RequestPlayers(): void {
        for (let a = 0; a < playerManager.GetPlayers.length; a++) {
            playerManager.GetPlayers[a].RefreshPing();
        }
        emitNet(Events.sendPlayers, source, GetConvarInt("sv_maxclients", 32), playerManager.GetPlayers);
    }

    private EVENT_PlayerDropped(): void {
        playerManager.Remove(source);
    }
}

const server = new Server();
const playerManager = new PlayerManager(server);