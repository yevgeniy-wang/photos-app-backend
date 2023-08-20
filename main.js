const fs = require("fs");
const express = require('express')
const app = express()

const PORT = 3000;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomElementFromArray(lengthMin, lengthMax, array) {
    return array[getRandomInt(lengthMin, lengthMax)]
}

function getPhoto(id) { // id starts with 1
    const descriptions = ['some random text', 'funny image', 'cool photo']
    const commentsLength = {
        min: 0,
        max: 20
    }
    const likesAmount = {
        min: 15,
        max: 200
    }

    return {
        id: id + 1,
        url: `photos/${id + 1}.jpg`,
        descriptions: getRandomElementFromArray(0, descriptions.length - 1, descriptions),
        likes: getRandomInt(likesAmount.min, likesAmount.max),
        comments: new Array(getRandomInt(commentsLength.min, commentsLength.max)).fill(null).map((_, id) => getComment(id))
    }
}

function getComment(id) { // id starts with 1
    const comments = [
        'Все відмінно!',
        'Загалом все непогано. Але не всі.',
        'Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.',
        'Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.',
        'Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.',
        'Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?'
    ]
    const names = ['Олег', 'Андрей', 'Артем', 'Евгений', 'Максим', 'Анатолий', 'Дмитрий']
    const avatarId = {
        min: 1,
        max: 6
    }

    return {
        id: id + 1,
        avatar: `img/avatar-${getRandomInt(avatarId.min, avatarId.max)}.svg`,
        message: getRandomElementFromArray(0, comments.length - 1, comments),
        name: getRandomElementFromArray(0, names.length - 1, names)
    }
}

function createArrayOfPhotos(arrayLength) {
    return new Array(arrayLength).fill(null).map((_, id) => getPhoto(id))
}

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342')
    next()
})

app.get('/photos', (_, res) => {
    const photos = fs.readFileSync("photos.txt", "utf8");
    res.setHeader('Content-Type', 'application/json').status(200).send(photos)
})

app.listen(PORT, ()=>{
    fs.writeFileSync("photos.txt", JSON.stringify(createArrayOfPhotos(25)))
    console.log("Server listening on PORT", PORT);
})