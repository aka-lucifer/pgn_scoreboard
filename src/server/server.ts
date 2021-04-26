import { Player } from "./models/player";
import { PlayerManager } from "./managers/players";
import { Events } from "../shared/enums/events";

export class Server {
    constructor() {
        onNet(Events.playerLoaded, () => {
            const src = global.source;
            playerManager.Add(new Player(src));
        })

        onNet(Events.requestPlayers, () => {
            playerManager.GetPlayers.forEach(async function(value) {
                const foundPlayer = await playerManager.GetPlayer(value.handle);
                if (foundPlayer) {
                    foundPlayer.RefreshPing();
                }
            })

            emitNet(Events.sendPlayers, source, GetConvarInt("sv_maxclients", 32), playerManager.GetPlayers);
        })
    }
}

const server = new Server();
const playerManager = new PlayerManager(server);