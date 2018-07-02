// Create empty game
var game = new Phaser.Game(800, 600, Phaser.AUTO);

// Game code
var GameState = {
    preload: function(){
        this.load.image('background', '/assets/images/background2.jpg');
        this.load.image('arrow', '/assets/images/arrow.png');
        // this.load.image('ryan', '/assets/images/ryan.png');
        // this.load.image('apeach', '/assets/images/apeach.png');
        // this.load.image('frodo', '/assets/images/frodo.png');
        this.load.spritesheet('ryan', '/assets/images/ryan_ss.png', 206, 341, 4);
        this.load.spritesheet('apeach', '/assets/images/apeach_ss.png', 235, 333, 4);
        this.load.spritesheet('frodo', '/assets/images/frodo_ss.png', 187, 333, 4);
        // this.load.image('jayg', '/assets/images/jayg.png');
        // this.load.image('muzi', '/assets/images/muzi.png');
        // this.load.image('neo', '/assets/images/neo.png');
        // this.load.image('tube', '/assets/images/tube.png');
        
    },

    create: function(){
        //Fit its size as its resolution/ratio and set in the middle of it
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.background = this.game.add.sprite(0, 0, 'background');
        
        this.rightarrow = this.game.add.sprite(730, this.game.world.centerY, 'arrow');
        this.rightarrow.scale.setTo(0.5);
        this.rightarrow.customParams = {direction : 1};
        this.rightarrow.anchor.setTo(0.5);
        this.rightarrow.inputEnabled = true;
        this.rightarrow.input.pixelPerfectClick = true;
        this.rightarrow.events.onInputDown.add(this.switchFriend, this);

        this.leftarrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
        this.leftarrow.scale.setTo(-0.5);
        this.leftarrow.anchor.setTo(0.5);
        this.leftarrow.customParams = {direction : -1};
        this.leftarrow.inputEnabled = true;
        this.leftarrow.events.onInputDown.add(this.switchFriend, this);

        
        var friendsData = [
            {key: 'ryan', text: 'RYAN'},
            {key: 'apeach', text: 'APEACH'},
            {key: 'frodo', text: 'FRODO'}
            // {key: 'jayg', text: 'JAYG'},
            // {key: 'muzi', text: 'MUZI'},
            // {key: 'neo', text: 'NEO'}, 
            // {key: 'tube', text: 'TUBE'}
        ];

        this.friends = this.game.add.group();
        
        var self = this;
        friendsData.forEach(function(element){
            var friend = self.friends.create(-100, self.game.world.centerY, element.key, 0);
            friend.customParams = {text: element.text};
            friend.scale.setTo(0.5);
            friend.anchor.setTo(0.5);
            friend.animations.add('animate', [0, 1, 2, 3, 2, 1, 0], 4, false);
            friend.inputEnabled = true;
            friend.input.pixelPerfectClick = true;
            friend.events.onInputDown.add(self.animateFriend, self);  
        });
        
        this.currentFriend = this.friends.next();
        this.currentFriend.position.set(this.game.world.centerX, this.game.world.centerY);

    },

    update: function(){
        //this.frodo.angle += 0.5;
    },

    animateFriend: function(sprite, event){
        console.log('animateFriend exetucted');
        sprite.play('animate');
    },

    switchFriend : function(sprite, event){

        if(this.isMoving){
            return false;
        }

        this.isMoving = true;

        console.log('on input down');
        console.log(sprite);
        var newFriend, endX;
        if(sprite.customParams.direction > 0 ){
            newFriend = this.friends.next();
            newFriend.x = -newFriend.width/2;
            console.log('right arrow clicked');
            console.log(newFriend.customParams.text);
            endX = 800 + this.currentFriend.width/2;
            console.log(endX);
        }else{
            newFriend = this.friends.previous();
            newFriend.x = 800 + newFriend.width/2;
            console.log('left arrow clicked');
            console.log(newFriend.customParams.text);            
            endX = - this.currentFriend.width/2;
            console.log(endX);
        }

        var currentFriendMovement = this.game.add.tween(this.currentFriend);
        currentFriendMovement.to({x: endX}, 1000);
        currentFriendMovement.onComplete.add(function(){  //add callback functions to the onComplete Object of the tween   
            this.isMoving = false;
        }, this);
        currentFriendMovement.start();

        var newFriendMovement = this.game.add.tween(newFriend);
        newFriendMovement.to({x:this.game.world.centerX}, 1000);
        newFriendMovement.start();

        //this.currentFriend.x = endX;
        //newFriend.position.x = this.game.world.centerX;
        this.currentFriend = newFriend;
    }
};


// Give state a name
game.state.add('GameState', GameState);

// Launch the game
game.state.start('GameState');







        // this.apeach = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'apeach');
        // this.apeach.scale.setTo(0.5);
        // this.apeach.anchor.setTo(0.5);
        // this.frodo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'frodo');
        // this.frodo.scale.setTo(0.5);
        // this.frodo.anchor.setTo(0.5);
        // this.jayg = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'jayg');
        // this.jayg.scale.setTo(0.5);
        // this.jayg.anchor.setTo(0.5);
        // this.muzi = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'muzi');
        // this.muzi.scale.setTo(0.5);
        // this.muzi.anchor.setTo(0.5);
        // this.neo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'neo');
        // this.neo.scale.setTo(0.5);
        // this.neo.anchor.setTo(0.5);
        // this.ryan = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'ryan');
        // this.ryan.scale.setTo(0.5);
        // this.ryan.anchor.setTo(0.5);
        // this.tube = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'tube');
        // this.tube.scale.setTo(0.5);
        // this.tube.anchor.setTo(0.5);