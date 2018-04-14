module.exports={
    getAllAuctions: (req, res, next)=>{
        const dbInstance = req.app.get('db');
        
        dbInstance.get_all_auctions().then(auctions=>{
            return res.status(200).send(auctions)
        }).catch(err=> res.send(err))
    },

    createAuction: (req, res, next) =>{
        const dbInstance = req.app.get('db');
        const {coral_name, coral_type, coral_desc, coral_img_url, auction_end, starting_bid, bid_increment, current_bid, owner_id} = req.body

        dbInstance.create_auction({coral_name, coral_type, coral_desc, coral_img_url, auction_end, starting_bid, bid_increment, current_bid, owner_id}).then(auctions=>{
            dbInstance.get_all_auctions().then(auctions=>{
                return res.status(200).send(auctions)
            }).catch(err=> res.send(err))
        }).catch(err=> res.send(err))
    },
    addToWatchlist: (req, res, next)=>{
        const dbInstance = req.app.get('db');
        const {owner_id, auction_id} = req.body

        dbInstance.addToWatchlist({owner_id, auction_id}).then(auctions=>{
            return res.status(200).send(auctions)
        }).catch(err=> res.send(err))
    }
}