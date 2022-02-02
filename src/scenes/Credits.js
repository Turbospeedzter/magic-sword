


import BaseScene from './BaseScene';


class CreditsScene extends BaseScene {

    constructor(config) {
        super('CreditsScene', {...config, canGoBack: true});

        this.menu = [
            {scene: null, text: 'GAME OVER!'},
            {scene: null, text: "Thanks for playing!"},
            {scene: null, text: 'Cosmic Thump Games'}
            
        ]   
    }


    create() {
    super.create();
    this.createMenu(this.menu, () => {});
    
    }
}
  

export default CreditsScene;