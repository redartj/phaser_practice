    // create empty game
var game = new Phaser.Game(800, 500, Phaser.AUTO);


    // code of the game
var GameState = {
    preload: function(){
        this.load.image('background', '/assets/images/background.jpg'); //load the image file in the preload method. name and path
        this.load.image('lion00', '/assets/images/lion00.png');
        this.load.image('lion01', '/assets/images/lion01.jpg');
        this.load.image('lion02', '/assets/images/lion02.jpg');
        this.load.image('lion03', '/assets/images/lion03.jpeg');
        this.load.image('arrow', '/assets/images/arrow.png');
    },

    create: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  //비율대로 사이즈를 바꿔줌
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignHorizontally = true;

        this.background = this.game.add.sprite(0, 0, 'background'); //create new Sprite toshow the image on the screen
        this.lion00 = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY+50, 'lion00'); //this.game.world serve the center of the game
        this.lion00.anchor.setTo(0.5, 0.5); //change the anchor point the middle of image
        this.lion00.scale.setTo(0.3); //multiply bigger/smaller when put one number then change the scale fit its ratio
        this.lion00.angle = 25;
        //this.lion00.scale.setTo(-0.3, 0.3);

        //lion00 user input
        this.lion00.inputEnable = true;
        this.lion00.input.pixelPerfectClick = true;
        this.lion00.events.onInputDown.add(this.animateAnimal, this);

        this.lion01 = this.game.add.sprite(100, 225, 'lion01');
        this.lion01.scale.setTo(0.2, 0.18);
        this.lion02 = this.game.add.sprite(600, 300, 'lion02');
        this.lion02.scale.setTo(0.3);
        this.lion02.anchor.setTo(0.5);
        // this.lion02.scale.setTo(-0.3, 0.3);

        var animalData = [
            {key: 'lion00', text:'LION00'},
            {key: 'lion01', text:'LION01'},
            {key: 'lion02', text:'LION02'}
        ];

        this.animals = this.game.add.group();

        var self = this;

        animalData.forEach(function(elemant){
            animal = self.animals.create(-1000, self.game.world.centerY, element.key);
            animal.customParams = {text: elemant.text};
            animal.anchor.setTo(0.5);

            animal.inputEnable = true;
            animal.input.pixelPerfectClick = true;
            animal.event.onInputDown.add(self.animateAnimal, self);
        });

        this.currentAnimal = this.animals.next();
        this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);

        //right arrow
        this.rightarrow = this.game.add.sprite(580, this.game.world.centerY, arrow);
        this.rightarrow.anchor.setTo(0.5);
        this.rightarrow.customParams = {direction : 1};

        //right arrow user input
        this.rightarrow.inputEnable = true;
        this.rightarrow.input.pixelPerfectClick = true;
        this.rightarrow.events.onInoutDown.add(this.switchAnimal, this);

        //left arrow
        this.leftarrow = this.game.add.sprite(30, this.game.world.centerY);
        this.leftarrow.anchor.setTo(0.5);
        this.leftarrow.scale.setTo(-1);
        this.leftarrow.customParams = {direction : -1};

        //left arrow user input
        this.leftarrow.inputEnable = true;
        this.leftarrow.input.pixelPerfectClick = true;
        this.leftarrow.events.onInoutDown.add(this.switchAnimal, this);

    }, 

    update: function(){
        //this.lion00.angle += 0.5;
    },
    switchAnimal : function(sprite, event){
        var newAnimal, endX;
        if(sprite.customParams.direction > 0){
            newAnimal = this.animals.next();
            endX = 640 + this.currentAnimal.width/2;
        }else{
            newAnimal = this.animals.previous();
            endX = -this.currentAnimal.width/2;
        }

        this.currentAnimal.x = endX;

        newAnimal.x = this.game.world.centerX;
        this.currentAnimal = newAnimal;
    },
    animateAnimal : function(sprite, event){
        console.log('animate animal');
    }
};

game.state.add('GameState', GameState); //give state a name. 
game.state.start('GameState');  //launch the game