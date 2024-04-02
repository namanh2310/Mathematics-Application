from flask import Blueprint

from controllers.CFittingController import CFittingController

CFitting = Blueprint("CFitting", __name__)

CFitting.route("/linear-regression", methods=["POST"])(CFittingController.linearRegression)
CFitting.route("/second-orderLR", methods=["POST"])(CFittingController.secondOrderLR)
CFitting.route("/multi-orderLR", methods=["POST"])(CFittingController.multiOrderLR)