
let Grid = require('../src/Grid')

describe("Une grille",()=>{
    it("doit renvoyer une collection de cellules",()=>{
        //given
        let grid = new Grid()
        //when
        let cells = grid.getCells()
        //then
        expect(Array.isArray(cells)).toBe(true)
    })
    it("doit renvoyer une erreur si la collection de cellules n'est pas un tableau", ()=>{
        //given
        //when
        //then
        expect(()=>new Grid({cells:"dummyData"})).toThrow(new TypeError("Type de cellules incompatibles"))
    })
    it("doit dire si une cellule est vivante",()=>{
        //given
        let grid = new Grid({cells:[{row:1, col:1}]})
        //when
        let expected = grid.isAliveAt(1, 1)
        //then
        expect(expected).toBe(true)
    })
    it("doit dire si une cellule est morte",()=>{
        //given
        let grid = new Grid()
        //when
        let expected = grid.isAliveAt(1, 1)
        //then
        expect(expected).toBe(false)
    })
    it("doit pouvoir tuer une cellule qui existe, et renvoyer vrai", ()=>{
        //given
        let grid = new Grid({cells:[{row:1, col:1}]})
        //when
        let killed = grid.killAt(1, 1)
        //then
        expect(killed).toBe(true)
        expect(grid.isAliveAt(1,1)).toBe(false)
    })
    it("doit renvoyer false lorsque l'on essaye de supprimer une cellule qui n'existe pas", ()=>{
        //given
        let grid = new Grid()
        //when
        let killed = grid.killAt(1, 1)
        //then
        expect(killed).toBe(false)
        expect(grid.isAliveAt(1, 1)).toBe(false)
    })
    it("doit retourner vrai lors de l'animation d'une cellule morte",()=>{
        //given
        let grid = new Grid()
        //when
        let created = grid.deliverAt(1, 1)
        //then
        expect(created).toBe(true)
        expect(grid.isAliveAt(1, 1)).toBe(true)
    })
    it("doit retourner faux lors de l'animation d'une cellule, si elle existe déjà",()=>{
        //given
        let grid = new Grid({cells:[{col:1, row:1}]})
        //when
        let delivered = grid.deliverAt(1, 1)
        //then
        expect(delivered).toBe(false)
        expect(grid.isAliveAt(1, 1)).toBe(true)

    })
    it("doit retourner le nombre de cellules au voisinage", ()=>{
        //given
        let grid = new Grid({
            cells:[
                {col:1,row:1},
                {col:2,row:1},
                {col:3,row:1},
                {col:1,row:2},
                {col:3,row:2},
                {col:1,row:3},
                {col:2,row:3},
                {col:3,row:3}
            ]
        })
        //when
        let neighborhood=grid.getNeighborhoodAt(2, 2)
        //then
        expect(neighborhood.length).toBe(8)
        //when
        neighborhood=grid.getNeighborhoodAt(1,1)
        //then
        expect(neighborhood.length).toBe(2)
    })
    it("doit faire vivre une cellule si celle ci a trois cellules voisines", ()=>{
        //given
        let grid = new Grid({
            cells:[
                {col: 1, row: 1},
                {col: 1, row: 2},
                {col: 1, row: 3}
            ]
        })
        //when
        let expected = grid.nextAt(2, 2)
        //then
        expect(expected).toEqual({col:2, row:2})
    })
    it("doit laisser une cellule vivante si elle a deux cellules visines", ()=>{
        //given
        let grid = new Grid({
            cells: [
                {col: 1, row: 1},
                {col: 1, row: 2},
                {col: 1, row: 3}
            ]
        })
        //when
        let expected = grid.nextAt(1, 2)
        //then
        expect(expected).toEqual({col: 1, row: 2})
    })
    it("doit laisser une cellule morte si elle à deux cellules voisines",()=>{
        //given
        let grid = new Grid({
            cells:[
                {col:1, row:2},
                {col:1, row:3}
            ]
        })
        //when
        let expected = grid.nextAt(1.2)
        //then
        expect(expected).toBe(undefined)
    })
    it("doit tuer une cellule si elle a plus de 3 voisines", ()=>{
        //given
        let grid = new Grid({
            cells:[
                {col:1, row:1},
                {col:1, row:2},
                {col:1, row:3},
                {col:2, row:3}
            ]
        })
        //when
        let expected = grid.nextAt(2, 2)
        //then
        expect(expected).toBe(undefined)
    })
    it("doit tuer une cellules si elle à moins de deux voisines", ()=>{
        //given
        let grid = new Grid({
            cells:[
                {col:1, row:1}
            ]
        })
        //when
        let expected = grid.nextAt(2, 2)
        //then
        expect(expected).toBe(undefined)

    })
})
