from flask import Blueprint

from controllers.CalculusController import CalculusController

Calculus = Blueprint("Calculus", __name__)

Calculus.route("/fundamental", methods=["POST"])(CalculusController.FundamentalFunc)
Calculus.route("/linear-algebra", methods=["POST"])(CalculusController.LinearAlgebraFunc)