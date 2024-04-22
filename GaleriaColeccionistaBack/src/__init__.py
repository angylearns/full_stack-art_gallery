from flask import Flask
<<<<<<< HEAD
from src.routes import PersonRouter, UserRouter, ProductRouter, PurchaseOrderRouter, AuthRouter
from flask_cors import CORS


app= Flask(__name__)

CORS(app, resources={"*": {"origins": "http://localhost:5173"}}, supports_credentials=True, redirect=True)
=======
from src.routes import PersonRouter, UserRouter, ProductRouter, PurchaseOrderRouter
from flask_cors import CORS
# from .routes.ProductRouter import product_router as product_router_ESTY

app= Flask(__name__)

CORS(app,resources={"*":{"origins": "http://localhost:5173"}})
>>>>>>> hero

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

<<<<<<< HEAD
    # app.register_blueprint(AuthRouter.login_blueprint, url_prefix='/login')
    
    app.register_blueprint(AuthRouter.main, url_prefix='/userL')
    app.register_blueprint(UserRouter.getLastUserId, url_prefix='/user')
    app.register_blueprint(ProductRouter.getLastProductId, url_prefix='/product')
=======
    # app.register_blueprint(product_router_ESTY, url_prefix='/product')

    
>>>>>>> hero
    return app