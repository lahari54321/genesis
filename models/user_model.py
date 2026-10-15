
from database.db import get_db
from werkzeug.security import generate_password_hash, check_password_hash


def create_user(name, email, password):
    name = name.strip()
    email = email.strip().lower()

    if not name or not email or len(password) < 6:
        return False, "Enter your name, email, and a password of at least 6 characters."

    try:
        with get_db() as db:
            db.execute(
                """
                INSERT INTO users (name, email, password)
                VALUES (?, ?, ?)
                """,
                (name, email, generate_password_hash(password))
            )
        return True, "Account created successfully."

    except Exception as error:
        if "UNIQUE constraint failed" in str(error):
            return False, "This email is already registered."
        raise


def authenticate_user(email, password):
    with get_db() as db:
        user = db.execute(
            "SELECT * FROM users WHERE email = ?",
            (email.strip().lower(),)
        ).fetchone()

    if user and check_password_hash(user["password"], password):
        return dict(user)

    return None


def get_user_by_id(user_id):
    with get_db() as db:
        user = db.execute(
            "SELECT id, name, email FROM users WHERE id = ?",
            (user_id,)
        ).fetchone()

    return dict(user) if user else None
