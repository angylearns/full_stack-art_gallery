from flask import Blueprint, request, jsonify, json
from src.services.ProductService import ProductService
from src.models.productModel import Product

getProduct = Blueprint('product_blueprint_get', __name__)
postProduct = Blueprint('product_blueprint_post', __name__)
putProduct = Blueprint('product_blueprint_put', __name__)
deleteProduct = Blueprint('product_blueprint_delete', __name__)
getLastProductId = Blueprint('product_blueprint_last_product_id', __name__)
patchProduct = Blueprint('product_blueprint_patch', __name__)


@getProduct.route("/", methods=["GET"])
def get_product():
    list_product = ProductService.get_product()
    print("Consola: Productos obtenidos.")

    return jsonify([product.__dict__ for product in list_product])


@postProduct.route("/", methods=["POST"])
def post_product():

    url = request.json["url"]
    title = request.json["title"]
    price = request.json["price"]
    material = request.json["material"]
    dimensions = request.json["dimensions"]
    in_stock = request.json["in_stock"]
    style = request.json["style"]
    id_person_fk = request.json["id_person_fk"]


    product = Product(
        0, url, title, price, material, dimensions, in_stock, style, id_person_fk
    )

    if ProductService.post_product(product):
        print("Consola:Producto insertado: ", product)
        return "Producto creado."

    return "Página: Ok"


@putProduct.route("/<int:id_product>", methods=["PUT"])
def put_product(id_product):

    url = request.json["url"]
    title = request.json["title"]
    price = request.json["price"]
    material = request.json["material"]
    dimensions = request.json["dimensions"]
    in_stock = request.json["in_stock"]
    style = request.json["style"]
    id_person_fk = request.json["id_person_fk"]

    updateproduct = Product(
        id_product,
        url,
        title,
        price,
        material,
        dimensions,
        in_stock,
        style,
        id_person_fk,
    )

    ProductService.put_product(id_product, updateproduct)
    print("Consola: Producto actualizado: ")
    return "Página: Producto actualizado."

@getLastProductId.route("/recent", methods=["GET"])
def get_recent_products():
    recent_products = ProductService.get_recent_products()
    print("Consola: Últimos productos obtenidos.")
    return jsonify([product.__dict__ for product in recent_products])


@deleteProduct.route("/<int:id_product>", methods=["DELETE"])
def delete_product(id_product):
    ProductService.delete_product(id_product)
    print("Consola: Producto eliminado.")
    return "Página: Producto eliminado."


@patchProduct.route("/patch", methods=["PATCH"])
def patch_product():
    
    datos = request.json

    for product in datos:
        print(product)
        id_product = product["id_product"]
        url = product["url"]
        title = product["title"]
        price = product["price"]
        material = product["material"]
        dimensions = product["dimensions"]
        in_stock = 0
        style = product["style"]
        id_person_fk = product["id_person_fk"]

        updateproduct = Product(
            id_product,
            url,
            title,
            price,
            material,
            dimensions,
            in_stock,
            style,
            id_person_fk,
        )
        ProductService.put_product(id_product, updateproduct)
        print("Consola: Producto actualizado: ")
        return "Página: Producto actualizado."



    return jsonify({'mensaje': 'Datos recibidos correctamente'})