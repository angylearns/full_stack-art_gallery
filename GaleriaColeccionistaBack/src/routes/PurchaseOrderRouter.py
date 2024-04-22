from flask import Blueprint, request, jsonify
from src.services.PurchaseOrderService import PurchaseOrderService
from src.models.purchaseOrderModel import PurchaseOrder

mainPurchaseOrder = Blueprint('purchaseorder_blueprint_get', __name__)


@mainPurchaseOrder.route('/',methods=['GET'])

def get_purchaseorder():
    list_purchaseorder=PurchaseOrderService.get_purchaseorder()
    print("Consola: Pedidos obtenidos.")

    return jsonify([purchaseorder.__dict__ for purchaseorder in list_purchaseorder])

@mainPurchaseOrder.route('/post',methods=['POST'])
def post_users():

    print("cucucucucucucucucucuc")
    id_purchase_order = request.json['id_purchase_order']
    date = request.json ['date']
    status = request.json ['status']
    id_user_fk = request.json ['id_user_fk']
    id_product_fk = request.json ['id_product_fk']
    
    print(id_purchase_order)
    print(date)
    print(status)
    print(id_user_fk)
    print(id_product_fk)
    
    purchaseorder= PurchaseOrder(id_purchase_order,date,status,id_user_fk,id_product_fk)


    if PurchaseOrderService.post_purchaseorder(purchaseorder):
        print('Consola:Pedido insertado: ', purchaseorder)


    return 'Esto se ve en la página, POST'

@mainPurchaseOrder.route('/<int:id_purchase_order>', methods=['PUT'])

def put_purchaseorder(id_purchase_order):

    date = request.json ['date']
    status = request.json ['status']
    id_user_fk = request.json ['id_user_fk']
    id_product_fk = request.json ['id_product_fk']


    updatepurchaseorder= PurchaseOrder(id_purchase_order,date,status,id_user_fk,id_product_fk)


    PurchaseOrderService.put_purchaseorder(id_purchase_order, updatepurchaseorder)
    print('Consola: Pedido actualizado: ')
    return 'Página: Pedido actualizado.'


@mainPurchaseOrder.route('/<int:id_purchase_order>', methods=['DELETE'])
def delete_purchaseorder(id_purchase_order):
    PurchaseOrderService.delete_purchaseorder(id_purchase_order)
    print('Consola: Pedido eliminado.')
    return 'Página: Pedido eliminado.'

