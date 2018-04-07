module.exports = {
    createBid: (req, res, next) =>{
        const dbInstance = req.app.get('db');
        var {owner_id, auction_id, bid_amount, timestamp} = req.body
        owner_id = Number(owner_id)
        auction_id = Number(auction_id)
        bid_amount = Number(bid_amount)
        dbInstance.create_bid({owner_id, auction_id, bid_amount, timestamp}).then(bids=>{
            return res.status(200).send(bids)
        }).catch(err=> res.send(err))
    },

    getBids: (req, res, next) =>{
        const dbInstance = req.app.get('db');
        const {owner_id, auction_id} = req.body

        dbInstance.get_bids({owner_id, auction_id }).then(bids=>{
            return res.status(200).send(bids)
        }).catch(err=> res.send(err))
    },


}