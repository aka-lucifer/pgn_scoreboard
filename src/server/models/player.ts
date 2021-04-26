export class Player {
    public handle: string;
    public name: string;
    public ping: number;

    constructor(playerHandle: string) {
        this.handle = playerHandle;
        this.name = GetPlayerName(this.handle);
        this.ping = GetPlayerPing(this.handle);
    }

    // Get Requests
    public get GetHandle(): string {
        return this.handle
    }

    // Methods
    public RefreshPing(): void {
        this.ping = GetPlayerPing(this.handle);
    }
}