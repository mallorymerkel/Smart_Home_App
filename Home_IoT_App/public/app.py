# PDM
from flask import Flask


def create_app():
    """Creates, initializes, and returns the Flask application."""

    app = Flask(__name__)

    with app.app_context():
        from public import routes

        app.register_blueprint(routes.BP)

    return app
