const Scoreboard = new Vue({
    el: "#scoreboard_container",
    data: {
        // Booleans
        displaying: false,

        // Numbers
        maxPlayers: 100,
        selectedPage: 1,
        maxPerPage: 10,
        pageCount: 1,
        animating: false,

        // Arrays
        connectedPlayers: []
    },

    methods: {
        DisplayScoreboard(data) {
            this.connectedPlayers = data.players || [];
            this.pageCount = this.connectedPlayers.length / this.maxPerPage;
            if (this.pageCount > Math.floor(this.pageCount)) {
                this.pageCount = Math.floor(this.pageCount + 1);
            }
            this.maxPlayers = data.maxPlayers || 32;
            this.displaying = true;
        },

        CloseScoreboard() {
            this.displaying = false;
            this.connectedPlayers = [];
            this.pageCount = 1;
            this.maxPlayers = 0;
        },

        ChangePage(data) {
            if (this.animating || this.pageCount == 1) { return; }
            const element = document.getElementById("scoreboard_animation");
            element.className = "fadeIn";
            this.animating = true;
            setTimeout(() => {
                this.selectedPage = this.selectedPage + data.value;
                if (this.selectedPage > this.pageCount) {
                    this.selectedPage = 1;
                } else if (this.selectedPage < 1) {
                    this.selectedPage = this.pageCount;
                }
                element.className = "fadeOut";
                this.animating = false;
            }, 500);
        }
    },

    mounted() {
        RegisterEvent("open_scoreboard", this.DisplayScoreboard);
        RegisterEvent("close_scoreboard", this.CloseScoreboard);
        RegisterEvent("change_page", this.ChangePage);
    }
})

function RandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}