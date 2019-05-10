module.exports = function(options){
    let self={
        LIVE:3,
        STAY:2,
        cells:[],
        ...options
    }

    // validation des données
    if(
        options
        && options.cells
        && !Array.isArray(options.cells)
    ){
        throw new TypeError("Type de cellules incompatibles")
    }

    /*
     * Retourne l'ensemble des cellules
     * */
    function getCells(){
        return self.cells
    }

    /*
     * Test si une cellule est en vie
     * */
    function isAliveAt(col, row){
        return self.cells.some(cell=>cell.row==row && cell.col==col)
    }

    /*
     * Tue une cellule
     * */
    function killAt(col, row){
        let deleted = false
        if(isAliveAt(col, row)){
            self.cells = self.cells.filter(cell=>cell.col!=col && cell.row!=row)
            deleted=true
        }
        return deleted
    }

    /*
     * Crée une nouvelle cellule
     * */
    function deliverAt(col, row){
        let delivered = false
        if(!isAliveAt(col, row)){
            self.cells.push({col, row})
            delivered = true
        }
        return delivered
    }

    /*
     * Récupère les cellules au voisinage
     * */
    function getNeighborhoodAt(col, row){
        return [
            {col: col-1, row: row-1},
            {col: col, row: row-1},
            {col: col+1, row: row-1},
            {col: col-1, row: row},
            {col: col+1, row: row},
            {col: col-1, row: row+1},
            {col: col, row: row+1},
            {col: col+1, row: row+1}
        ].reduce((neighborhood, neighbor)=>{
            if(isAliveAt(neighbor.col, neighbor.row)){
                neighborhood.push(neighbor)
            }
            return neighborhood
        }, [])
    }

    /*
     * Détermine l'état suivant d'une cellule
     * */
    function nextAt(col, row){
        let cell
        const neighborhood = getNeighborhoodAt(col, row)
        const rebirth = self.LIVE == neighborhood.length
        const stayAlive = self.STAY == neighborhood.length && isAliveAt(col, row)

        if(rebirth || stayAlive){
            cell =  {col, row}
        }
        return cell
    }

    return {
        getCells: getCells,
        isAliveAt: isAliveAt,
        killAt: killAt,
        deliverAt: deliverAt,
        getNeighborhoodAt: getNeighborhoodAt,
        nextAt:nextAt
    }
}

