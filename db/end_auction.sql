update auctions
set auction_over = true, auction_end_timestamp = current_timestamp
Where id = ${auction_id};

