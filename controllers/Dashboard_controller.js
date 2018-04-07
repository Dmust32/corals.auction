module.exports = {
    getAuctionsByUserId: (req, res, next)=>{
        const dbInstance = req.app.get('db');
        const {owner_id} = req.body;

        dbInstance.get_auctions_by_user_id({owner_id}).then(auctions=>{
            return res.status(200).send(auctions)
        })
    },

    getUserWatchlist: (req, res, next)=>{
        const dbInstance = req.app.get('db');
        const{owner_id} = req.body;

        dbInstance.get_user_watchlist({owner_id}).then(auctions=>{
            return res.status(200).send(auctions)
        })
    }
}