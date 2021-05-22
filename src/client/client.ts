import { Events } from "../shared/enums/events";
import { DrawText3D } from "./utils";

export class Client {

    private tickHandle: number = -1;

    constructor() {
        // Events
        onNet(Events.sendPlayers, this.EVENT_SendPlayers);

        // Opens and Closes scoreboard
        RegisterKeyMapping("+open_scoreboard", "Opens the scoreboard", "keyboard", "L");
        RegisterCommand("+open_scoreboard", this.OpenScoreboard.bind(this), false);
        RegisterCommand("-open_scoreboard", this.CloseScoreboard.bind(this), false);

        // Scoreboard Page Up
        RegisterKeyMapping("+scoreboard_pageup", "Changes to next page of the scoreboard", "keyboard", "PAGEUP");
        RegisterCommand("+scoreboard_pageup", this.ScoreboardNextPage.bind(this), false);
        RegisterCommand("-scoreboard_pageup", undefined, false);

        // Scoreboard Page Down
        RegisterKeyMapping("+scoreboard_pagedown", "Changes to previous page of the scoreboard", "keyboard", "PAGEDOWN");
        RegisterCommand("+scoreboard_pagedown", this.ScoreboardPrevPage.bind(this), false);
        RegisterCommand("-scoreboard_pagedown", undefined, false);
    }

    // Events
    private OpenScoreboard(): void {
        if (this.tickHandle != -1) { clearTick(this.tickHandle); }
        emitNet(Events.requestPlayers);
        this.tickHandle = setTick(this.TICK_DisplayId);
    }

    private CloseScoreboard(): void {
        SendNuiMessage(JSON.stringify({
            type: "close_scoreboard"
        }));
        clearTick(this.tickHandle);
    }

    private ScoreboardNextPage(): void {
        SendNuiMessage(JSON.stringify({
            type: "change_page",
            data: {
                value: 1
            }
        }))
    }

    private ScoreboardPrevPage(): void {
        SendNuiMessage(JSON.stringify({
            type: "change_page",
            data: {
                value: -1
            }
        }))
    }

    // Functions
    private EVENT_SendPlayers(maxPlayers: number, recievedPlayers: any[]) {
        SendNuiMessage(JSON.stringify({
            type: "open_scoreboard",
            data: {
                maxPlayers,
                players: recievedPlayers
            }
        }))
    }

    private TICK_DisplayId(): void {
        const lPlayerPed = GetPlayerPed(-1);
        const lPedPos = GetEntityCoords(lPlayerPed, true);
        const players = GetActivePlayers() as Array<number>;
        for (let a = 0; a < players.length; a++) {
            const player = players[a];
            const ped = GetPlayerPed(player);
            const bone = GetPedBoneIndex(ped, GetHashKey("SKEL_Head"));
            const pos = GetPedBoneCoords(ped, bone, 0.0, 0.0, 1.2);
            const dist = GetDistanceBetweenCoords(lPedPos[0], lPedPos[1], lPedPos[2], pos[0], pos[1], pos[2], true);
            if (dist <= 25.0) {
                DrawText3D({
                    x: pos[0],
                    y: pos[1],
                    z: pos[2]
                }, 0.08, GetPlayerServerId(player).toString(), {
                    r: 67,
                    g: 160,
                    b: 71,
                    a: 255
                })
            }
        }
    }
}

new Client();