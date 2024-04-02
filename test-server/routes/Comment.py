from flask import Blueprint

from forumController.services.CommentController import CommentController

Comment = Blueprint("Comment", __name__)

Comment.route("/<postID>", methods=["POST"])(CommentController.createComment)
Comment.route("/<postID>", methods=["GET"])(CommentController.getAllCommentWithID)
Comment.route("/<commentID>", methods=["DELETE"])(CommentController.deleteCommentWithID)
Comment.route("/Noti/<userID>", methods=["GET"])(CommentController.getAllResponsedComments)

