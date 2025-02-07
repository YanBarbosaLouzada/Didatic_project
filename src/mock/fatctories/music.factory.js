import { faker } from "@faker-js/faker";

export const musicFactory = () => {
    return {
        id: faker.number.int({ min: 1, max: 100 }),
        nome: faker.music.songName(),
        cantor: faker.music.artist(),
        genero: faker.music.genre(),
        nota: faker.number.int({ min: 1, max: 10 })
    }
}