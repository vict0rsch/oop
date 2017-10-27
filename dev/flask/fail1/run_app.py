import os
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, jsonify, abort, request
from oop_app.models import *

local_path = os.path.dirname(os.path.realpath(__file__))
db_path = 'sqlite:///' + local_path + '/test.db'

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = db_path
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True

@app.route('/dev/', methods=['GET'])
def index():
    return jsonify({'developers': Developer.query.all()})


@app.route('/dev/<int:id>/')
def get_dev(id):
    return jsonify({'developer': Developer.query.get(id)})


@app.route('/dev/', methods=['POST'])
def create_dev():
    if not request.json or not 'name' in request.json:
        print(request)
        abort(400)
    dev = Developer(request.json['name'], request.json.get(
        'hireDate', ''), request.json.get('focus', ''))
    db_session.add(dev)
    db_session.commit()
    return jsonify({'developer': dev}), 201


@app.route('/dev/<int:id>', methods=['DELETE'])
def delete_dev(id):
    db_session.delete(Developer.query.get(id))
    db_session.commit()
    return jsonify({'result': True})


@app.route('/dev/<int:id>', methods=['PUT'])
def update_dev(id):
    dev = Developer.query.get(id)
    dev.name = request.json.get('name', dev.name)
    dev.hireDate = request.json.get('hireDate', dev.name)
    dev.focus = request.json.get('focus', dev.focus)
    db_session.commit()
    return jsonify({'dev': dev})


if __name__ == '__main__':
    
    app.run()