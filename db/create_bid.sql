insert into bids (owner_id, auction_id, bid_amount, timestamp)
values(${owner_id}, ${auction_id},${bid_amount}, ${timestamp})


returning *