
from database.db import get_db
from datetime import datetime, timedelta

INITIAL_PRODUCTS = [
    (
        1, "Midnight Chronograph", "WATCHES",
        "Northstar Finds", 12800, "LIVE", 12,
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
        "A striking timepiece for collectors.", "22 min left"
    ),
    (
        2, "Retro Film Camera", "ELECTRONICS",
        "Analog Room", 7200, "LIVE", 8,
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
        "A classic camera for creative minds.", "48 min left"
    ),
    (
        3, "Sculptural Desk Lamp", "HOME",
        "Form & Function", 2800, "UPCOMING", 0,
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
        "Minimal design with a warm glow.", "Starts soon"
    ),
    (
        4, "Collector Sneakers", "FASHION",
        "Northstar Finds", 5400, "LIVE", 6,
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
        "A bold pair for your collection.", "1 hr left"
    )
]


def seed_products():
    with get_db() as db:
        db.executemany(
            """
            INSERT OR IGNORE INTO products
            (id, name, category, seller, price, status, bids,
             image, description, time)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            INITIAL_PRODUCTS
        )


def get_all_products(query=""):
    with get_db() as db:
        if query:
            search = f"%{query.strip()}%"
            rows = db.execute(
                """
                SELECT * FROM products
                WHERE name LIKE ? OR category LIKE ? OR seller LIKE ?
                ORDER BY id
                """,
                (search, search, search)
            ).fetchall()
        else:
            rows = db.execute(
                "SELECT * FROM products ORDER BY id"
            ).fetchall()

    return [dict(row) for row in rows]


def get_product(product_id):
    with get_db() as db:
        row = db.execute(
            "SELECT * FROM products WHERE id = ?",
            (product_id,)
        ).fetchone()

    return dict(row) if row else None


def place_bid(user_id, product_id, amount):
    with get_db() as db:
        # Acquire a write lock before checking the current bid.
        db.execute("BEGIN IMMEDIATE")

        product = db.execute(
            "SELECT price, status FROM products WHERE id = ?",
            (product_id,)
        ).fetchone()

        if not product:
            return False, "Product not found."

        if product["status"] != "LIVE":
            return False, "This auction is not live."

        if amount <= product["price"]:
            return False, "Your bid must exceed the current bid."

        db.execute(
            """
            UPDATE products
            SET price = ?, bids = bids + 1
            WHERE id = ?
            """,
            (amount, product_id)
        )

        db.execute(
            """
            INSERT INTO bids (user_id, product_id, amount)
            VALUES (?, ?, ?)
            """,
            (user_id, product_id, amount)
        )

    return True, "Your bid was placed successfully."


def save_reminder(user_id, product_id):
    with get_db() as db:
        product = db.execute(
            "SELECT status FROM products WHERE id = ?",
            (product_id,)
        ).fetchone()

        if not product or product["status"] != "UPCOMING":
            return False, "This auction is not available for reminders."

        db.execute(
            """
            INSERT OR IGNORE INTO reminders (user_id, product_id)
            VALUES (?, ?)
            """,
            (user_id, product_id)
        )

    return True, "Auction reminder saved."


def get_user_reminders(user_id):
    with get_db() as db:
        rows = db.execute(
            """
            SELECT p.name AS product
            FROM reminders r
            JOIN products p ON p.id = r.product_id
            WHERE r.user_id = ?
            ORDER BY r.created_at DESC
            """,
            (user_id,)
        ).fetchall()

    return [dict(row) for row in rows]




def create_product(
    name, category, price, image, description, status, seller,
    starts_at, ends_at
):
    name = name.strip()
    category = category.strip().upper()
    image = image.strip()
    description = description.strip()

    if not name or not category or not description:
        return False, "Please fill in all required fields."

    if price <= 0:
        return False, "Price must be greater than zero."

    if not starts_at or not ends_at:
        return False, "Please select the auction start and end times."

    try:
        start = datetime.fromisoformat(starts_at)
        end = datetime.fromisoformat(ends_at)
    except ValueError:
        return False, "Please enter valid auction dates and times."

    now = datetime.now()

    if start < now:
        return False, "The auction start time cannot be in the past."

    if end <= start:
        return False, "The end time must be after the start time."

    status = "UPCOMING" if start > now else "LIVE"

    if not image:
        image = (
            "https://images.unsplash.com/"
            "photo-1491553895911-0055eca6402d"
            "?auto=format&fit=crop&w=900&q=80"
        )

    with get_db() as db:
        db.execute(
            """
            INSERT INTO products
            (name, category, seller, price, status, bids,
             image, description, time, starts_at, ends_at)
            VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?)
            """,
            (
                name, category, seller, price, status,
                image, description, "Scheduled",
                start.isoformat(timespec="seconds"),
                end.isoformat(timespec="seconds")
            )
        )

    return True, "Your product has been scheduled successfully."


def get_seller_products(seller):
    with get_db() as db:
        rows = db.execute(
            """
            SELECT * FROM products
            WHERE seller = ?
            ORDER BY id DESC
            """,
            (seller,)
        ).fetchall()

    return [dict(row) for row in rows]



def get_user_bids(user_id):
    with get_db() as db:
        rows = db.execute(
            """
            SELECT
                b.id AS bid_id,
                b.amount AS my_bid,
                b.created_at AS bid_time,
                p.id AS product_id,
                p.name,
                p.category,
                p.image,
                p.price AS current_price,
                p.status,
                p.seller
            FROM bids b
            JOIN products p ON p.id = b.product_id
            WHERE b.user_id = ?
            ORDER BY b.created_at DESC, b.id DESC
            """,
            (user_id,)
        ).fetchall()

    return [dict(row) for row in rows]


def initialize_auction_times():
    """Give older demo listings real times if they do not have any."""
    now = datetime.now()

    with get_db() as db:
        rows = db.execute(
            """
            SELECT id, status
            FROM products
            WHERE starts_at IS NULL OR ends_at IS NULL
            """
        ).fetchall()

        for product in rows:
            if product["status"] == "UPCOMING":
                start = now + timedelta(hours=1)
                end = start + timedelta(hours=2)
            else:
                start = now - timedelta(hours=1)
                end = now + timedelta(hours=2)

            db.execute(
                """
                UPDATE products
                SET starts_at = ?, ends_at = ?
                WHERE id = ?
                """,
                (
                    start.isoformat(timespec="seconds"),
                    end.isoformat(timespec="seconds"),
                    product["id"]
                )
            )


def refresh_auction_statuses():
    """Update auction states using their scheduled times."""
    now = datetime.now().isoformat(timespec="seconds")

    with get_db() as db:
        db.execute(
            """
            UPDATE products
            SET status = 'UPCOMING'
            WHERE starts_at > ?
            """,
            (now,)
        )

        db.execute(
            """
            UPDATE products
            SET status = 'ENDED'
            WHERE ends_at <= ?
            """,
            (now,)
        )

        db.execute(
            """
            UPDATE products
            SET status = 'LIVE'
            WHERE starts_at <= ?
              AND ends_at > ?
            """,
            (now, now)
        )


def get_remaining_time(product):
    """Return a readable countdown for a product."""
    if product["status"] == "ENDED":
        return "Auction ended"

    time_value = (
        product.get("starts_at")
        if product["status"] == "UPCOMING"
        else product.get("ends_at")
    )

    if not time_value:
        return product.get("time", "Time unavailable")

    target = datetime.fromisoformat(time_value)
    difference = target - datetime.now()

    if difference.total_seconds() <= 0:
        return "Less than a minute"

    total_minutes = int(difference.total_seconds() // 60)
    days, remaining = divmod(total_minutes, 1440)
    hours, minutes = divmod(remaining, 60)

    if days:
        return f"{days}d {hours}h left"
    if hours:
        return f"{hours}h {minutes}m left"
    return f"{minutes} min left"


def get_auction_winner(product_id):
    with get_db() as db:
        row = db.execute(
            """
            SELECT
                b.amount,
                b.created_at,
                u.name AS winner_name
            FROM bids b
            JOIN users u ON u.id = b.user_id
            WHERE b.product_id = ?
            ORDER BY b.amount DESC, b.created_at ASC, b.id ASC
            LIMIT 1
            """,
            (product_id,)
        ).fetchone()

    return dict(row) if row else None
