from flask import Blueprint

from controllers.ProbaController import ProbaController

Proba = Blueprint("Probability", __name__)

Proba.route("/proba-compute", methods=["POST"])(ProbaController.ProbabilityFunc)
Proba.route("/proba-independent", methods=["POST"])(ProbaController.ProbaIndependFunc)
Proba.route("/normal-distribution", methods=["POST"])(ProbaController.NormalDistributionFunc)
Proba.route("/statistic", methods=["POST"])(ProbaController.StatisticFunc)
Proba.route("/sample-size", methods=["POST"])(ProbaController.SampleSizeFunc)
Proba.route("/confidence-interval", methods=["POST"])(ProbaController.ConfidenceIntervalFunc)
Proba.route("/z-score", methods=["POST"])(ProbaController.ZScoreFunc)