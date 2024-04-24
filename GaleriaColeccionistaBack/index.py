from src import init_app
from config import config
from flask_cors import CORS
from flask import jsonify, request


configuration = config['development']
app= init_app(configuration)


if __name__=='__main__':

    app.run()