from flask import Flask
# from src.routes import PersonRouter
from flask_cors import CORS
from .routes import AdminRoutes
from .routes import AdminRoutesPerson
from .routes.AdminRoutesPerson import main as adminPerson_blueprint


app= Flask(__name__)

CORS(app)
# CORS(app, supports_credentials=True, expose_headers="Authorization", allow_headers=["Content-Type", "Authorization"])
# CORS(app, resources={r"/*": {"origins": "*"}})
# CORS(app, origins='http://localhost:5173', allow_headers=['Content-Type'])
# CORS(app, origins='http://localhost:5173')  # Reemplaza esto con el origen correcto de tu frontend


def init_app(config):
    app.config.from_object(config)
    app.register_blueprint(AdminRoutes.main, url_prefix='/users')
    # app.register_blueprint(AdminRoutesPerson.main, url_prefix='/persons/')

    app.register_blueprint(adminPerson_blueprint, url_prefix='/persons')
    # app.register_blueprint(PersonRouter.getPerson, url_prefix='/')
    # app.register_blueprint(PersonRouter.postPerson, url_prefix='/post')
    # app.register_blueprint(PersonRouter.putPerson, url_prefix='/update')
    # app.register_blueprint(PersonRouter.deletePerson, url_prefix='/delete')
    return appfrom flask import Flask
from src.routes import PersonRouter, UserRouter, ProductRouter, PurchaseOrderRouter


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

    app.register_blueprint(ProductRouter.getProduct, url_prefix='/product')
    app.register_blueprint(ProductRouter.postProduct, url_prefix='/product')
    app.register_blueprint(ProductRouter.putProduct, url_prefix='/product')
    app.register_blueprint(ProductRouter.deleteProduct, url_prefix='/product')

    app.register_blueprint(PurchaseOrderRouter.getPurchaseOrder, url_prefix='/purchaseorder')
    app.register_blueprint(PurchaseOrderRouter.postPurchaseOrder, url_prefix='/purchaseorder')
    app.register_blueprint(PurchaseOrderRouter.putPurchaseOrder, url_prefix='/purchaseorder')
    app.register_blueprint(PurchaseOrderRouter.deletePurchaseOrder, url_prefix='/purchaseorder')
    return app