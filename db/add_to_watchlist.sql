insert into users_watchlist (owner_id, auction_id, watchlist_id)
values (${owner_id}, ${auction_id}, ${owner_id}::varchar || '_' || ${auction_id}::varchar)