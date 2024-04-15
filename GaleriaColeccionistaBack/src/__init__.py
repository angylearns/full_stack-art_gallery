from flask import Flask
from src.routes import PersonRouter, UserRouter, ProductRouter


app= Flask(__name__)

def init_app(config):
    app.config.from_object(config)
    
    app.register_blueprint(PersonRouter.getPerson, url_prefix='/person')
    app.register_blueprint(PersonRouter.postPerson, url_prefix='/person')
    app.register_blueprint(PersonRouter.putPerson, url_prefix='/person')
    app.register_blueprint(PersonRouter.deletePerson, url_prefix='/person')

    app.register_blueprint(UserRouter.getUser, url_prefix='/user')
    app.register_blueprint(UserRouter.postUser, url_prefix='/user')
    app.register_blueprint(UserRouter.putUser, url_prefix='/user')
    app.register_blueprint(UserRouter.deleteUser, url_prefix='/user')

    app.register_blueprint(ProductRouter.getProduct, url_prefix='/productr')
    app.register_blueprint(ProductRouter.postProduct, url_prefix='/product')
    app.register_blueprint(ProductRouter.putProduct, url_prefix='/product')
    app.register_blueprint(ProductRouter.deleteProduct, url_prefix='/product')
    return app