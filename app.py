
from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/products")
def products():
    return "Product listing page will be implemented next."


@app.route("/login")
def login():
    return "Login page will be implemented next."


@app.route("/register")
def register():
    return "Registration page will be implemented next."


if __name__ == "__main__":
    app.run(debug=True)
