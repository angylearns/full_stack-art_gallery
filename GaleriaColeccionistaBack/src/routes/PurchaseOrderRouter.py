from flask import Blueprint, request
from src.services.PurchaseOrderService import PurchaseOrderService
from src.models.purchaseOrderModel import PurchaseOrder

getPurchaseOrder = Blueprint('purchaseorder_blueprint_get', __name__)
postPurchaseOrder = Blueprint('purchaseorder_blueprint_post', __name__)
putPurchaseOrder = Blueprint('purchaseorder_blueprint_put', __name__)
deletePurchaseOrder = Blueprint('purchaseorder_blueprint_delete', __name__)

@getPurchaseOrder.route('/',methods=['GET'])

def get_purchaseorder():
    PurchaseOrderService.get_purchaseorder()
    print("Consola: Pedidos obtenidos.")

    return 'Página: Pedidos obtenidos.'

@postPurchaseOrder.route('/',methods=['POST'])

def post_user():

    date = request.json ['date']
    status = request.json ['status']
    id_user_fk = request.json ['id_user_fk']
    

    print(date)
    print(status)
    print(id_user_fk)
    

    purchaseorder= PurchaseOrder(0,date,status,id_user_fk)


    if PurchaseOrderService.post_purchaseorder(purchaseorder):
        print('Consola:Pedido insertado: ', purchaseorder)
        return 'Pedido creado.'
    
    return 'Página: Ok'

@putPurchaseOrder.route('/<int:id_purchase_order>', methods=['PUT'])

def put_purchaseorder(id_purchase_order):
    
    date = request.json ['date']
    status = request.json ['status']
    id_user_fk = request.json ['id_user_fk']
    

    updatepurchaseorder= PurchaseOrder(id_purchase_order,date,status,id_user_fk)
    
   
    PurchaseOrderService.put_purchaseorder(id_purchase_order, updatepurchaseorder)
    print('Consola: Pedido actualizado: ')
    return 'Página: Pedido actualizado.'
   
       
@deletePurchaseOrder.route('/<int:id_purchase_order>', methods=['DELETE'])
def delete_purchaseorder(id_purchase_order):       
    PurchaseOrderService.delete_purchaseorder(id_purchase_order)
    print('Consola: Pedido eliminado.')
    return 'Página: Pedido eliminado.'

