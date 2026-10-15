
from database.db import get_db


def get_admin_stats():
    with get_db() as db:
        total_users = db.execute(
            "SELECT COUNT(*) FROM users"
        ).fetchone()[0]

        total_products = db.execute(
            "SELECT COUNT(*) FROM products"
        ).fetchone()[0]

        live_auctions = db.execute(
            "SELECT COUNT(*) FROM products WHERE status = 'LIVE'"
        ).fetchone()[0]

        total_bids = db.execute(
            "SELECT COUNT(*) FROM bids"
        ).fetchone()[0]

    return {
        "total_users": total_users,
        "total_products": total_products,
        "live_auctions": live_auctions,
        "total_bids": total_bids
    }


def get_recent_products():
    with get_db() as db:
        rows = db.execute(
            """
            SELECT id, name, category, seller, price, status, bids
            FROM products
            ORDER BY id DESC
            LIMIT 20
            """
        ).fetchall()

    return [dict(row) for row in rows]


def delete_product(product_id):
    with get_db() as db:
        product = db.execute(
            "SELECT id FROM products WHERE id = ?",
            (product_id,)
        ).fetchone()

        if not product:
            return False, "Product not found."

        # Remove related records first to respect foreign keys.
        db.execute(
            "DELETE FROM reminders WHERE product_id = ?",
            (product_id,)
        )
        db.execute(
            "DELETE FROM bids WHERE product_id = ?",
            (product_id,)
        )
        db.execute(
            "DELETE FROM products WHERE id = ?",
            (product_id,)
        )

    return True, "Product listing deleted."
