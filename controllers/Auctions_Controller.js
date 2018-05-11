const moment = require('moment')
moment().format();

module.exports={
    getAllAuctions: (req, res, next)=>{
        const dbInstance = req.app.get('db');
        
        dbInstance.get_all_auctions().then(auctions=>{
            return res.status(200).send(auctions)
        }).catch(err=> res.status(500).send(err))
    },

    createAuction: (req, res, next) =>{
        const dbInstance = req.app.get('db');
        const {coral_name, coral_type, coral_desc, coral_img_url, auction_end, starting_bid, bid_increment, current_bid} = req.body
        const {id: owner_id} = req.user
        dbInstance.create_auction({coral_name, coral_type, coral_desc, coral_img_url, auction_end, starting_bid, bid_increment, current_bid, owner_id}).then(auctions=>{
            dbInstance.get_all_auctions().then(auctions=>{
                return res.status(200).send(auctions)
            }).catch(err=> res.send(err))
        }).catch(err=> res.status(500).send(err))
    },
    addToWatchlist: (req, res, next)=>{
        
        const dbInstance = req.app.get('db');
        const {auction_id} = req.body
        const {id: owner_id} = req.user
        

        dbInstance.add_to_watchlist({owner_id, auction_id}).then(auctions=>{
            return res.status(200).send(auctions)
        }).catch(err=> res.status(500).send(err))
    },
    endAuction: (req, res, next)=>{
        const dbInstance = req.app.get('db');
        const {auction_id} = req.body
        const {id: owner_id} = req.user
        
        // dbInstance.end_auction({auction_id}).then(auctions=>{


            dbInstance.get_all_auctions().then(allAuctions=>{
                dbInstance.get_user_watchlist({owner_id}).then(userWatchlist=>{
                    dbInstance.get_auctions_by_user_id({owner_id}).then(userAuctions=>{
                        var results = {
                            auctions: allAuctions,
                            userWatchlist: userWatchlist,
                            userAuctions: userAuctions
                        }
                        return res.send(results).status(200)
                    })
                })


        }).catch(err=> {
            console.log('err 1', err)
            res.status(500).send(err)
        }).catch(err => console.log('err in end_auction', err))

    },

    getAuctionWinner: (req, res, next)=>{
        const dbInstance = req.app.get('db');
        const {auctionId} = req.params;

        dbInstance.auction_winner({auctionId}).then(winnerObj=>{
            console.log('winner 0bj controller', winnerObj)
            return res.status(200).send(winnerObj)
        }).catch(err=> { 
            console.log('err 2', err)
            res.status(500).send(err)
        })
    },

    cronCheckAuctionEnd: (app, stream) => {
        const dbInstance = app.get('db');
        var currentTime = moment().subtract(6, 'hours')
        console.log('currentTime', currentTime)
        dbInstance.cron_check_auction_end({currentTime}).then(auctions=>{
            
        }).catch(err => {
            var errString = "cron check error" + err
            stream.write(errString)})

    }
}   