from flask import Blueprint

from forumController.services.AuthController import AuthController

Auth = Blueprint("Auth", __name__)

Auth.route("/register", methods=["POST"])(AuthController.Register)
Auth.route("/login", methods=["POST"])(AuthController.Login)
Auth.route("/verify", methods=["POST"])(AuthController.VerifyCode)
Auth.route("/change-pass", methods=["POST"])(AuthController.ChangePW)
Auth.route("/verify-reset-pass", methods=["POST"])(AuthController.VerifyCodeReset)

