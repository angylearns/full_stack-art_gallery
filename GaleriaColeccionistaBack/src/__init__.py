from flask import Flask
# from src.routes import PersonRouter
from flask_cors import CORS
from .routes import AdminRoutes
from .routes import AdminRoutesPerson


app= Flask(__name__)
# CORS(app)
# CORS(app, origins='http://localhost:5173', allow_headers=['Content-Type'])
# CORS(app, origins='http://localhost:5173')  # Reemplaza esto con el origen correcto de tu frontend


def init_app(config):
    app.config.from_object(config)
    app.register_blueprint(AdminRoutes.main, url_prefix='/users')
    app.register_blueprint(AdminRoutesPerson.main, url_prefix='/persons')
    # app.register_blueprint(PersonRouter.getPerson, url_prefix='/')
    # app.register_blueprint(PersonRouter.postPerson, url_prefix='/post')
    # app.register_blueprint(PersonRouter.putPerson, url_prefix='/update')
    # app.register_blueprint(PersonRouter.deletePerson, url_prefix='/delete')
    return app