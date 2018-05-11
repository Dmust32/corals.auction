select bids.auction_id,bids.owner_id as highest_bidder, auctions.owner_id as auction_owner, max(bid_amount) as bid_amount from bids
inner join auctions 
on auctions.id = bids.auction_id
where bids.time_of_bid <= auctions.auction_end::timestamp without time zone and auction_id = ${auctionId}
group by bids.auction_id, bids.owner_id , auctions.owner_id