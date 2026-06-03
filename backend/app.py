# VendorPro Secure © Kishore

from flask import Flask, request, jsonify
from flask_cors import CORS
from db import db
import jwt
import datetime

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///vendorpro.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "kishore_secure_key_2026"

db.init_app(app)

# ---------------- MODEL ----------------
class Vendor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    address = db.Column(db.String(200))

with app.app_context():
    db.create_all()

# ---------------- LOGIN ----------------
@app.route("/login", methods=["POST"])
def login():
    data = request.json

    if data["username"] == "admin" and data["password"] == "admin123":
        token = jwt.encode({
            "user": "admin",
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }, app.config["SECRET_KEY"], algorithm="HS256")

        return jsonify({"token": token})

    return jsonify({"msg": "Invalid login"}), 401

# ---------------- TOKEN CHECK ----------------
def auth(func):
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization")

        if not token:
            return jsonify({"msg": "No token"}), 401

        try:
            jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        except:
            return jsonify({"msg": "Invalid token"}), 401

        return func(*args, **kwargs)

    wrapper.__name__ = func.__name__
    return wrapper

# ---------------- API ----------------
@app.route("/vendors", methods=["GET"])
@auth
def get_vendors():
    data = Vendor.query.all()
    return jsonify([{
        "id": v.id,
        "name": v.name,
        "email": v.email,
        "phone": v.phone,
        "address": v.address
    } for v in data])

@app.route("/vendors", methods=["POST"])
@auth
def add_vendor():
    v = Vendor(**request.json)
    db.session.add(v)
    db.session.commit()
    return jsonify({"msg": "added"})

@app.route("/vendors/<int:id>", methods=["PUT"])
@auth
def update_vendor(id):
    v = Vendor.query.get(id)
    data = request.json

    v.name = data["name"]
    v.email = data["email"]
    v.phone = data["phone"]
    v.address = data["address"]

    db.session.commit()
    return jsonify({"msg": "updated"})

@app.route("/vendors/<int:id>", methods=["DELETE"])
@auth
def delete_vendor(id):
    v = Vendor.query.get(id)
    db.session.delete(v)
    db.session.commit()
    return jsonify({"msg": "deleted"})

@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "msg": "VendorPro Secure API running",
        "routes": ["/login", "/vendors", "/vendors/<id>"]
    })

@app.errorhandler(404)
def not_found(error):
    return jsonify({"msg": "Route not found", "path": request.path}), 404

if __name__ == "__main__":
    print("VendorPro Secure © Kishore Running...")
    app.run(debug=True)