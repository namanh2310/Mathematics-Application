from flask import Blueprint

from controllers.DiffnIntController import DiffnIntController

DiffnInt = Blueprint("DiffnInt", __name__)

DiffnInt.route("/trapezoidal", methods=["POST"])(DiffnIntController.trapezoidal)
DiffnInt.route("/trapezoidalMA", methods=["POST"])(DiffnIntController.trapezoidalMA)

DiffnInt.route("/simpson13", methods=["POST"])(DiffnIntController.simpson13Rule)
DiffnInt.route("/simpson13ma", methods=["POST"])(DiffnIntController.simpson13MARule)
DiffnInt.route("/simpson38", methods=["POST"])(DiffnIntController.simpson38Rule)