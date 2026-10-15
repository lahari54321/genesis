
from database.db import get_db


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
