from flask import Blueprint

from controllers.AIController import AIController

AIScan = Blueprint("AIScanner", __name__)

AIScan.route("/for-web", methods=["POST"])(AIController.AIforWeb)
AIScan.route("/for-app", methods=["POST"])(AIController.AIforApp)