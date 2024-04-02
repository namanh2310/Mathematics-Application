from flask import Blueprint

from controllers.ODEController import ODEController

ODE = Blueprint("ODE", __name__)

ODE.route("/eulerMethod", methods=["POST"])(ODEController.eulerMethod)
ODE.route("/heunMethod", methods=["POST"])(ODEController.heunMethod)
ODE.route("/midPoint", methods=["POST"])(ODEController.midPointMethod)
ODE.route("/ralston", methods=["POST"])(ODEController.ralstonMethod)
ODE.route("/thirdOrder", methods=["POST"])(ODEController.thirdOrderMethod)
ODE.route("/fourthOrder", methods=["POST"])(ODEController.fourthOrderMethod)