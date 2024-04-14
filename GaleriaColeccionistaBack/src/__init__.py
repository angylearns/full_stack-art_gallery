from flask import Flask
from src.routes import PersonRouter


app= Flask(__name__)

def init_app(config):
    app.config.from_object(config)
    app.register_blueprint(PersonRouter.main, url_prefix='/person')
    return app