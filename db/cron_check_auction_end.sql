update auctions
set auction_over = true, auction_end_timestamp = current_timestamp
Where auction_end :: timestamp without time zone <= ${currentTime} :: timestamp without time zone;