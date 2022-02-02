


export default anims => {
    anims.create({
        key: 'birdman-idle',
        frames: anims.generateFrameNumbers('birdman', {starts: 0, end: 12}),
        frameRate: 12,
        repeat: -1
    })

    anims.create({
        key: 'birdman-hurt',
        frames: anims.generateFrameNumbers('birdman', {starts: 25, end: 26}),
        frameRate: 2,
        repeat: 0
    })

}