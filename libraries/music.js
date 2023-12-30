class Playlist {
    constructor(pathArray, play = true) {
        this.pathArray = pathArray;
        this.play = play;
        this.index = 0;
        var self = this;

        this.audioArray = [];

        for (var path of pathArray) {
            var newAudio = new Audio('music/' + path);
            newAudio.addEventListener('ended', function () {
                this.currentTime = 0;

                if (self.play) {
                    var index = self.index + 1;
                    index = index % self.pathArray.length;
                    self.playMusic(index);
                }
            }, false);
            this.audioArray.push(newAudio);
        }
    }

    playMusic(index) {
        this.index = index;
        this.audioArray[index].play();
    }

    stop() {
        this.play = false;
        for (var music of this.audioArray) {
            music.stop();
        }
    }

    start() {
        this.play = true;
        this.index = Math.floor(Math.random() * this.pathArray.length);
        this.playMusic(this.index);
    }
}

