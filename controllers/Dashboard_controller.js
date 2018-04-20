module.exports = {
    getAuctionsByUserId: (req, res, next)=>{
        const dbInstance = req.app.get('db');
        const {id: owner_id} = req.user;

        dbInstance.get_auctions_by_user_id({owner_id}).then(auctions=>{
            return res.status(200).send(auctions)
        }).catch(err=>{
            return res.status(500).send(err)
        })
    },

    getUserWatchlist: (req, res, next)=>{
        const dbInstance = req.app.get('db');
        const { id: owner_id } = req.user;

        dbInstance.get_user_watchlist({owner_id}).then(auctions=>{
            return res.status(200).send(auctions)
        }).catch(err=>{
            return res.status(500).send(err)
        })
    },
    deleteFromWatchlist: (req, res, next)=>{
        const dbInstance = req.app.get('db');
        const {id: owner_id} = req.user;
        const {id} = req.params
        dbInstance.delete_from_watchlist({owner_id, id}).then(auctions=>{
            return res.status(200).send(auctions)
        }).catch(err=>{
            return res.status(500).send(err)
        })
    }
}