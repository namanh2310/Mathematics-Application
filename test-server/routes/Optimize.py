from flask import Blueprint

from controllers.OptimizeController import OptimizeController

Optimize = Blueprint("Optimize", __name__)

Optimize.route("/goldensection", methods=["POST"])(OptimizeController.goldenSectionSearch)
Optimize.route("/newtonmethod", methods=["POST"])(OptimizeController.newtonMethod)
Optimize.route("/bisection", methods=["POST"])(OptimizeController.bisection)
Optimize.route("/interpolation", methods=["POST"])(OptimizeController.interpolation)