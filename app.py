
from flask import (
    Flask, render_template, request, redirect,
    url_for, session, flash
)
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

app = Flask(__name__)
app.secret_key = "veyra-demo-change-this-key"

users = {}
reminders = []

products = [
    {
        "id": 1, "name": "Midnight Chronograph",
        "category": "WATCHES", "seller": "Northstar Finds",
        "price": 12800, "status": "LIVE", "bids": 12,
        "image": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80",
        "description": "A striking timepiece for collectors.",
        "time": "22 min left"
    },
    {
        "id": 2, "name": "Retro Film Camera",
        "category": "ELECTRONICS", "seller": "Analog Room",
        "price": 7200, "status": "LIVE", "bids": 8,
        "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
        "description": "A classic camera for creative minds.",
        "time": "48 min left"
    },
    {
        "id": 3, "name": "Sculptural Desk Lamp",
        "category": "HOME", "seller": "Form & Function",
        "price": 2800, "status": "UPCOMING", "bids": 0,
        "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
        "description": "Minimal design with a warm glow.",
        "time": "Starts soon"
    },
    {
        "id": 4, "name": "Collector Sneakers",
        "category": "FASHION", "seller": "Northstar Finds",
        "price": 5400, "status": "LIVE", "bids": 6,
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
        "description": "A bold pair for your collection.",
        "time": "1 hr left"
    }
]


def login_required(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        if "user" not in session:
            flash("Please log in first.", "error")
            return redirect(url_for("login"))
        return function(*args, **kwargs)
    return wrapper


@app.route("/")
def home():
    query = request.args.get("q", "").lower().strip()

    filtered_products = [
        p for p in products
        if query in (
            p["name"] + " " + p["category"] + " " + p["seller"]
        ).lower()
    ]

    return render_template(
        "index.html",
        products=filtered_products,
        query=query
    )


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")

        if not name or not email or len(password) < 6:
            flash("Enter your details and a password of at least 6 characters.", "error")
        elif email in users:
            flash("This email is already registered.", "error")
        else:
            users[email] = {
                "name": name,
                "password": generate_password_hash(password)
            }
            session["user"] = name
            flash("Welcome to Veyra!", "success")
            return redirect(url_for("home"))

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")
        user = users.get(email)

        if user and check_password_hash(user["password"], password):
            session["user"] = user["name"]
            flash("Login successful!", "success")
            return redirect(url_for("home"))

        flash("Invalid email or password. Register if you are new.", "error")

    return render_template("login.html")


@app.route("/logout")
def logout():
    session.clear()
    flash("You have logged out.", "success")
    return redirect(url_for("home"))


@app.post("/bid/<int:product_id>")
@login_required
def bid(product_id):
    product = next(
        (p for p in products if p["id"] == product_id), None
    )

    if not product:
        flash("Product not found.", "error")
    elif product["status"] != "LIVE":
        flash("This auction is not live.", "error")
    else:
        try:
            amount = int(request.form.get("amount", "0"))
        except ValueError:
            amount = 0

        if amount <= product["price"]:
            flash("Your bid must exceed the current bid.", "error")
        else:
            product["price"] = amount
            product["bids"] += 1
            flash("Your bid was placed successfully!", "success")

    return redirect(url_for("home"))


@app.post("/remind/<int:product_id>")
@login_required
def remind(product_id):
    product = next(
        (p for p in products if p["id"] == product_id), None
    )

    if product and product["status"] == "UPCOMING":
        reminders.append({
            "user": session["user"],
            "product": product["name"]
        })
        flash("Auction reminder saved!", "success")

    return redirect(url_for("home"))


@app.route("/reminders")
@login_required
def dashboard():
    my_reminders = [
        r for r in reminders if r["user"] == session["user"]
    ]
    return render_template(
        "buyer/dashboard.html",
        reminders=my_reminders
    )


@app.errorhandler(404)
def not_found(error):
    return render_template("errors/404.html"), 404


if __name__ == "__main__":
    app.run(debug=True)
