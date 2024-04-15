from flask import Flask
# from src.routes import PersonRouter
from flask_cors import CORS
from .routes import AdminRoutes


app= Flask(__name__)
CORS(app)

def init_app(config):
    app.config.from_object(config)
    app.register_blueprint(AdminRoutes.main, url_prefix='/users')
    # app.register_blueprint(PersonRouter.getPerson, url_prefix='/')
    # app.register_blueprint(PersonRouter.postPerson, url_prefix='/post')
    # app.register_blueprint(PersonRouter.putPerson, url_prefix='/update')
    # app.register_blueprint(PersonRouter.deletePerson, url_prefix='/delete')
    return app