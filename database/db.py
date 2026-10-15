
import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATABASE_PATH = BASE_DIR / "marketplace.db"


def get_db():
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    connection.execute("PRAGMA foreign_keys = ON")
    return connection


def init_db():
    with get_db() as db:
        db.executescript("""
            
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                role TEXT NOT NULL DEFAULT 'buyer',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );


            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                category TEXT NOT NULL,
                seller TEXT NOT NULL,
                price INTEGER NOT NULL,
                status TEXT NOT NULL,
                bids INTEGER DEFAULT 0,
                image TEXT NOT NULL,
                description TEXT NOT NULL,
                time TEXT NOT NULL,
                starts_at TEXT,
                ends_at TEXT
            );

            CREATE TABLE IF NOT EXISTS bids (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                amount INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id),
                FOREIGN KEY(product_id) REFERENCES products(id)
            );

            CREATE TABLE IF NOT EXISTS reminders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, product_id),
                FOREIGN KEY(user_id) REFERENCES users(id),
                FOREIGN KEY(product_id) REFERENCES products(id)
            );
        """)

        user_columns = [
            row["name"]
            for row in db.execute("PRAGMA table_info(users)").fetchall()
        ]

        if "role" not in user_columns:
            db.execute(
                "ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'buyer'"
            )
            
        
        columns = [
            row["name"]
            for row in db.execute("PRAGMA table_info(products)").fetchall()
        ]

        if "starts_at" not in columns:
            db.execute("ALTER TABLE products ADD COLUMN starts_at TEXT")

        if "ends_at" not in columns:
            db.execute("ALTER TABLE products ADD COLUMN ends_at TEXT")



if __name__ == "__main__":
    init_db()
    print("Database created successfully!")
