INSERT INTO users (fb_id, display_name, img_url, email)
VALUES (${fb_id}, ${display_name}, ${img_url}, ${email})

RETURNING *

