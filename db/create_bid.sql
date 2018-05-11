insert into bids (owner_id, auction_id, bid_amount, time_of_bid)
values(${owner_id}, ${auction_id},${bid_amount}, ${time_of_bid}:: timestamp)


returning *