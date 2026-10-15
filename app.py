
from flask import (
    Flask, render_template, request, redirect,
    url_for, session, flash
)
from functools import wraps

from database.db import init_db
from models.user_model import create_user, authenticate_user

from models.admin_model import (
    get_admin_stats,
    get_recent_products,
    delete_product
)

from models.product_model import (
    seed_products,
    get_all_products,
    get_product,
    place_bid,
    save_reminder,
    get_user_reminders,
    create_product,
    get_seller_products,
    get_user_bids,
    initialize_auction_times,
    refresh_auction_statuses,
    get_remaining_time
)

app = Flask(__name__)
app.secret_key = "veyra-demo-change-this-key"


def login_required(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        if "user_id" not in session:
            flash("Please log in first.", "error")
            return redirect(url_for("login"))
        return function(*args, **kwargs)
    return wrapper

def admin_required(function):
    @wraps(function)
    def wrapper(*args, **kwargs):
        if "user_id" not in session:
            flash("Please log in first.", "error")
            return redirect(url_for("login"))

        if session.get("role") != "admin":
            flash("You do not have permission to access that page.", "error")
            return redirect(url_for("home"))

        return function(*args, **kwargs)

    return wrapper



@app.route("/")
def home():
    refresh_auction_statuses()

    query = request.args.get("q", "").strip()
    products = get_all_products(query)

    for product in products:
        product["time"] = get_remaining_time(product)

    return render_template(
        "index.html",
        products=products,
        query=query.lower()
    )


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        name = request.form.get("name", "")
        email = request.form.get("email", "")
        password = request.form.get("password", "")

        success, message = create_user(name, email, password)

        if success:
            user = authenticate_user(email, password)
            session["user_id"] = user["id"]
            session["user"] = user["name"]
            session["role"] = user["role"]
            flash(message, "success")
            return redirect(url_for("home"))

        flash(message, "error")

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email", "")
        password = request.form.get("password", "")

        user = authenticate_user(email, password)

        if user:
            session.clear()
            session["user_id"] = user["id"]
            session["user"] = user["name"]
            session["role"] = user["role"]
            flash("Login successful!", "success")
            return redirect(url_for("home"))

        flash("Invalid email or password.", "error")

    return render_template("login.html")


@app.route("/logout")
def logout():
    session.clear()
    flash("You have logged out.", "success")
    return redirect(url_for("home"))


@app.post("/bid/<int:product_id>")
@login_required
def bid(product_id):
    try:
        amount = int(request.form.get("amount", "0"))
    except ValueError:
        amount = 0

    success, message = place_bid(
        session["user_id"], product_id, amount
    )
    flash(message, "success" if success else "error")

    return redirect(url_for("product_detail", product_id=product_id))


@app.post("/remind/<int:product_id>")
@login_required
def remind(product_id):
    success, message = save_reminder(
        session["user_id"], product_id
    )
    flash(message, "success" if success else "error")

    return redirect(url_for("home"))


@app.route("/reminders")
@login_required
def dashboard():
    reminders = get_user_reminders(session["user_id"])

    return render_template(
        "buyer/dashboard.html",
        reminders=reminders
    )



@app.route("/seller")
@login_required
def seller_dashboard():
    products = get_seller_products(session["user"])
    return render_template(
        "seller/dashboard.html",
        products=products
    )


@app.route("/seller/add-product", methods=["GET", "POST"])
@login_required
def add_product():
    if request.method == "POST":
        name = request.form.get("name", "")
        category = request.form.get("category", "")
        image = request.form.get("image", "")
        description = request.form.get("description", "")
        status = request.form.get("status", "UPCOMING")

        try:
            price = int(request.form.get("price", "0"))
        except ValueError:
            price = 0

        success, message = create_product(
            name=name,
            category=category,
            price=price,
            image=image,
            description=description,
            status=status,
            seller=session["user"]
        )

        flash(message, "success" if success else "error")

        if success:
            return redirect(url_for("seller_dashboard"))

    return render_template("seller/add_product.html")


@app.route("/product/<int:product_id>")
def product_detail(product_id):
    refresh_auction_statuses()
    product = get_product(product_id)

    if not product:
        return render_template("errors/404.html"), 404

    product["time"] = get_remaining_time(product)

    return render_template("product_detail.html", product=product)

@app.route("/my-bids")
@login_required
def my_bids():
    bids = get_user_bids(session["user_id"])
    return render_template("buyer/my_bids.html", bids=bids)


@app.route("/admin")
@admin_required
def admin_dashboard():
    stats = get_admin_stats()
    products = get_recent_products()

    return render_template(
        "admin/dashboard.html",
        stats=stats,
        products=products
    )


@app.post("/admin/delete-product/<int:product_id>")
@admin_required
def admin_delete_product(product_id):
    success, message = delete_product(product_id)

    flash(message, "success" if success else "error")
    return redirect(url_for("admin_dashboard"))


@app.errorhandler(404)
def not_found(error):
    return render_template("errors/404.html"), 404

if __name__ == "__main__":
    init_db()
    seed_products()
    initialize_auction_times()
    refresh_auction_statuses()
    app.run(debug=True)
