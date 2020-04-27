from pymongo import MongoClient

from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.dbhi


## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('home.html')


## API 역할을 하는 부분
@app.route('/api/post', methods=['POST'])
def di_post():
    first = int(request.form['first'])
    last = int(request.form['last'])
    result = list(db.dinings.find({'price': {'$gt': first, '$lt': last}}, {'_id': False}))
    return jsonify({'result': 'success', 'result': result})


@app.route('/api/list', methods=['GET'])
def di_get():
    dinings = list(db.dinings.find({}, {'_id': False}))
    return jsonify({'result': 'success', 'di_list': dinings})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
