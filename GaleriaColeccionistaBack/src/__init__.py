from flask import Flask
from src.routes import PersonRouter


app= Flask(__name__)

def init_app(config):
    app.config.from_object(config)
    
    app.register_blueprint(PersonRouter.getPerson, url_prefix='/')
    app.register_blueprint(PersonRouter.postPerson, url_prefix='/post')
    app.register_blueprint(PersonRouter.putPerson, url_prefix='/update')
    app.register_blueprint(PersonRouter.deletePerson, url_prefix='/delete')
    return app