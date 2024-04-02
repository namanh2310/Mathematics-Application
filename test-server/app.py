from flask import Flask
from flask_cors import CORS
from routes.Router import Router
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# db setting
username = "postgres"
password = "159357"
dbname = "aima_forum"
app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{username}:{password}@localhost:5432/{dbname}"
db = SQLAlchemy(app)

@app.route("/", methods=["GET"])
def index():
    return 'Restful API Successfully Called!!!'

Router.run(app)

if __name__ == '__main__':
    app.run(host='localhost', port='8081') #here


