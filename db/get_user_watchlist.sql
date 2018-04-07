select * from 
auctions, users_watchlist
where auctions.id = users_watchlist.auction_id
and users_watchlist.owner_id = ${owner_id}