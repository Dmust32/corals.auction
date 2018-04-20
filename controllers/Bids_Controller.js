module.exports = {
    createBid: (req, res, next) =>{
        const dbInstance = req.app.get('db');
        var { auction_id, bid_amount} = req.body
        var {id: owner_id} = req.user
        owner_id = Number(owner_id)
        auction_id = Number(auction_id)
        bid_amount = Number(bid_amount)
        dbInstance.create_bid({owner_id, auction_id, bid_amount}).then(bids=>{
            return res.status(200).send(bids)
        }).catch(err=> res.status(500).send(err))
    },

    getBids: (req, res, next) =>{
        const dbInstance = req.app.get('db');
        const { auction_id} = req.body
        const {id: owner_id} = req.user

        dbInstance.get_bids({owner_id, auction_id }).then(bids=>{
            return res.status(200).send(bids)
        }).catch(err=> res.status(500).send(err))
    },
    updateCurrentBid: async (req, res, next) =>{
        try {
            const dbInstance = req.app.get('db');
            const { auction_id, bid_amount} = req.body
    
            await dbInstance.update_current_bid({auction_id, bid_amount})
            let auctions = await dbInstance.get_all_auctions()
            res.send(auctions)
        } catch (error) {
            console.error('we have an error:', error)
            res.status(500).send(error)
        }
    }

}