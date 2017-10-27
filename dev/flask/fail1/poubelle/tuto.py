from flask import Flask, jsonify, abort, request
from flask_sqlalchemy import SQLAlchemy
from config_instance import app_config
import datetime

_APP_SETTINGS = "development"

app = Flask(__name__)
app.config.from_object(app_config[_APP_SETTINGS])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy()
db.init_app(app)




class Developer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    hireDate = db.Column(db.Date)
    focus = db.Column(db.String(50))

    def __init__(self, name, hireDate, focus):
        self.name = name
        self.hireDate = datetime.datetime.strptime(
            hireDate, "%d%m%Y").date()
        self.focus = focus


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
    db.session.add(dev)
    db.session.commit()
    return jsonify({'developer': dev}), 201


@app.route('/dev/<int:id>', methods=['DELETE'])
def delete_dev(id):
    db.session.delete(Users.query.get(id))
    db.session.commit()
    return jsonify({'result': True})


@app.route('/dev/<int:id>', methods=['PUT'])
def update_dev(id):
    dev = Developer.query.get(id)
    dev.name = request.json.get('name', dev.name)
    dev.hireDate = request.json.get('hireDate', dev.name)
    dev.focus = request.json.get('focus', dev.focus)
    db.session.commit()
    return jsonify({'dev': dev})


if __name__ == '__main__':
    
    app.run()
