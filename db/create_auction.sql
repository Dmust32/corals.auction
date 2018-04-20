Insert into auctions (coral_name, coral_type, coral_desc, coral_img_url, auction_end, starting_bid, bid_increment, current_bid, owner_id)
values (${coral_name}, ${coral_type}, ${coral_desc}, ${coral_img_url}, ${auction_end}, ${starting_bid}, ${bid_increment}, ${current_bid}, ${owner_id});

Select *
From auctions
where owner_id = ${owner_id}
