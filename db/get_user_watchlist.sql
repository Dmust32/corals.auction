 SELECT *
 FROM auctions a
 JOIN users_watchlist w
 ON a.id = w.auction_id
 WHERE w.owner_id = ${owner_id}