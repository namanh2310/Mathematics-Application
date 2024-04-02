from flask import Blueprint

from forumController.services.VoteController import VoteController

Vote = Blueprint("Vote", __name__)

Vote.route("/addVote", methods=["POST"])(VoteController.addVote)
Vote.route("/<postID>", methods=["GET"])(VoteController.getAllVotesByUserID)

