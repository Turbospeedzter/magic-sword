



export default anims => {
    anims.create({
        key: 'snaky-walk',
        frames: anims.generateFrameNumbers('snaky', {starts: 0, end: 8}),
        frameRate: 12,
        repeat: -1
    })

    anims.create({
        key: 'snaky-hurt',
        frames: anims.generateFrameNumbers('snaky', {starts: 21, end: 22}),
        frameRate: 8,
        repeat: 0
    })

}