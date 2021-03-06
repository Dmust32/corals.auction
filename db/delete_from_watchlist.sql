delete from users_watchlist
where auction_id = ${id};

SELECT *
FROM auctions a
JOIN users_watchlist w
ON a.id = w.auction_id
WHERE w.owner_id = ${owner_id} and auction_over = false;
