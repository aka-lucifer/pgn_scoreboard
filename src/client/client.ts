import { Events } from "../shared/enums/events";

export class Client {
    constructor() {
        // Events
        on(Events.resourceStart, (resourceName) => { // Handles getting players, if the server is restarted
            if (GetCurrentResourceName() == resourceName) {
                emitNet(Events.playerLoaded);
            }
        });

        onNet(Events.sendPlayers, (maxPlayers, recievedPlayers: any[]) => {
            SendNuiMessage(JSON.stringify({
                type: "open_scoreboard",
                data: {
                    maxPlayers,
                    players: recievedPlayers
                }
            }));
        })

        // Opens and Closes scoreboard
        RegisterKeyMapping("+open_scoreboard", "Opens the scoreboard", "keyboard", "L");
        RegisterCommand("+open_scoreboard", () => { emitNet(Events.requestPlayers); }, false);
        RegisterCommand("-open_scoreboard", () => { SendNuiMessage(JSON.stringify({ type: "close_scoreboard" })); }, false);

        // Scoreboard Page Up
        RegisterKeyMapping("+scoreboard_pageup", "Changes to next page of the scoreboard", "keyboard", "PAGEUP");
        RegisterCommand("+scoreboard_pageup", () => { SendNuiMessage(JSON.stringify({ type: "change_page", data: { value: 1 } })) }, false);
        RegisterCommand("-scoreboard_pageup", undefined, false);

        // Scoreboard Page Down
        RegisterKeyMapping("+scoreboard_pagedown", "Changes to previous page of the scoreboard", "keyboard", "PAGEDOWN");
        RegisterCommand("+scoreboard_pagedown", () => { SendNuiMessage(JSON.stringify({ type: "change_page", data: { value: -1 } })) }, false);
        RegisterCommand("-scoreboard_pagedown", undefined, false);
    }
}

new Client();